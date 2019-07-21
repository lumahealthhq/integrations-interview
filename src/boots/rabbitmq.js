import config from 'config';
import amqp from 'amqplib';
import fs from 'fs';
import path from 'path';
import EventEmitter from 'events';
import { promisify } from 'util';

const eventEmitter = new EventEmitter();
const readdir = promisify(fs.readdir);

/**
 * load rabbitmq
 */
export default async (dir, apis) => {
  try {
    const connection = await amqp.connect(config.get('rabbitmq'));
    const channel = await connection.createChannel();
    global.bus = channel;
    apis.forEach(async (api) => {
      let events = require(`../apis/${api}/events`).default || [];
      let files = [];
      try {
        files = await readdir(`${dir}/apis/${api}/consumers`);
      } catch (err) {
        console.error(err);
      }

      let consumers = files.filter(jsFiles);
      consumers.forEach((consumer) => {
        eventEmitter.on(`${path.basename(consumer, '.js')}`, require(`../apis/${api}/consumers/${consumer}`).default);
      });

      events.forEach(async (event) => {
        let eventName = `${api}:events:${event}`;
        channel.assertExchange(eventName, 'fanout', { durable: true });
        let q = channel.assertQueue('', { exclusive: true });
        channel.bindQueue(q.queue, eventName, '');
        channel.consume(q.queue, (msg) => {
          if (msg.content) {
            const json = JSON.parse(msg.content.toString())
            eventEmitter.emit(event, json);
          }
        }, { noAck: true });
      })
    });
  } catch (err) {
    throw new Error(err);
  }
}

const jsFiles = (filename) => path.extname(filename) === '.js';

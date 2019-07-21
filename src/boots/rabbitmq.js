import config from 'config';
import amqp from 'amqplib';
import path from 'path';
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

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

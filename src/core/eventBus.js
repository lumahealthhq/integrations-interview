/**
 * event bus
 */
export const publishEvent = async (api, event, data) => {
  const msg = JSON.stringify(data);
  global.bus.publish(`${api}:events:${event}`, '', Buffer.from(msg));
}

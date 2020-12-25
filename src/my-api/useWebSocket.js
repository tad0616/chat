// 連線 websocket
export function webSocket(url) {
  const ws = new WebSocket("ws://" + url);
  return ws;
}

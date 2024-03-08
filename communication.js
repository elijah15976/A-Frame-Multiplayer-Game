/* DO NOT MODIFY THIS FILE */

const socket = new WebSocket('wss://568de2fa-9f98-42dc-9a99-c257997b300d-00-26rdl868mda9b.riker.replit.dev');

//Event listener for incoming messages FROM websocket server
socket.onmessage = ({data}) => {
  handleMessage(data);
}
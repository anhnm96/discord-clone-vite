// @ts-ignore
import socketIOClient from 'socket.io-client'

const socket = socketIOClient(`http://localhost:4000/ws`, {
  transports: ['websocket'],
  upgrade: false,
})

socket.connect()

export default function getSocket() {
  return socket
}

// @ts-ignore
import socketIOClient from 'socket.io-client'

// const socket = socketIOClient(import.meta.env.VITE_BASE_SOCKET, {
//   transports: ['websocket'],
//   upgrade: false,
// })

// socket.connect()

export default function getSocket() {
  return socketIOClient(import.meta.env.VITE_BASE_SOCKET, {
    transports: ['websocket'],
    upgrade: false,
  })
}

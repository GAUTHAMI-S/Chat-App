import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import { Server } from 'socket.io'
// create express app and http Server


// Hey Express, give me an app I can define routes on, handle requests, send responses, etc.
const app = express()
// Hey Node, create an HTTP server, and use the app function from Express to handle all the requests.
// used when we use Socket.io, WebSockets, custom HTTP handling
const server = http.createServer(app)


// Initialize socket.io server
export const io = new Server(server, { cors: { origin: "*" } })

// store online users
export const userSocketMap = {} //{userId:socketId}

// socket.io connect handler
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userid;
    console.log("User Connected", userId)
    if (userId) userSocketMap[userId] = socket.id;

    // Emit online users to all connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
    socket.on('disconnect', () => {
        console.log("User Disconnect", userId);
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))

    })
})
// middleware setup
app.use(express.json({ limit: '4mb' }))
app.use(cors())

app.use('/api/auth', userRouter)
app.use('/api/messages', messageRouter)

// connect to mongodb
await connectDB()

if (process.env.NODE_ENV!=='production'){
const PORT = process.env.PORT || 5005;
server.listen(PORT, () => console.log('Server is running on PORT:', + PORT))
}

// export server for vercel
export default server;

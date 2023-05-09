import express from 'express'
const app = express()
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
const port = 3000
dotenv.config()
import cookieParser from 'cookie-parser'
import productRouter from './routes/product.route.js'
import userRouter from './routes/user.route.js'
import addressRouter from './routes/address.route.js'
import orderRouter from './routes/order.route.js'


mongoose.connect(process.env.MONGO)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/products', productRouter)
app.use('/user', userRouter)
app.use('/address', addressRouter)
app.use('/orders', orderRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
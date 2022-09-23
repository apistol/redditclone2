import express from "express"
import morgan from "morgan"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from "cors"

import { AppDataSource } from "./data-source"
import trim from "./middleware/trim"

import authRoutes from "./routes/auth"
import postRoutes from "./routes/post"
import subRoutes from "./routes/sub"

dotenv.config()

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(trim)
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:process.env.ORIGIN,
    optionsSuccessStatus:200
}))

app.get("/" , (_, res) => res.send("Salut"))
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)
app.use("/api/sub", subRoutes)

app.listen(process.env.PORT ,async () => {
    console.log(`Server running at port ${process.env.PORT}`)
    await AppDataSource.initialize()
    // await AppDataSource.dropDatabase()
    // await AppDataSource.runMigrations() //asta nu face nimic
    console.log("Database connected")

})


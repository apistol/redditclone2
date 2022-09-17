import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import express from "express"
import morgan from "morgan"
import authRoutes from "./routes/auth"
import trim from "./middleware/trim"

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(trim)

app.get("/" , (_, res) => res.send("Salut"))
app.use("/api/auth", authRoutes)

app.listen(5000,async () => {
    console.log("Server running at port 5000")
    AppDataSource.initialize()
})

// AppDataSource.initialize().then(async () => {
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     const users = await AppDataSource.manager.find(User)
// }).catch(error => console.log(error))

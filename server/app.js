import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.js"
import profileRouter from "./routes/profile.js"
import authMiddleware from "./middleware/authMiddleware.js"
import "dotenv/config"
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())

app.use("/api", authRouter)
app.use("/api",authMiddleware, profileRouter)

app.listen(process.env.PORT, () => console.log(`Berjalan pada port ${process.env.PORT}`))
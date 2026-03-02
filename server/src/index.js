import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./db/index.js"

connectDB();
const app = express();

dotenv.config({
    path:"../.env"
});

app.use(cors())
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hi from server"
    })
})

import authRouter from "./router/User.router.js";
import addressRouter from "./router/Address.router.js";
import shopRouter from "./router/Shop.router.js"
import categoryRouter from "./router/Category.router.js"
import petRouter from "./router/Pets.router.js"
import adminRouter from "./router/Admin.router.js"
import dashboardRouter from "./router/Dashboard.router.js"
import adoptionRouter from "./router/Adoption.router.js"
import statsRouter from "./router/Stats.router.js"

import { GlobalErrorHandler } from "./utils/GlobalError.js";

app.use("/api/v2/auth", authRouter);
app.use("/api/v2/address", addressRouter);
app.use("/api/v2/shop", shopRouter);
app.use("/api/v2/category", categoryRouter);
app.use("/api/v2/pet", petRouter);
app.use("/api/v2/admin", adminRouter);
app.use("/api/v2/dashboard", dashboardRouter);
app.use("/api/v2/adoption", adoptionRouter);
app.use("/api/v2/stats", statsRouter);


app.use(GlobalErrorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server running at : http://localhost:${PORT}/`)
})
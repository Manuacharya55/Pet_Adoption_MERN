import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { GlobalErrorHandler } from "./utils/GlobalError.js";
import connectDB from "./db/index.js";
import authRouter from "./routers/Auth.Router.js"
import addressRouter from "./routers/Address.Router.js"
import categoryRouter from "./routers/Category.Router.js";
import shopRouter from "./routers/Shop.Router.js";

connectDB();
const app = express();

dotenv.config({
    path:"../.env"
});

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Hi from server"
    })
})


app.use("/api/v1/auth",authRouter);
app.use("/api/v1/address",addressRouter);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/shop",shopRouter);

app.use(GlobalErrorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`server running at : http://localhost:${PORT}/`)
})
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { GlobalErrorHandler } from "./utils/GlobalError";

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

app.use(GlobalErrorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`server running at : http://localhost:${PORT}/`)
})
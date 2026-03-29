import express from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Server is Running");
});

app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
});
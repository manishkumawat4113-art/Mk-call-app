import express from "express"
const app=express()
app.use(express.json())

import {connectedDb} from "./db.js"
await connectedDb()

import "dotenv/config"
const PORT = process.env.Port

import router from "./routers.js"
app.use(router)

app.listen(PORT,()=>{
    console.log("server is running")
})

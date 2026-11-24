import express from "express"
const router=express.Router()

import {mk,signup} from"./controller.js"
router.get("/", mk)
router.post("/api/auth/register", signup)
router.post("/login",login)
router.get("/api/auth/me/:id",profiledata)
export default router
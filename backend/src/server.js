import express from "express";
import * as dotenv from "dotenv";
import app from "./app.js";
import { checkDatabaseConnection } from "./db/database.js";
import router from "./router.js";

dotenv.config()

await checkDatabaseConnection();

const port = Number(process.env.PORT) || 3001

app.use(express.json())

app.use(router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
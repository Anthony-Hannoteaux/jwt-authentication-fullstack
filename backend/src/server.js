import * as dotenv from "dotenv";
import app from "./app.js";
import { checkDatabaseConnection } from "./db/database.js";

dotenv.config()

await checkDatabaseConnection();

const port = Number(process.env.PORT) || 3001

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
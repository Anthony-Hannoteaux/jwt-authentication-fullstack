import pg from "pg";

// @link https://node-postgres.com/features/connecting#environment-variables
const { Pool } = pg;

// @link https://node-postgres.com/apis/pool#new-pool
const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
})

// Health Check Connection
export async function checkDatabaseConnection() {
    try {
        await pool.query('SELECT 1')
        console.log('Database Connected')
    } catch (error) {
        console.error('Database connection error', error)
        process.exit(1)
    }
}

export default pool;
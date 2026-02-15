const { pool } = require("./db/db");

async function test() {
  try {
    const [rows] = await pool.query("SELECT * FROM islamabad LIMIT 5");
    console.log("Connected! Sample data:", rows);
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

test();

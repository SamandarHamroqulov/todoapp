require("dotenv").config();
const express = require("express");
const dbConnection = require("./lib/db.service");
const cors = require("cors")
dbConnection().catch((err) => {
  console.error("DB connection error:", err);
  process.exit(1);
});
const app = express();
const morgan = require("morgan");
const mainRouter = require("./router/main.routes");
app.use(cors({ origin: ["http://localhost:5500"], credentials: true }));

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", mainRouter);
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT} - port`));

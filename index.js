import express from "express";
import usersRoutes from "./routes/users.js";
import connectDB from "./DB/mongoConnection.js";
import config from "./config.js"

connectDB();

const app = express();
app.use(express.json());
app.use("/people", usersRoutes);

app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(config.PORT, () =>
  console.log(`Server running on port: http://localhost:${config.PORT}`)
);

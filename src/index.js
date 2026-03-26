import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/userRoutes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", routes);

app.listen(3000, () => console.log("CRUD Server running on port 3000"));

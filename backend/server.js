import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConfig.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import productRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRoutes.js";
import ordersRouter from './routes/orderRoutes.js'
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
const corsOptions = {
  origin: true, // Change this to the origin(s) you want to allow.
  credentials: true, // Indicates that cookies and credentials should be included.
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", ordersRouter);

app.use([notFound, errorHandler]);

app.listen(port, () => {
  connectDb();
  console.log(`Server is running on PORT: ${port}... `);
});

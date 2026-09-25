import "dotenv/config";
import express, { type Express } from "express";
import cors from "cors";
import customerRoutes from "./src/models/customer/customer.routes";
import userRoutes from "./src/models/user/user.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

const app: Express = express();
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

const corsOptions = {
  origin: process.env.CORS_URL,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(customerRoutes);
app.use(userRoutes);

app.listen(process.env.port, () => {
  console.log(`app is running on http://localhost:${process.env.port}`);
});

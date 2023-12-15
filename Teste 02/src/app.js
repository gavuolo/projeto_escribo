import express from "express";
import cors from "cors";
import { signUpRouter } from "./routes/sign-up-route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.send('OK!'))
app.use('/sign-up', signUpRouter)

export default app;
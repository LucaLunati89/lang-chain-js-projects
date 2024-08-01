import express, { Router } from "express";
import translatorRouter from "../translator/routes/translatorRoute";
const router: Router = express.Router();

router.use("/translator", translatorRouter);
export default router;

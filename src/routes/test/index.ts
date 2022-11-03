import { TestController } from '@controllers/TestController';
import { Router } from "express";
const router =Router();

const controller = new TestController();
router.get('/',controller.test);

export {router as RouterTest}
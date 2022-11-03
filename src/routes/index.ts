import { Router } from "express";
import { RouterAPI } from "./api";
import { RouterTest } from "./test";
const router = Router();

router.use("/test", RouterTest);
router.use("/api", RouterAPI);
router.use("/*", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

export { router };

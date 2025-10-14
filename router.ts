import express from 'express';
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const router = express.Router();

router.get("/", indexRouter);
router.get("/users", usersRouter);

export default router;
import express from 'express';
import { Request, Response, NextFunction } from 'express';

var usersRouter = express.Router();

usersRouter.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

export default usersRouter;

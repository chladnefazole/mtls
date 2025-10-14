import express from 'express';
import { Request, Response, NextFunction } from 'express';

const indexRouter = express.Router();

indexRouter.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

export default indexRouter;
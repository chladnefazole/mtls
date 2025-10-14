import express, { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import morgan from 'morgan';
import routes from "./router";

var logger = morgan;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// Define an interface for HTTP errors with status property
interface HttpError extends Error {
  status?: number;
}

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// start the express server
let serverInstance;
if (process.env.NODE_ENV === "production") {
    const certPath = fs.realpathSync(path.join(process.env.SSL_PATH, "fullchain.pem"));
    const keyPath = fs.realpathSync(path.join(process.env.SSL_PATH, "privkey.pem"));
    const options = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
        port: process.env.PORT,
        headers: {
            'Accept': 'application/json'
        }
    }
    serverInstance = http.createServer(app);
    serverInstance.listen(process.env.PORT, () => {
        console.log('Secure server is listening on port ' + process.env.PORT);
    });
} else {
    serverInstance = http.createServer(app);
    serverInstance.listen(process.env.PORT, async () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${process.env.PORT}`);
    });
}

module.exports = app;

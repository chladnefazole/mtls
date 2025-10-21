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
    // You can also do your MTLS negotiation here, but with Apache or another server it is not necessary.
    // Apache will connect securely to the client, and redirect traffic to your app.
    // If you want to use MTLS with NodeJS, you would set it up like so:
    // const certPath = fs.realpathSync(path.normalize(process.env.SSL_CERT_CHAIN_PATH));
    // const keyPath = fs.realpathSync(path.normalize(process.env.SSL_KEY_PATH));
    // const caPath = fs.realpathSync(path.normalize(process.env.SSL_CA_PATH));
    // const options = {
    //     key: fs.readFileSync(keyPath),
    //     cert: fs.readFileSync(certPath),
    //     port: process.env.PORT,
    //     ca: fs.readFileSync(caPath),
    //     requestCert: true
    //     rejectUnauthorized: true // Set to false if you want to allow requests which failed to negotiate to pass through
    //     headers: {
    //         'Accept': 'application/json'
    //     }
    // }

    // The current setup means that traffic between Apache and your Node app will NOT be encrypted.
    // To encrypt, use the setup here (TLS, not MTLS):
    // const certPath = fs.realpathSync(path.normalize(process.env.SSL_CERT_CHAIN_PATH));
    // const keyPath = fs.realpathSync(path.normalize(process.env.SSL_KEY_PATH));
    // const options = {
    //     key: fs.readFileSync(keyPath),
    //     cert: fs.readFileSync(certPath),
    //     port: process.env.PORT,
    //     headers: {
    //         'Accept': 'application/json'
    //     }
    // }
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

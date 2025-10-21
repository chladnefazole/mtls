"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const http = __importStar(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
var logger = morgan_1.default;
var app = (0, express_1.default)();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use("/", router_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
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
}
else {
    serverInstance = http.createServer(app);
    serverInstance.listen(process.env.PORT, async () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${process.env.PORT}`);
    });
}
module.exports = app;
//# sourceMappingURL=app.js.map
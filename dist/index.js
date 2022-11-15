"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const attendanceData_1 = require("./attendanceData");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const router = express_1.default.Router();
// app.get('/', (req, res) => {
//   console.log({ request: req });
//   res.status(200);
//   res.send({
//     code: 200,
//     message: 'Hello World!',
//     details: [],
//   });
// });
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
router.get('/attendance/status-list', (req, res) => {
    res.send(attendanceData_1.attendanceData);
    res.sendStatus(200);
});
app.use(router);
app.listen(port, () => {
    console.log(`⚡️ %c Server is running on port ${port}`, 'color: #00ff00');
});

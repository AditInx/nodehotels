import express from 'express';
const app = express();
import db from './db.js';
import passport from './auth.js';
import { config } from 'dotenv';
config();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
};
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/",function (req, res) {res.send("Hello World")});

import menuRoutes from './routes/menuRoutes.js';
import personRoutes from './routes/personRoutes.js';

app.use("/menu",localAuthMiddleware,menuRoutes);
app.use("/person" , personRoutes);

app.listen(3000, () => {
  console.log(`listening on port ${PORT}`);
});

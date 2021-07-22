import regeneratorRuntime from "regenerator-runtime";
import express from 'express'
import bodyParser from 'body-parser'
import logger  from './logger'
import PeopleRouter from './routers/people'
import { configureDb } from './db'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_DB_NAME = process.env.DB_NAME || "db.json"
const DEFAULT_DB_FOLDER = process.env.DB_FOLDER || '/home/volume'

configureDb(DEFAULT_DB_NAME, DEFAULT_DB_FOLDER)

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(function (req, res, next) {
    logger.nio(req.method + " " + req.originalUrl);
    next();
});

app.use('/api', PeopleRouter)

app.use(express.static(path.join(__dirname, "app")));
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "app", 'index.html'));
});


let port = process.env.PORT || 4000

app.listen(port, () => {
    logger.init("server running on port " + port)
})

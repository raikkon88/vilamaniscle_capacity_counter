import express from 'express'
import bodyParser from 'body-parser'
import logger  from './logger'
import PeopleRouter from './routers/people'
import { configureDb } from './db'
import cors from 'cors'
import path from 'path'

configureDb()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(function (req, res, next) {
    logger.nio(req.method + " " + req.originalUrl);
    next();
});

app.use('/api', PeopleRouter)

app.use(express.static(path.join(__dirname, "frontend/build")));
app.use('*', (req, res) => {
    response.sendFile(path.resolve(__dirname, "frontend/build", 'index.html'));
});


let port = process.env.PORT || 4000

app.listen(port, () => {
    logger.init("server running on port " + port)
})

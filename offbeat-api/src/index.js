import express from "express";
import cors from "cors";
import {getArticles, getSources, getTopics} from "./database/utils.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = 8080;

app.get('/articles', async(req, res) => {
    const sourceId = req.query['sourceId'];
    const articles = await getArticles(sourceId);
    res.status(200).send(articles);
})


app.get('/topics', async(req, res) => {
    const topics = await getTopics();
    res.status(200).send(topics);
})

app.get('/sources', async(req, res) => {
    const sources = await getSources();
    res.status(200).send(sources);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
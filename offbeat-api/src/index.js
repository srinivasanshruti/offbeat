import express from "express";
import cors from "cors";
import {getArticles, getArticlesByIds, getSources, getTopics} from "./database/reader.js";
import {readRSSFeeds} from "./worker.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = 8080;

await readRSSFeeds();

setInterval(readRSSFeeds, 24 * 60 * 60 * 1000);

app.get('/articles', async(req, res) => {
    const sourceId = req.query['sourceId'];
    const articles = await getArticles(sourceId);
    res.status(200).send(articles);
})

app.post('/articles', async(req, res) => {
    const articleIds = req.body;
    if(articleIds === undefined || articleIds.length === 0) {
        res.status(400);
        return;
    }
    try {
        const articles = await getArticlesByIds(articleIds);
        if(articles.length > 0) {
            res.status(200).send(articles);
        } else {
            res.status(404).send('No articles found.');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }


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
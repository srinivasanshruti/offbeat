import express from "express";
import cors from "cors";
import {getArticles, getSources} from "./database/utils.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = 8080;

app.get('/feed', async(req, res) => {
    const articles = await getArticles();
    res.status(200).send(articles);
})


app.get('/topics', (req, res) => {

})

app.get('/sources', async(req, res) => {
    const sources = await getSources();
    res.status(200).send(sources);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
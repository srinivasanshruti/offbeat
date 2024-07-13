# OffBeat
OffBeat is a news aggregator that brings in news articles from independent news websites. It requires no sign-ups or account creation. Simply visit the website daily to get your news!

## Purpose
OffBeat was created to support independent journalism in Canada and elsewhere, and in particular help with discovery. With the loss of social media as a disoverability tool in Canada, it's become more difficult for small, indpendent news websites and organizations to attract new readers. This aggregator aims to help in a small way.

There are no ads on the website, and clicking on articles takes you to the source page. The website does not track you and only saves articles to your browser if you choose to do so. It also tracks your recently viewed items but you can very easily delete that information from your browser.

## Tech Stack
The website was built using React with TypeScript and has a back-end API that manages data requests from the front-end. The API reads from a Postgres database that is populated by worker scripts that fetch news from the various sources.

## Installation
There are 3 sub-projects. Each have their own requirements as listed below. The application requires Postgres to be installed:
### offbeat-ui
This is the React front-end. Install using npm:
```
cd offbeat-ui
npm i
```
### offbeat-api
This is the API. Install using npm:
```
cd ..
cd offbeat-api
npm i
```
### offbeat-worker
This is the worker that populates the database with articles. Install knex and pg (to use knex with Postgres):
```
cd ..
cd offbeat-worker
npm install knex -g
knex init
npm install pg
knex migrate:latest
knex seed:run
```
## Running the Application
```
cd offbeat-ui
npm run dev

cd ..
cd offbeat-api
node src/index.js

cd ..
cd offbeat-worker
node src/worker.js
```

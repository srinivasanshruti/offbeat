# OffBeat
OffBeat is a news aggregator that brings in news articles from independent news websites. It requires no sign-ups or account creation. Simply visit the website daily to get your news!

## Purpose
OffBeat was created to support independent journalism in Canada and elsewhere, and in particular help with discovery. With the loss of social media as a disoverability tool in Canada, it's become more difficult for small, indpendent news websites and organizations to attract new readers. This aggregator aims to help in a small way.

There are no ads on the website, and clicking on articles takes you to the source page. The website does not track you and only saves articles to your browser if you choose to do so. It also tracks your recently viewed items but you can very easily delete that information from your browser.

## Tech Stack
The website was built using React with TypeScript and has a back-end API that manages data requests from the front-end. The API reads from a Postgres database that is populated by worker scripts that fetch news from the various sources.

## Usage
Run each of the worker scripts in offbeat-worker/src to populate the database.

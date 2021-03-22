/* eslint-disable @typescript-eslint/no-var-requires */
// This file should only be used if the NPM and NEXT cli's aren't available.

const { createServer } = require("http");
const { URL } = require("url");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = new URL(req.url);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log("> Ready on " + port);
  });
});

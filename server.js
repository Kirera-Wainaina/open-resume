const fs = require("fs");
const https = require("https");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000

const httpsOptions = {
  cert: fs.readFileSync("/etc/letsencrypt/live/ceysec.cc/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/ceysec.cc/privkey.pem"),
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(port, () => {
      console.log(`> Ready on https://ceysec.cc:${port}`);
    });
});

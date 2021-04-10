const fs = require("fs");
const path = require("path");
const urlModule = require("url");

const serverHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/api/active") {
    filePath = path.join(__dirname, "activeSatellites.txt");
    res.writeHead(200, {
      "content-type": "application/json",
    });
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;
      res.end(JSON.stringify(data));
    });
  } else if (url.match(/\/api\/active\?limit=\d/)) {
    limit = +urlModule.parse(url).query.split("=")[1];
    filePath = path.join(__dirname, "activeSatellites.txt");
    res.writeHead(200, {
      "content-type": "application/json",
    });
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;
      content = JSON.parse(data).slice(0, limit);
      res.end(JSON.stringify(content));
    });
  } else if (url.match(/\/api\/active\?page=\d/)) {
    pageNum = +urlModule.parse(url).query.split("=")[1];
    filePath = path.join(__dirname, "activeSatellites.txt");
    res.writeHead(200, {
      "content-type": "application/json",
    });
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;
      content = JSON.parse(data).slice((pageNum - 1) * 10, pageNum * 10);
      res.end(JSON.stringify(content));
    });
  }
};

module.exports = { serverHandler };
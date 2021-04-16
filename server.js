const fs = require("fs");
const path = require("path");
const urlModule = require("url");

const serverHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Max-Age": 2592000, // 30 days
  /** add other headers too */
};
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>please use the api routes to fetch the data</h1>");
  } else if (url === "/api/active") {
    filePath = path.join(__dirname, "dataset", "activeSatellites.txt");
    res.writeHead(200, {
      ...headers,
      "content-type": "application/json",
    });
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  } else if (url.match(/\/api\/active\?limit=\d/)) {
    limit = +urlModule.parse(url).query.split("=")[1];
    filePath = path.join(__dirname, "dataset", "activeSatellites.txt");
    res.writeHead(200, {
      ...headers,
      "content-type": "application/json",
    });
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;
      content = JSON.parse(data).slice(0, limit);
      res.end(content);
    });
  } else if (url.match(/\/api\/active\?page=\d/)) {
    pageNum = +urlModule.parse(url).query.split("=")[1];
    filePath = path.join(__dirname, "dataset", "activeSatellites.txt");
    res.writeHead(200, {
      ...headers,
      "content-type": "application/json",
    });
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;
      content = JSON.parse(data).slice((pageNum - 1) * 10, pageNum * 10 + 2);
      res.end(content);
    });
  } else if (url.match(/\/api\/active\?norad=\d/)) {
    norad = +urlModule.parse(url).query.split("=")[1];
    filePath = path.join(__dirname, "dataset", "activeSatellites.txt");
    res.writeHead(200, {
      ...headers,
      "content-type": "application/json",
    });
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;
      content = JSON.parse(data).filter((item) => item.noradNumber == norad);
      res.end(content);
    });
  }else if(url.match(/\/api\/all-active/)){
    filePath = path.join(__dirname, "dataset", "allActive.txt");
    res.writeHead(200, {
      ...headers,
      "content-type": "application/json",
    });
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;
      res.end(data);
    });
    }
};

module.exports = {serverHandler};

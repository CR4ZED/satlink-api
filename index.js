const http = require("http");
const { serverHandler } = require("./server");

const PORT = process.env.PORT || 3000;

const server = http.createServer(serverHandler);

server.listen(PORT, () => console.log(`server is listening at ${PORT}`));

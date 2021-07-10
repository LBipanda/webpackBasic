const express = require("express");
const app = express();
app.use(express.static("build",{ maxAge: 1008 * 3688 }));

app.listen(4445);

// node server.js 启动服务
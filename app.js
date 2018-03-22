var http = require('http');
/*
var path = require('path');
 */
var fs = require('fs'); //读写文件
// */
var url = requre('url'); //解析url

var server = http.createServer(function (req, res) {
    var pathObj = url.parse(req.url, true);
    res.end();
});

server.listen(8080);
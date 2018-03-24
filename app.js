
// 服务器;
var http = require('http');
var path = require('path');
var fs = require('fs'); //读写文件
var url = require('url');

var server = http.createServer(function(req,res){

    var pathObj = url.parse(req.url, true);
    console.log(pathObj);

    switch (pathObj.pathname) {
        case '/loadmore':

            var curIndex = pathObj.query.index;
            var len = pathObj.query.length;
            var data = [];

            for(var i =0 ;i<len;i++){
                data.push('内容'+(parseInt(curIndex)+i))
            }
            res.end(JSON.stringify(data));

            break;

        default:
            fs.readFile(path.join(__dirname,'static',pathObj.pathname),function(err,data){
                if(err){
                    res.statusCode = 404;
                    res.end('Not Found')
                } else {
                    res.end(data)
                }
            })
    }
});

server.listen(8080);



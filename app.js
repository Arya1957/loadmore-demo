/* 约定 ：
1. method: GET
2. 接口名称： /loadmore
3.入参 ：{
    index: 3,
        length :5
}
4.后台响应数据：['内容3','内容4']
*/


// 服务器;



app.get('/loadmore',function(req,res){

    var curIdx = req.query.index;
    var len = req.query.length;
    var data = [];

    for(var i = 0;i < len;i++){
        data.push('内容'+(parseInt(curIdx)+i))
    }
    res.send(data);
});
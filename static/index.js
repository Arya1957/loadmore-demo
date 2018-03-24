/*
1.约定接口类型为GET，接口名称为 /loadmore
2. 约定入参的 数据类型为JSON
*/

var btn = document.querySelector('#load-more'),
    ct = document.querySelector('#ct'),
    curIndex = 3, //当前要加载的数据的序号
    length = 6; //每次要加载的数据个数

var loading = false; // 状态锁，用于判断是否在加载数据

btn.addEventListener('click', function (e) {
    e.preventDefault(); //阻止点击a时跳到页面顶部，也可以设置 a href = 'javascript:void(0)'

    if (loading) {
        return;  // 如果正在加载数据，就什么都不做
    }
    loading = true; // 发请求之前先做个标记，上锁
    ajax('/loadmore', {
        index: curIndex,
        length: length
    }, function (data) {
        appendData(data);
        loading = false; //数据到来之后解锁
        curIndex = curIndex + length; //修改序号
        console.log('curIndex:' + curIndex);
    })
});


function appendData(data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var nodes = document.createElement('li');
        nodes.innerText = data[i];

        console.log('data[i]:' + data[i]); // 内容i

        fragment.appendChild(nodes);
    }
    ct.appendChild(fragment);


}

// 封装ajax

function ajax(url, json, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    var queryStr = '?';
    for (key in json) {
        queryStr += key + '=' + json[key] + '&';
    }
    queryStr = queryStr.substr(0, queryStr.length - 1);
    url = url + queryStr; //拼接url

    xhr.open('GET', url, true);
    xhr.send();


    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            console.log('this:' + this.response);

            onSuccess(JSON.parse(xhr.responseText));
            console.log('responseText' + JSON.parse(xhr.responseText))

        } else {
            onError()
        }
    }
}
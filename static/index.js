var btn = document.querySelector('#load-more'); // 获取要监听的对象（加载更多）
var ct = document.querySelector('#ct'); // 获取要添加元素的父元素
var curIndex = 0; // 当前要加载的数据的序号
var len = 5; // 每次要加载的数量
var lock = false; //状态锁，用于判断是否在加载数据

// 监听
btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (lock) {
        return;
    }
    lock = true; //发请求之前上锁
    ajax({
        url: '/loadmore',
        data: {
            idx: curIndex,
            len: 5
        }, function (data) {
            appendData(data);
            lock = false; // 数据到来之后解锁
            curIndex += len; //修改序号
        }
    })
});


// 添加元素
function appendData(data) {
    var fragment = document.createDocumentFragment(); // 声明要添加的片段
    for (var i = 0; i < len; i++) {
        var liNodes = document.createElement('li');
        liNodes.innerText = '内容' + data[i];
        fragment.appendChild(liNodes);
    }

    ct.appendChild(fragment);
}

// ajax
function ajax(opts) {
    var url = opts.url,
        type = opts.type || 'GET',
        dataType = opts.dataType || 'json',
        onsuccess = opts.onsuccess || function () {
        },
        onerror = opts.onerror || function () {
        },
        data = opts.data || {};

    var dataStr = [];
    for (var key in data) {
        dataStr.push(key + '=' + data[key])
    }
    dataStr = dataStr.join('&');

    if (type === 'GET') {
        url += '?' + dataStr
    }


    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) { //请求成功
            if (dataType === 'json') {
                onsuccess(JSON.parse(xhr.responseText))
            } else {
                onsuccess(xhr.responseText)

            }
        } else {
            onerror()
        }
    };

    if (type === 'POST') {
        xhr.send(dataStr)
    } else {
        xhr.send()
    }
}
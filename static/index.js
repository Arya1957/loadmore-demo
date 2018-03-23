var btn = document.querySelector('#load-more'),
    ct = document.querySelector('#ct'),
    curIndex = 2;

var isDataArrive = true; // 设置状态锁
btn.addEventListener('click', function (e) {
    e.preventDefault(); //阻止点击a时跳到页面顶部，也可以设置 a href = 'javascript:void(0)'

    if (!isDataArrive) {
        return;
    }
    loadData(function (lists) {
        renderPage(lists);
        curIndex += 6;
        isDataArrive =true
    });
    isDataArrive = false
});


function loadData(callback) {
    ajax({
        type: 'get',
        url: '/loadmore',
        data: {
            index: curIndex,
            length: 5
        },
        onSuccess: callback, // 成功的时候调用的函数
        onError: function () {
            console.log('error')
        } // 失败的时候调用的函数
    })
}

function renderPage(lists) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < lists.length; i++) {
        var nodes = document.createElement('li');
        nodes.innerText = lists[i];
        fragment.appendChild(nodes)
    }
    ct.appendChild(fragment);
}

// 封装ajax

function ajax(opts) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            var data = JSON.parse(xhr.responseText);
            opts.onSuccess(data)
        } else {
            opts.onError()
        }
    };

    var query = '?';
    for(key in opts.data){
        query += key + '=' + opts.data[key] + '&';
    }
    query = query.substr(0,query.length-1);
    xhr.open(opts.type, opts.url + query, true);
    xhr.send()

}
## Web

### 与原生交互
[通过jsbridge与原生交互](https://github.com/Gerry1218/js2native)


### 命令
```shell
# 查看webpack的所有版本号
npm view webpack versions
```

### h5跨域下载图片
```javascipt
downFromOther(url, fileName) {
    var download = new XMLHttpRequest();
    download.open("GET", url, true);
    download.responseType = 'blob';
    download.onload=function(e) {
        var url = window.URL.createObjectURL(download.response)
        var a = document.createElement('a');
        a.href = url
        a.download = fileName;
        a.click()
    }
    download .send();
}
```
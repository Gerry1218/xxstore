## Java

- HTTP header不要使用带下划线的属性名，如"access_token", 否则会取不到该值，如果一定要用，请在ngix里配置`underscores_in_headers`为`on`
```
http {
    ...
    underscores_in_headers on;
    server {
        ...
    }
}
```



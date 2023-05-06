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
- 运行jar包,设置端口，设置环境
```
java -jar -Xmx1024M -Xms256M  /data/jar/tmall-0.0.1-SNAPSHOT.jar --server.port=8088 --spring.profiles.active=prod
```

- 远程调试


### homebrew安装
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
安装后路径 `/opt/homebrew/bin`
添加到环境变量
```
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc 
source ~/.zshrc
```


【不建议】安装yarn，通过brew安装，不会添加到环境变量
```
brew yarn
```

【建议】安装yarn，通过以下方式安装，会自动加入环境变量
```
sudo npm install --global yarn
```

报错如下
```shell
==> Downloading and installing Homebrew...
fatal: unable to access 'https://github.com/Homebrew/brew/': Failed to connect to github.com port 443 after 20882 ms: Couldn't connect to server
Failed during: /usr/bin/git fetch --force origin
```

```
brew update-reset
```

### python安装[python2.7](https://www.python.org/downloads/macos/)
```bash
brew install python

# 指定版本，如安装失败就手动下载装 
brew install python@2.7
```

### 安装指定版本pod (`-v 1.11.2`)
```shell
sudo gem install cocoapods -v 1.11.2
```

如报错如下
```
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/gems/2.6.0 directory.
gerry@gerrys-MacBook-Pro ios % ERROR:  While executing gem ... (Gem::FilePermissionError)
```

报错则执行下面命令
```shell
gem install cocoapods -v 1.11.2 --user-install
```


### 安装ruby
```shell
 brew install ruby
```

### 显示当前使用shell
```shell
echo $SHELL
```

### [node版本管理nvm](https://heynode.com/tutorial/install-nodejs-locally-nvm/)
```shell
# Download the install script
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh

# Run the install script
bash install_nvm.sh

# Install a specific version
nvm install 16.20.1

# Switch to another version
nvm use 10.16.3
# => Now using node v10.16.3 (npm v6.9.0)

# List available versions
nvm ls-remote

# List installed versions
nvm ls
```

### 安装Sequel Pro
[Sequel Pro 支持mysql8.0](https://sequelpro.com/builds/Sequel-Pro-Build-97c1b85783.zip)


### 安装mysql
[mysql下载](https://dev.mysql.com/downloads/windows/installer/)

### 安装redis
```shell
brew install redis

# 运行redis server端
redis-server

# 运行redis client端
redis-cli

# 连接远程redis 数据库
redis-cli -h host -p port -a password
```


# 安装nrm，npm源管理命令
```shell
# 安装npm管理工具
npm i -g nrm

# 列出可用源
nrm ls

# 使用yarn源
nrm use yarn
```

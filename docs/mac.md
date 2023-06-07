### homebrew安装
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
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

### python安装
```bash
brew install python
```


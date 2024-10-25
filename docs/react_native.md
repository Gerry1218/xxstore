## React Native
### 整体项目结构
    .
    ├── android
    ├── ios     
    ├── docs
    ├── assets 
    ├── bundles
    ├── node_modules
    ├── src
    │   ├── actions
    │   ├── components
    │   ├── pages
    │   ├── reducers
    │   ├── services
    │   ├── store
    │   └── pages
    │       ├── book
    │       └── home
    │
    ├── .gitignore
    ├── package.json
    ├── README.md
    └── yarn.lock

- 结构说明
    - android
    android项目
    - ios
    iOS项目
    - docs
    文档
    - assets
    react native资源
    - bundles
    react native bundle目录
    - node_modules
    react native依赖
    - src
    react native源码

- 组件依赖
    | 库名 | 版本 | 简介 |
    | :----: | :----: | :----: |
    | react | 16.13.1 | 无 |
    | react-native | 0.63.5 | 无 |


- 调试对话框快捷键
    - iOS模拟器 CTRL+CMD+Z / CMD+D
    - Android模拟器  CMD+M
    - 真机 摇一摇

- 项目打包
```shell
// Android
react-native bundle --platform android --entry-file index.js --bundle-output ./bundles/android/index.bundle --assets-dest ./bundles/android --dev false

// iOS
react-native bundle  --platform ios --entry-file index.js --bundle-output ./bundles/ios/index.bundle --assets-dest ./bundles/ios --dev flase
```

- 命令行找不到react-native,执行如下命令即可安装当前版本的rn
```shell
sudo npm i -g react-native-cli
```


- `yarn start`报错
```shell
Error: error:0308010C:digital envelope routines::unsupported
```
A: package.json文件, 添加`export NODE_OPTIONS=--openssl-legacy-provider`或者node降级到16
```shell
...
 "scripts": {
    "start": "export NODE_OPTIONS=--openssl-legacy-provider && yarn react-native start"
  },
...
```

- `yarn install`报错如下
```shell
......
node:events:491
      throw er; // Unhandled 'error' event
      ^

Error: EMFILE: too many open files, watch
    at FSWatcher._handle.onchange (node:internal/fs/watchers:207:21)
Emitted 'error' event on NodeWatcher instance at:
    at NodeWatcher.checkedEmitError (/Users/gerry/code/wenwen/rn-wwhcat/node_modules/sane/src/node_watcher.js:143:12)
    at FSWatcher.emit (node:events:513:28)
    at FSWatcher._handle.onchange (node:internal/fs/watchers:213:12) {
  errno: -24,
  syscall: 'watch',
  code: 'EMFILE',
  filename: null
}

Node.js v18.16.1
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

A: NodeWatcher出现了问题
解决方法：
1. Error: EMFILE: too many open files, watch
这是因为项目较大，发布过程中已经超过了mac默认的文件监听上限,
先输入launchctl limit 看一下 maxfiles 默认是256
执行sudo launchctl limit maxfiles 524288 524288 输入密码则设置成功
再执行launchctl limit可以看到修改成功;

2. /bin/zsh -c “$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)”
复制上面的命令到终端 安装homebrew;

3. brew reinstall watchman
复制上面的命令重新安装watchman
 
### 初始化项目报错,安装指定版本react-native
```shell
npx react-native@0.68.2 init Hello --version 0.68.2
```
报错如下：
```shell
Need to install the following packages:
  react-native@0.68.2
Ok to proceed? (y) y
npm ERR! code FETCH_ERROR
npm ERR! errno FETCH_ERROR
npm ERR! invalid json response body at https://registry.npmjs.org/@react-native-community%2fcli-platform-android reason: Invalid response body while trying to fetch https://registry.npmjs.org/@react-native-community%2fcli-platform-android: EACCES: permission denied, mkdir '/Users/gerry/.npm/_cacache/content-v2/sha512/22/2a'

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/gerry/.npm/_logs/2023-07-07T06_57_25_285Z-debug-0.log
```

A: 切换到淘宝源
```shell
# 查看npm源
npm config get registry
https://registry.npmjs.org/

# 设置源
npm config set registry https://registry.npm.taobao.org
```

### 指定运行的ios模拟器
```shell
# 查看可用模拟器
xcrun simctl list

# 启动指定模拟器
yarn ios --simulator="iPhone 14 Pro"

# 打开模拟器
open -a Simulator
```

### 启动android模拟器
```shell
# 查看可用的模拟器
emulator -list-avds
# 启动指定模拟器
emulator @Pixel_XL_API_30

# 启动指定模拟器
yarn android @Pixel_XL_API_30

# 启动android
react-native run-android
```

### [加载差分包报错](https://github.com/smallnew/react-native-multibundler)
1. iOS加载基础差分包后，页面无法点击和滑动
A、react native中的RCTLogBoxView窗口（UIWindow）在顶层了，在`RCTDefines.h`文件中添加如下代码
```shell
#define RCT_DEV_MENU 0
```

2. 加载全量bundle报错
```
2023-07-11 14:04:49.789079+0800 xxshop[51007:290440] [javascript] Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication)
2023-07-11 14:04:49.794761+0800 xxshop[51007:290440] [javascript] Unable to symbolicate stack trace: Bundle was not loaded from the packager
```
A、方案同问题1

3. 加载基础差分包报错，页面无法滑动，现象同第一个问题
  ```
  2023-07-11 16:52:42.706141+0800 xxshop[77058:486030] [javascript] TypeError: null is not an object (evaluating 'o.travelDrawable')
  2023-07-11 16:52:42.788270+0800 xxshop[77058:485666] [native] Running surface LogBox ({
      initialProps =     {
      };
      rootTag = 1;
  })
  2023-07-11 16:52:42.797307+0800 xxshop[77058:486030] [javascript] Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication)
```

A、
注释调用SmartAssets三方库相关代码，重新生成基础包。
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


- 项目打包
```
// Android
react-native bundle --platform android --entry-file index.js --bundle-output ./bundles/android/index.bundle --assets-dest ./bundles/android --dev false

// iOS
react-native bundle  --platform ios --entry-file index.js --bundle-output ./bundles/ios/index.bundle --assets-dest ./bundles/ios --dev flase
```

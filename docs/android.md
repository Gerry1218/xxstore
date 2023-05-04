## Android

- 新工程编译报错，如下
```
Can't determine type for tag '<macro name="m3_comp_assist_chip_container_shape">?attr/shapeAppearanceCornerSmall</macro>'
```
修改app/build.gradle的依赖版本
```
androidx.appcompat:appcompat:1.4.1
implementation 'com.google.android.material:material:1.6.0'
```

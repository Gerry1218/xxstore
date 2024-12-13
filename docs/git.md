## Git

1. 合并dev分支上的commit到master分支, 
```shell
# 切换到master
git checkout master

# 不包含<commit-hash-1>, 包含<commit-hash-N>,  (<commit-hash-1>, <commit-hash-N>]
git cherry-pick <commit-hash-1>..<commit-hash-N>

# 冲突后继续pick下一个commit
git cherry-pick --continue
```


2. 已commit,没有push的代码
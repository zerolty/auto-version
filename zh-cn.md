# auto-vers

<p align="center">
    <a href="https://travis-ci.org/hua1995116/auto-version"><img src="https://travis-ci.org/hua1995116/auto-version.svg?branch=master" /></a>
    <a href="https://codecov.io/gh/hua1995116/auto-version"><img src="https://codecov.io/gh/hua1995116/auto-version/branch/master/graph/badge.svg" /></a>
    <a href="https://npmcharts.com/compare/auto-vers?minimal=true" rel="nofollow"><img src="https://img.shields.io/npm/dm/auto-vers.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/auto-vers" rel="nofollow"><img src="https://img.shields.io/npm/v/auto-vers.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/auto-vers" rel="nofollow"><img src="https://img.shields.io/npm/l/auto-vers.svg?style=flat" style="max-width:100%;"></a>
</p>

# 语言

[中文版](./zh-cn.md) [English](./README.md)

**自动帮你的应用更新版本**

> auto-vers对你的工作很有帮助。 它将在构建应用程序时自动更新软件包版本。

当在迭代版本的时候，更新版本是一件微不足道但却不可或缺的小事。 你可以在打包应用程序时运行它，不需要花更多的时间来完成这件事。

# 介绍文章

[pkg版本规范管理自动化最佳实践](https://juejin.im/post/5c4454146fb9a04a0164a289)

# 功能

- [x] 更新 major, minor, patch or prerelease
- [x] 在cli的时候确认信息
- [x] 支持git打包方式
- [ ] 根据git commit的信息来自动推荐合适的版本

# 使用

```shell
npm i auto-vers -g 
```

## Cli

### 基础


```shell
cat package.json
{
    ...
    "version": "1.0.0"
    ...
}
```

```
auto-vers -i
```


```shell
cat package.json
{
    ...
    "version": "1.0.1"
    ...
}
```

### 确认

```
auto-vers -i -c
```
![auto-vers-confirm.gif](https://s3.qiufengh.com/blog/auto-vers-confirm.gif)


### 提示 

```
auto-vers -t
```
![auto-vers-tip1.gif](https://s3.qiufengh.com/blog/auto-vers-tip1.gif)

如果你不想更新 , 你可以使用 `ctrl` + `c` 去停止。

### 提示和Git

使用这个选项后，在你选择一个版本后，会自动帮你提交一个commit，并且打上一个tag。

```
auto-vers -t -g 
```

### 直接修改

```
auto-vers 1.2.0 
```
or 
```
auto-vers -v 1.2.0 
```
![auto-vers-direct.gif](https://s3.qiufengh.com/blog/auto-vers-direct.gif)



options
```
auto-vers 1.0.0

Auto update version for your application
Usage: auto-vers [options] <version> [[...]]

Options
-v --version <version>
        Can update version directly.
-i --inc --increment [<level>]
        Increment a version by the specified level. Level can
        be one of: major, minor, patch, premajor, preminor
        , prepatch or prerelease. Default level is 'patch'.
        Only one version may be specified.
-e --extra [<value>]
        This is for prerelease extra data
        Such as 'beta','alpha'
-c --confirm
        Do not update the version directly, you can confirm.
        This is a safe mode.
-t --tip
        Provide choice to you. If you don't know how to update
        you can choose this option.
-g --git
        Help you make a tag.(Make you have a git repo)
```

## Node
```shell
npm i auto-vers
```

package.json
```json
{
    ...
    "version": "1.0.0"
    ...
}
```

index.js
```javascript
const autoVers = require('auto-vers');

autoVers({type: 'patch'}); // 1.0.1
```

```shell
node index.js
```

update package.json
```json
{
    ...
    "version": "1.0.1"
    ...
}
```

options

```
{
    version?: <version>,
    type: major | minor | patch | prerelease,
    url?: package.json's url,
    extra?: alpha | beta | ...
}
```
# 最佳实践

> 在你打包完你的项目同时运行这个命令是一个非常好的选择。

## 基础的方式

```json
"script": {
    "build": "babel ./src --out-dir ./dist",
    "tip": "npm run build && auto-vers -t",
    "version": "npm run build && auto-vers -t -g",
}
```

在你写好一段打包命令后，紧接着跟上`auto-vers -t`，将会给你提示需要升级至多少版本，这对你来说会有一定的指示意义。帮助你更好地区判断你需要升级至什么版本。`auto-vers -t -g` 这个命令适合于你单独发布一个版本，可以一键式的帮助你从修改 package.json -> git commit -> git tag -> git push origin [tagname] 整个流程。

## 中级的方式

```json
"script": {
    "build": "babel ./src --out-dir ./dist",
    "patch": "npm run build && auto-vers -i -c",
    "minor": "npm run build && auto-vers -i minor -c",
    "major": "npm run build && auto-vers -i major -c",
    "beta": "npm run build && auto-vers -i prerelease -c",
}
```

这个方式针对熟悉这个模式的人，每次需要打包只需要执行对应的命令。(增加参数`-c --confirm`,这是一个安全的方式去升级，帮助你确认是否升级正确，如果对你而言是一个繁琐的步骤即可去掉。）

## 高级的方式

`git-hooks`

如果你没有注册`pre-commit`和`post-commit`，可以直接移动进你的.git/hooks目录下

```
mv githook-*/*  .git/hooks/
```

如果你本地存在hooks，将项目下的hook，手动添加到你的hook下

```
cat githook-*/pre-commit >> .git/hooks/pre-commit
```

当你提交 commit 的时候，会自动跳出选择界面，选择后升级对应的版本。 （注意：如果在你的程序中有相关 commit 命令，请使用`--no-verify`来跳过此钩子，否则将循环调用）

# 说明

**权重**: version > tip > increment

**自增的额外参数**: confirm, extra

# 关于

<details>
<summary><strong>贡献</strong></summary>

欢迎你提交pr以及star本项目，如果有bug或者有功能问题请移步这里 [please create an issue](../../issues/new).

</details>

# 证书

MIT

Copyright (c) 2018 蓝色的秋风
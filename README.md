# auto-vers

<p align="center">
    <a href="https://travis-ci.org/hua1995116/auto-version"><img src="https://travis-ci.org/hua1995116/auto-version.svg?branch=master" /></a>
    <a href="https://codecov.io/gh/hua1995116/auto-version"><img src="https://codecov.io/gh/hua1995116/auto-version/branch/master/graph/badge.svg" /></a>
    <a href="https://npmcharts.com/compare/auto-vers?minimal=true" rel="nofollow"><img src="https://img.shields.io/npm/dm/auto-vers.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/auto-vers" rel="nofollow"><img src="https://img.shields.io/npm/v/auto-vers.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/auto-vers" rel="nofollow"><img src="https://img.shields.io/npm/l/auto-vers.svg?style=flat" style="max-width:100%;"></a>
</p>

# Language

[中文版](./zh-cn.md) [English](./README.md)

**Auto update version for your application**

> auto-vers is helpful to your work. It will auto update package version when build your application.

When you iterate over your application, updating the version is a trivial but indispensable little thing. You can run it while packaging your app, and then will do more with less.

# Feature

- [x] Update major, minor, patch or prerelease
- [x] Confirm update in cli
- [x] Support git tag
- [ ] According to the recommended version of git commit

# Usage

```shell
npm i auto-vers -g 
```

## Cli

### Base 


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

### Confirm 

```
auto-vers -i -c
```
![auto-vers-confirm.gif](https://s3.qiufengh.com/blog/auto-vers-confirm.gif)


### Tip 

```
auto-vers -t
```
![auto-vers-tip1.gif](https://s3.qiufengh.com/blog/auto-vers-tip1.gif)

If you don't want to update , you can enter `ctrl` + `c` to exit program 

### Tip && Git

You can select a verison. And then will commit a tag && make a tag  && push tag.

```
auto-vers -t -g 
```

### Direct

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
auto-vers 1.0.2

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
# Practices

> It is a good choice to build your application and update the version at the same time.

## Primary

```json
"script": {
    "build": "babel ./src --out-dir ./dist",
    "tip": "npm run build && auto-vers -t",
}
```
After you write a package command, followed by `auto-vers -t`, you will be prompted what versions you need to update, which will have some indication for you. Help you better judge what version you need to update to. `auto-vers -t -g` This command is suitable for you to release a separate version, which can help you modify the package.json -> git commit -> git tag -> git push origin [tagname] from the whole process.

## Intermediate

```json
"script": {
    "build": "babel ./src --out-dir ./dist",
    "patch": "npm run build && auto-vers -i -c",
    "minor": "npm run build && auto-vers -i minor -c",
    "major": "npm run build && auto-vers -i major -c",
    "beta": "npm run build && auto-vers -i prerelease -c",
}
```
This method is for people who are familiar with this mode, and only need to execute the corresponding command each time they need to package. (Increase the parameter `-c --confirm`, this is a safe way to update, to help you confirm whether the update is correct, if it is a cumbersome step for you to remove.)

## Advanced

`git-hooks`

If you have not registered pre-commit && post-commit, please move directly.

```
mv githook-*/*  .git/hooks/
```

Git hooks exist.

```
cat githook-*/pre-commit >> .git/hooks/pre-commit
```

When you commit the 'commit', it will automatically pop out of the selection interface, select and update the corresponding version. (Note: If there is a related commit command in your program, use `--no-verify` to skip this hook, otherwise it will be called in a loop)

**Tip:**

> Because it automatically pushes you when you tag, there will be a network delay. Please ensure that you execute this command in a network.

# Instruction 

**Weights**: version > tip > increment

**increment-related**: confirm, extra

# About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

# License

MIT

Copyright (c) 2018 蓝色的秋风
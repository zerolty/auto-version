# auto-vers

<p align="center">
    <a href="https://travis-ci.org/hua1995116/auto-version"><img src="https://travis-ci.org/hua1995116/auto-version.svg?branch=master" /></a>
    <a href="https://codecov.io/gh/hua1995116/auto-version"><img src="https://codecov.io/gh/hua1995116/auto-version/branch/master/graph/badge.svg" /></a>
    <a href="https://npmcharts.com/compare/auto-vers?minimal=true" rel="nofollow"><img src="https://img.shields.io/npm/dm/auto-vers.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/auto-vers" rel="nofollow"><img src="https://img.shields.io/npm/v/auto-vers.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/auto-vers" rel="nofollow"><img src="https://img.shields.io/npm/l/auto-vers.svg?style=flat" style="max-width:100%;"></a>
</p>

**Auto update version for your application**

> auto-vers is helpful to your work. It will auto update package version when build your application.

When you iterate over your application, updating the version is a trivial but indispensable little thing. You can run it while packaging your app, and then will do more with less.

# Feature

- [x] upgrade major, minor, patch or prerelease
- [ ] confirm update in cli

# Usage

```shell
npm i auto-vers
```

## Cli

package.json
```json
{
    ...
    "version": "1.0.0"
    ...
}
```

bash 
```
./bin/auto-vers -i
```


package.json
```json
{
    ...
    "version": "1.0.1"
    ...
}
```

options
```
-i --increment [<level>]
        Increment a version by the specified level.  Level can
        be one of: major, minor, patch or prerelease.
        Default level is 'patch'.
        Only one version may be specified.
-e --extra [<value>]
        This is for prerelease extra data
        Such as 'beta','alpha'
```

## Node
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
    type: major | minor | patch | prerelease,
    url?: package.json's url,
    extra?: alpha | beta | ...
}
```
# Practices
It is a good choice to build your application and upgrade the version at the same time.

```json
"script": {
    "build": "babel ./src --out-dir ./dist",
    "patch": "npm run build && ./bin/auto-vers -i",
    "minor": "npm run build && ./bin/auto-vers -i minor",
    "major": "npm run build && ./bin/auto-vers -i major",
    "beta": "npm run build && ./bin/auto-vers -i prerelease",
}
```

# License

MIT

Copyright (c) 2018 蓝色的秋风
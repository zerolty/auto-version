# auto-vers

**Auto update version for your application**

> auto-vers is helpful to your work. It will auto update package version when build your application.

# Usage

```
npm i auto-vers

auto-vers -h

```

your package.json

```
"script": {
    "build": "babel ./src --out-dir ./dist && ./bin/auto-vers -i",
    "build-m": "babel ./src --out-dir ./dist && ./bin/auto-vers -i minor",
    "build-a": "babel ./src --out-dir ./dist && ./bin/auto-vers -i major",
    "build-t": "babel ./src --out-dir ./dist && ./bin/auto-vers -i prerelease"
}
```
When you iterate over your application, updating the version is a trivial but indispensable little thing. You can run it while packaging your app, and then will do more with less.



# Options
-i --increment [<level>]
        Increment a version by the specified level.  Level can
        be one of: major, minor, patch or prerelease.
        Default level is 'patch'.
        Only one version may be specified.
-e --extra [<value>]
        This is for prerelease extra data
        Such as 'beta','alpha'

# License

MIT

Copyright (c) 2018 蓝色的秋风
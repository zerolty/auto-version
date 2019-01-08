const semver = require('semver');
const colors = require('colors');

const {pkgRead, pkgUpdate} = require('./pkg');

const package = pkgRead();

function autoVersion(type, extra) {
    const oldVer = getCurrentVersion();
    let newVer = '';
    if(type.indexOf('.') > -1) {
        newVer = type;
    } else {
        newVer = getNewVersion(oldVer, type, extra);
    }
    console.log(`version will update ${oldVer} -> ${newVer}`.red);
    pkgUpdate(Object.assign(package, {version: newVer}))
    return newVer;
}

function getCurrentVersion() {
    return package.version;
}

function getNewVersion(oldVer, type, extra) {
    const oldVersion = oldVer;
    let newVersion = null;
    switch (type) {
        case 'major':
        case 'minor':
        case 'patch':
            newVersion = semver.inc(oldVersion, type);
        case 'prerelease':
            if(extra) {
                newVersion = semver.inc(oldVersion, type, extra);
            } else {
                if(!semver.prerelease(oldVersion)) {
                    extra = 'bata';
                    newVersion = semver.inc(oldVersion, type, extra);
                } else {
                    newVersion = semver.inc(oldVersion, type);
                }
            }
    }
    if(!newVersion) {
        throw new Error('error in update version');
    }
    return newVersion;
}

module.exports = autoVersion;
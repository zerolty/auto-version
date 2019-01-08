const semver = require('semver');
const colors = require('colors');

const {pkgRead, pkgUpdate} = require('./pkg');

function autoVersion(type, extra) {
    let newVer = '';
    if(type.indexOf('.') > -1) {
        newVer = type;
    } else {
        newVer = getNewVersion(oldVer, type, extra);
    }
    const oldVer = getCurrentVersion();
    console.log(`version will update ${oldVer} -> ${newVer}`.red);
    return newVer;
}

function getCurrentVersion() {
    return pkgRead().version;
}

function getNewVersion(oldVer, type, extra) {
    const oldVersion = oldVer;
    switch (type) {
        case 'major':
        case 'minor':
        case 'patch':
            return semver.inc(oldVersion, type);
        case 'release':
            if(extra) {
                return semver.inc(oldVersion, type, extra);
            }
            return semver.inc(oldVersion, type);
    }
}

module.exports = autoVersion;
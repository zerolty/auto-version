const semver = require('semver');
const colors = require('colors');

const {pkgRead, pkgUpdate} = require('./pkg');

function autoVersion({type, extra, url}) {
    const newVer = updateVersion({type, extra, url});
    pkgUpdate(url, Object.assign(pkgRead(url), {version: newVer}));
    return newVer;
}

function updateVersion({type, extra, url, version}) {
    const oldVer = getCurrentVersion(url);
    let newVer = version ? version : getNewVersion(oldVer, type, extra);
    console.log(`version will update ${oldVer} -> ${newVer}`.red);
    return newVer;
}

function getCurrentVersion(url) {
    return pkgRead(url).version;
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
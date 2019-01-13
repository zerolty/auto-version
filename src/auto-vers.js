const semver = require('semver');
const colors = require('colors');
const { prompt } = require('enquirer');

const {pkgRead, pkgUpdate} = require('./pkg');

function autoVersion({type, extra, url, confirm}) {
    const {version, text} = updateVersion({type, extra, url});
    if(confirm) {
        const question = {
            type: 'confirm',
            name: 'progress',
            initial: 'yes',
            message: text
        };
        prompt(question)
            .then(answer => {
                if(answer.progress) {
                    pkgUpdate(url, Object.assign(pkgRead(url), {version}));
                } else {
                    console.log('cancel');
                }
            })
            .catch(console.error);
    } else {
        console.log(text);
        pkgUpdate(url, Object.assign(pkgRead(url), {version}));
    }
    return version;
}

function updateVersion({type, extra, url, version}) {
    const oldVer = getCurrentVersion(url);
    let newVer = version ? version : getNewVersion(oldVer, type, extra);
    return {version: newVer, text: `version will update ${oldVer} -> ${newVer}`.red};
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
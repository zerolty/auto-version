const semver = require('semver');
const colors = require('colors');
const { prompt, Select } = require('enquirer');

const {pkgRead, pkgUpdate} = require('./pkg');

function autoVersion({version, type, extra, url, confirm, tip}) {
    if(version) {
        pkgUpdate(url, Object.assign(pkgRead(url), {version}));
        return version;
    }
    if(tip) {
        tipToUpdate({extra, url});
        return;
    }
    const {oldVer, newVer} = updateVersion({type, extra, url});
    const text = `version will update ${oldVer} -> ${newVer}`.red;
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
                    pkgUpdate(url, Object.assign(pkgRead(url), {version: newVer}));
                } else {
                    console.log('cancel');
                }
            })
            .catch(console.error);
    } else {
        console.log(text);
        pkgUpdate(url, Object.assign(pkgRead(url), {version: newVer}));
    }
    return newVer;
}

function tipType(type, oldVer, newVer) {
    let text = '';
    switch (type) {
        case 'major':
            text = `[major] Breaking Changes or Refactor code.`;
            break;
        case 'minor':
            text = `[minor] Some new feature or some function.`;
            break;
        case 'patch':
            text = `[patch] Fix bug or little change.`;
            break;
        case 'premajor':
            text = `[premajor] Major revision for test.`;
            break;
        case 'preminor':
            text = `[preminor] Minor revision for test.`;
            break;
        case 'prepatch':
            text = `[prepatch] Don't suggest it.`;
            break;
        case 'prerelease':
            text = `[prerelease] Update test version.`;
            break;
        default:
            return 'prerelease';
    }
    return `${text}(${oldVer} -> ${newVer})`
}

function tipToUpdate({extra, url}) {
    const oldVer = getCurrentVersion(url);
    const list = [];
    const preList = [];
    const major = getNewVersion(oldVer, 'major', extra);
    const minor = getNewVersion(oldVer, 'minor', extra);
    const patch = getNewVersion(oldVer, 'patch', extra);
    const arr = [['patch', patch], ['minor', minor], ['major', major], ['preRelease', 'prerelease']].map(item => {
        return {
            message: tipType(item[0], oldVer, item[1]),
            value: item[1]
        }
    });
    list.push(...arr);
    const premajor = getNewVersion(oldVer, 'premajor', extra);
    const preminor = getNewVersion(oldVer, 'preminor', extra);
    const prepatch = getNewVersion(oldVer, 'prepatch', extra);
    const prerelease = getNewVersion(oldVer, 'prerelease', extra);
    const preArr = [['premajor', premajor], ['preminor', preminor], ['prepatch', prepatch], ['prerelease', prerelease]].map(item => {
        return {
            message: tipType(item[0], oldVer, item[1]),
            value: item[1]
        }
    });
    preList.push(...preArr);
    
    const prompt = new Select({
        name: 'version',
        message: 'Update to version',
        choices: list
    });
      
    prompt.run()
        .then(answer => {
            if(answer === 'prerelease') {
                const prerPompt = new Select({
                    name: 'pre-version',
                    message: 'Update to pre-version',
                    choices: preList 
                })
                prerPompt.run()
                    .then(res => {
                        pkgUpdate(url, Object.assign(pkgRead(url), {version: res}));
                    })
                    .catch(console.error);
            } else {
                pkgUpdate(url, Object.assign(pkgRead(url), {version: answer}));
            }
        })
        .catch(console.error);
}

function updateVersion({type, extra, url, version}) {
    const oldVer = getCurrentVersion(url);
    let newVer = version ? version : getNewVersion(oldVer, type, extra);
    return {oldVer, newVer};
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
            break;
        case 'premajor':
        case 'preminor':
        case 'prepatch':
        case 'prerelease':
            if(extra) {
                newVersion = semver.inc(oldVersion, type, extra);
            } else {
                if(!semver.prerelease(oldVersion) || type !== 'prerelease') {
                    extra = 'bata'
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

module.exports = {
    autoVersion,
    getNewVersion,
    getCurrentVersion
};
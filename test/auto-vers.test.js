const path = require('path');
const assert = require('chai').assert;
const {autoVersion, tipToUpdate} = require('../src/auto-vers');
const global = require('../src/global');
const {pkgUpdate, pkgRead} = require('../src/pkg');

describe('version test', () => {
    it('major update', () => {
        const curPath = path.join(__dirname, './package.json');
        const version = autoVersion({type: 'major', url: curPath});
        const expect = '2.0.0'

        assert.equal(version, expect);

        const pkg = pkgRead(curPath);
        pkgUpdate(curPath, Object.assign(pkg, {version: '1.0.0'}));
    })
    
    it('minor update', () => {
        const curPath = path.join(__dirname, './package.json');
        const version = autoVersion({type: 'minor', url: curPath});
        const expect = '1.1.0'

        assert.equal(version, expect);

        const pkg = pkgRead(curPath);
        pkgUpdate(curPath, Object.assign(pkg, {version: '1.0.0'}));
    })

    it('patch update', () => {
        const curPath = path.join(__dirname, './package.json');
        const version = autoVersion({type: 'patch', url: curPath});
        const expect = '1.0.1'

        assert.equal(version, expect);

        const pkg = pkgRead(curPath);
        pkgUpdate(curPath, Object.assign(pkg, {version: '1.0.0'}));
    })

    it('prerelease update', () => {
        const curPath = path.join(__dirname, './package.json');
        const version = autoVersion({type: 'prerelease', url: curPath});
        const expect = '1.0.1-bata.0'

        assert.equal(version, expect);

        const pkg = pkgRead(curPath);
        pkgUpdate(curPath, Object.assign(pkg, {version: '1.0.0'}));
    })

    it('prerelease update - own', () => {
        const curPath = path.join(__dirname, './package.json');
        const version = autoVersion({type: 'prerelease', extra: 'alpha', url: curPath});
        const expect = '1.0.1-alpha.0'

        assert.equal(version, expect);

        const pkg = pkgRead(curPath);
        pkgUpdate(curPath, Object.assign(pkg, {version: '1.0.0'}));
    })

    it('prerelease update - current', () => {
        const curPath = path.join(__dirname, './package2.json');
        const version = autoVersion({type: 'prerelease', url: curPath});
        const expect = '1.0.0-alpha.2'

        assert.equal(version, expect);

        const pkg = pkgRead(curPath);
        pkgUpdate(curPath, Object.assign(pkg, {version: '1.0.0-alpha.1'}));
    })

    it('prerelease update - change', () => {
        const curPath = path.join(__dirname, './package2.json');
        const version = autoVersion({type: 'prerelease', extra: 'bata', url: curPath});
        const expect = '1.0.0-bata.0'

        assert.equal(version, expect);

        const pkg = pkgRead(curPath);
        pkgUpdate(curPath, Object.assign(pkg, {version: '1.0.0-alpha.1'}));
    })

    it('tip type text', () => {
        const curPath = path.join(__dirname, './package.json');
        const result = tipToUpdate({url: curPath});

        const expect = `[[{"message":"[patch] ${global.PATCH}(1.0.0 -> 1.0.1)","value":"1.0.1"},{"message":"[minor] ${global.MINOR}(1.0.0 -> 1.1.0)","value":"1.1.0"},{"message":"[major] ${global.MAJOR}(1.0.0 -> 2.0.0)","value":"2.0.0"},{"message":"prerelease","value":"prerelease"}],[{"message":"[premajor] ${global.PREMAJOR}(1.0.0 -> 2.0.0-bata.0)","value":"2.0.0-bata.0"},{"message":"[preminor] ${global.PREMINOR}(1.0.0 -> 1.1.0-bata.0)","value":"1.1.0-bata.0"},{"message":"[prepatch] ${global.PREPATCH}(1.0.0 -> 1.0.1-bata.0)","value":"1.0.1-bata.0"},{"message":"[prerelease] ${global.PRERELEASE}(1.0.0 -> 1.0.1-bata.0)","value":"1.0.1-bata.0"}]]`;

        assert.equal(JSON.stringify(result), expect);
    })
})

const path = require('path');
const {expect} = require('chai');
const run = require('inquirer-test');
const {pkgUpdate, pkgRead} = require('../src/pkg');

const { UP, DOWN, ENTER } = run;

const STATIC_Q = '\u001b[?25l\u001b[36m?\u001b[39m \u001b[1mUpdate to version\u001b[22m \u001b[2m…\u001b[22m \n\u001b[36m❯\u001b[39m \u001b[36m\u001b[4m[patch] Fix bug or little change.(1.0.0 -> 1.0.1)\u001b[24m\u001b[39m\n  [minor] Some new feature or some function.(1.0.0 -> 1.1.0)\n  [major] Breaking Changes or Refactor code.(1.0.0 -> 2.0.0)\n  prerelease';

const OLD_VER = '1.0.0';

const cliPath = './bin/auto-vers';

describe('cli test', () => {
    it('patch select', async () => {
        const curPath = path.join(__dirname, './package.json');
        const result = await run([cliPath, '-t', '-p', curPath], [ENTER]);
        const newResult = result.replace(STATIC_Q, '');
        const compare = `1.0.1`
        expect(newResult).to.match(new RegExp(compare, 'g'));
        const pkg = pkgRead(curPath);
        pkgUpdate(curPath, Object.assign(pkg, {version: OLD_VER}));
    });

    it('minor select', async () => {
        const curPath = path.join(__dirname, './package.json');
        const result = await run([cliPath, '-t', '-p', curPath], [DOWN, ENTER]);
        const newResult = result.replace(STATIC_Q, '');
        const compare = `1.1.0`
        expect(newResult).to.match(new RegExp(compare, 'g'));
        const pkg = pkgRead(curPath);
        pkgUpdate(curPath, Object.assign(pkg, {version: OLD_VER}));
    });

    it('major select', async () => {
        const curPath = path.join(__dirname, './package.json');
        const result = await run([cliPath, '-t', '-p', curPath], [DOWN, DOWN, ENTER]);
        const newResult = result.replace(STATIC_Q, '');
        const compare = `2.0.0`
        expect(newResult).to.match(new RegExp(compare, 'g'));
        const pkg = pkgRead(curPath);
        pkgUpdate(curPath, Object.assign(pkg, {version: OLD_VER}));
    });
})

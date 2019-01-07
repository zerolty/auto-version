const semver = require("semver");

const {pkgRead, pkgUpdate} = require('./pkg');

function autoVersion(type, extra) {

}

function currentVersion() {
    return pkgRead().version;
}

function newVersion(type, extra) {

}

module.exports = autoVersion;
#!/usr/bin/env node

var argv = process.argv.slice(2)

var autoVers = require('../index')

var versions = null

var inc = null

var extra = null

main()
function main() {
    if (!argv.length) return help()
    while (argv.length) {
        var a = argv.shift()
        var indexOfEqualSign = a.indexOf('=')
        if (indexOfEqualSign !== -1) {
            a = a.slice(0, indexOfEqualSign)
            argv.unshift(a.slice(indexOfEqualSign + 1))
        }
        switch (a) {
            case '-v':
            case '--version':
                versions = argv.shift()
                break
            case '-i':
            case '--inc':
            case '--increment':
                switch (argv[0]) {
                    case 'major':
                    case 'minor':
                    case 'patch':
                    case 'release':
                        inc = argv.shift()
                        break
                    default:
                        inc = 'patch'
                        break
                }
                break
            case '-e':
            case '-extra':
                extra = null
                break
            case '-h':
            case '--help':
            case '-?':
                return help()
            default:
                versions = a
                break
        }
    }
    if(versions) {
        return autoVers(versions)
    }
    if(extra && inc === 'release') {
        return autoVers('release', extra)
    }

    if(inc)
    return autoVers(inc)
}

function help() {
    console.log('help');
}
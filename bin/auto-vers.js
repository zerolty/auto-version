#!/usr/bin/env node

var argv = process.argv.slice(2)

var autoVers = require('../index')

var version = require('../package.json').version

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
                    case 'prerelease':
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
    if(extra && inc === 'prerelease') {
        return autoVers('prerelease', extra)
    }
    if(inc) {
        return autoVers(inc)
    }
}

function help() {
    console.log(['auto-vers '+ version, 
    '',
    'Auto update version for your application',
    'Usage: auto-vers [options] <version> [[...]]',
    '',
    'Options',
    '-i --increment [<level>]',
    '        Increment a version by the specified level.  Level can',
    '        be one of: major, minor, patch or prerelease.',
    "        Default level is 'patch'.",
    '        Only one version may be specified.',
    '-e --extra [<value>]',
    '        This is for prerelease extra data',
    "        Such as 'beta','alpha' ",
    ].join('\n'));
}
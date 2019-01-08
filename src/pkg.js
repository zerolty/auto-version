const path = require('path');
const fs = require('fs');
const os = require('os');

function pkgRead() {
    const pkg = pkgPath();
    const packageCtx = fs.existsSync(pkg);
    if(packageCtx) {
        const file = fs.readFileSync(pkg);
        let data = '';
        try {
            data = JSON.parse(file);
            return data;
        } catch(e) {
            throw new Error('No valid package.json found');
        }
    }
    throw new Error('No package.json found');
}

function pkgUpdate(data) {
    const pkg = pkgPath();
    data = JSON.stringify(data, null, 2);
    fs.writeFileSync(pkg, data + os.EOL);
}

function pkgPath() {
    return path.join(process.cwd(), 'package.json')
}

module.exports = {
    pkgRead,
    pkgUpdate
}
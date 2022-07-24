const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// win10 锁屏壁纸路径
const sourDir = path.join(os.userInfo().homedir, 'AppData/Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets');
// 壁纸输出地址
const distDir = path.join(__dirname, './img');

function createMd5(content = 'hello md5') {
    return crypto.createHash('md5').update(content).digest('hex')
}

function copyFile(_src, _dst) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(_src);
        const writeStream = fs.createWriteStream(_dst);
        readStream.pipe(writeStream);
        readStream.on('error', err => {
            console.log("fileCopy error:" + err)
            reject(err)
        })
        readStream.on('end', () => {
            console.log(_dst, `-->>> 复制成功!`)
            resolve(_dst)
        })
    })
}

function checkDir(dst, createDir = true) {
    return new Promise((resolve, reject) => {
        fs.access(dst, fs.constants.F_OK, (err) => {
            if (err) {
                if (createDir) {
                    fs.mkdirSync(dst);
                    resolve(dst);
                } else {
                    reject(err)
                }
            } else {
                resolve(dst);
            }
        })
    })
}

// 拷贝图片
async function run() {
    await checkDir(distDir);
    let fileList = fs.readdirSync(sourDir)
    for (let fileName of fileList) {
        let filePath = path.join(sourDir, fileName)
        let randomName = createMd5(filePath).substr(0, 6)
        await copyFile(filePath, `${distDir}/img${randomName}.jpg`)
    }
    clearRepeat()
}
run()

// 重复的、小于100kb的清除
function clearRepeat() {
    let sizeList = []
    let index = 1
    let fileList = fs.readdirSync(distDir)
    for (let fileName of fileList) {
        let filePath = path.join(distDir, fileName)
        let file = fs.statSync(filePath)
        let size = file.size
        let state = sizeList.includes(size) || size < 100 * 1024
        if (state) {
            console.log('-->>> 清除', index++)
            fs.unlinkSync(filePath)
        } else {
            sizeList.push(size)
        }
    }
}
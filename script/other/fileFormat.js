const fs = require('fs');
const prettier = require('prettier');
const { deerTools } = require('D:/myPackage');

function fileFormat(item) {
    return new Promise((resolve, reject) => {
        let parser = 'babel'
        if (item.fileName.endsWith('.vue')) {
            parser = 'vue'
        }
        try {
            let text = fs.readFileSync(item.filePath).toString()
            let result = prettier.format(text, {
                parser, // parser see: https://prettier.io/docs/en/options.html#parser
                semi: false, // 行尾不需要分号
                singleQuote: true, // 单引号
                trailingComma: 'none' // 末尾不需要逗号
            })
            if (text === result) {
                return resolve()
            }
            fs.writeFile(item.filePath, result, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        } catch (error) {
            reject(error)
        }
    })

}

async function main() {
    const srcPath = 'D:/xrlx/admin_menu/gy_system/src'
    let fileList = deerTools.file.getFileFlatList(srcPath)
    let count = { success: 0, fail: 0, all: 0 }
    for (let item of fileList) {
        if (item.isFile && /\.(js|vue)$/.test(item.fileName)) {
            count.all++
            try {
                process.stdout.write('█');
                await fileFormat(item);
                count.success++
            } catch (error) {
                count.fail++
                console.log(item, 'error 解析失败')
            }
        }
    }
    console.log(`\n目录 ${srcPath} 下的[ ${count.all} ]个文件全部整理完毕 \n成功[ ${count.success} ]个，失败 [ ${count.fail} ]个`)
}

main()
const { deerTools, myUtils } = require('D:/myPackage');
const rootUrl = 'https://www.9ku.com';

// 解析对应歌曲详情地址，摘自 https://www.9ku.com/js/player/player20210408.js?v=20210606
function getSonUrl(page) {
    var id = ''
    page.replace(/([\d]+)\.htm/, (all, item) => { id = item })
    if (!id) return ''
    var tpath = Math.floor(id / 1000) + 1;
    let url = `${rootUrl}/html/playjs/${tpath}/${id}.js`
    return url
};
; (async function () {
    // 获取网页歌单
    let pageStr = await deerTools.api.apiGet(`${rootUrl}/laoge/500shou.htm`)
    let $ = myUtils.getDom(pageStr)
    var pageList = []
    $('#fall li a').each((i, item) => {
        pageList.push($(item).attr('href'))
    })
    // 获取歌曲详情
    let urlList = pageList.slice(0, 5).map(page => getSonUrl(page))
    var list = await deerTools.api.multipleApi(urlList, deerTools.api.apiGet, 3)
    var result = list.map(e => eval(e))
    deerTools.file.writeTxt('../../mockData/musicInfoList.json', result)
})();
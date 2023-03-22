/**
 * 模拟上传文件接口
 * @param {File} file
 */
export async function uploadFileApi(file) {
  // 直接转为本地链接 模拟上传操作
  const imgUrl = URL.createObjectURL(file)
  return imgUrl
}

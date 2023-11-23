/*
 * @Author: czh-mac
 * @Date: 2023-08-16 10:39
 * @LastEditTime: 2023-11-23 15:01
 * @Description: 头部注释
 */
async function setHot() {
  try {
    const response = await fetch('https:///gezizm.com/api/common/hot', {
      method: 'POST'
    })
    const { data } = await response.json()
    if (data) {
      await chrome.storage.local.set({ hotVal: data })
      console.log('设置成功')
    }
  } catch (e) {
    console.erro(e)
  }
}
export { setHot }

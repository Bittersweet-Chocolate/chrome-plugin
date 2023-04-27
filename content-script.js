/*
 * @Author: czh-mac
 * @Date: 2022-12-18 17:04
 * @LastEditTime: 2023-02-15 17:11
 * @Description: content_script
 * 可以配置静态声明去注入
 * 可以通过编程方式注入 需要获取activeTab权限
 */
window.localStorage.setItem('content-script', 'content-script')

chrome.storage.local.set({ key: 'content - script' }).then(() => {
  console.log('storage设置成功:content - script')
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`我接收到了${request.info}`)
  const data = `script接收到：${request.info}-发来的信息了`
  // 插入内联脚本
  if (request.src) {
    var s = document.createElement('script')
    s.src = request.src
    var doc = document.head || document.documentElement
    return doc.appendChild(s)
  }
  sendResponse && sendResponse({ data })
})

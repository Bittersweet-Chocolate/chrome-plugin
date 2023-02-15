console.log('操作已注入')

// 注入用户名，密码
function fillAdmin() {
  // var evt = document.createEvent('HTMLEvents')
  // // input 事件，是否冒泡，是否可以取消
  // evt.initEvent('input', true, true)
  // 新事件注册
  var evt = new CustomEvent('input', { bubbles: true, cancelable: true })
  $('input:text').val('admin').get(0).dispatchEvent(evt)
  $('input:password').val('2wsxVFR_').get(0).dispatchEvent(evt)
  var btn = $('.ivu-btn')[0]
  btn.click()
}

// 强制开启vue
function useVue(src) {
  var s = document.createElement('script')
  s.src = src
  var doc = document.head || document.documentElement
  return doc.appendChild(s)
}

function messageHandler(request, sender, sendResponse) {
  const { news, src } = request
  try {
    // v3 版本现不支持eval new Function
    // new Function(`${news}()`)()
    setTimeout(`${news}("${src}")`, 1)
    sendResponse({
      news,
      code: 1
    })
  } catch (e) {
    console.error(e)
    sendResponse({
      news,
      code: -1,
      message: (e && e.message) || '失败'
    })
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  messageHandler(request, sender, sendResponse)
})

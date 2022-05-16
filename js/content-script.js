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

function messageHandler(request, sender, sendResponse) {
  const { news } = request
  eval(`${news}()`)
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  messageHandler(request, sender, sendResponse)
})

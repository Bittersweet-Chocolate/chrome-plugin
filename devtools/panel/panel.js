/*
 * @Author: czh-mac
 * @Date: 2022-12-18 19:33
 * @LastEditTime: 2023-03-23 14:23
 * @Description: 头部注释
 */
function handleResult(result, isException) {
  let str = '输出结果：'
  if (isException) {
    console.log(isException)
    str += JSON.stringify(isException)
  } else {
    console.log('输出结果', result)
    str += JSON.stringify(result)
  }
  document.getElementById('dev_log').innerHTML = str
}

// 检查JQ
const checkjQuery =
  "if(typeof jQuery !== 'undefined'){$.fn.jquery}else{ '未引入' }"
button_jquery.addEventListener('click', () => {
  chrome.devtools.inspectedWindow.eval(checkjQuery, handleResult)
})

// 改变dom
const evalString = "document.body.style.backgroundColor = 'red'"
button_background.addEventListener('click', () => {
  chrome.devtools.inspectedWindow.eval(evalString, handleResult)
})

// 发送消息
button_message.addEventListener('click', () => {
  chrome.runtime.sendMessage(
    {
      tabId: chrome.devtools.inspectedWindow.tabId,
      info: 'panel'
    },
    (res) => {
      document.querySelector('#incept').innerHTML = res.data
    }
  )
})
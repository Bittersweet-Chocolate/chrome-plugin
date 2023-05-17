/*
 * @Author: czh-mac
 * @Date: 2022-12-18 19:13
 * @LastEditTime: 2023-05-17 15:28
 * @Description: 旧 background页面
 * 不使用时终止，需要时重新启动
 * 无权访问 DOM
 */
console.log('service-worker')
function setHtml() {
  document.body.innerHTML = '注入函数'
}
// 处理消息
function handleMessage(request, sender, sendResponse) {
  if (request.info) {
    console.log(request.info)
    const data = `service接收到：${request.info}-发来的信息了`
    sendResponse && sendResponse({ data })
  }
  // 操作dom
  if (sender.url.includes('panel')) {
    chrome.scripting.executeScript({
      target: { tabId: request.tabId },
      func: setHtml
    })
  }
}

chrome.runtime.onMessage.addListener(handleMessage)

function clearRules() {
  chrome.declarativeNetRequest.getDynamicRules((previousRules) => {
    console.log('已配置的规则', previousRules)
    const previousRuleIds = previousRules.map((rule) => rule.id)
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: previousRuleIds
    })
  })
}

function setRules() {
  clearRules()
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: [
        {
          id: 1,
          priority: 2,
          action: {
            type: 'modifyHeaders',
            responseHeaders: [
              {
                header: 'Access-Control-Allow-Origin',
                operation: 'set',
                value: '*'
              }
            ]
          },
          condition: {
            urlFilter: 'localhost:3000',
            resourceTypes: [
              'main_frame',
              'xmlhttprequest',
              'webtransport',
              'other'
            ]
          }
        },
        {
          id: 2,
          priority: 1,
          action: {
            type: 'redirect',
            redirect: {
              transform: {
                scheme: 'http',
                host: '192.168.10.28',
                port: '8080'
              }
            }
          },
          condition: {
            urlFilter: '||localhost:3000',
            resourceTypes: [
              'main_frame',
              'xmlhttprequest',
              'webtransport',
              'other'
            ]
          }
        }
      ],
      removeRuleIds: [1, 2, 11]
    },
    function () {
      console.log('规则设置完毕')
    }
  )
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
    ({ request, rule }) => {
      console.log(request, rule)
    }
  )
}
setRules()

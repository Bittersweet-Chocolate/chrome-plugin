/*
 * @Author: czh-mac
 * @Date: 2022-12-18 17:02
 * @LastEditTime: 2023-02-15 17:11
 * @Description: popup操作
 */
console.log('popup.js')
btn.addEventListener('click', () => {
  alert('我被点击了')
  console.log('测试点击')
})

// 获取当前选项卡ID
function getCurrentTabId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length) resolve({ id: tabs[0].id, url: tabs[0].url })
      else reject(new Error('can not found any tabs'))
    })
  })
}

// 给content-script发送消息
function sendMessage(message) {
  return new Promise((resolve) => {
    getCurrentTabId().then(({ id }) => {
      chrome.tabs.sendMessage(id, message, (response) => resolve(response))
    })
  })
}

sBtn.addEventListener('click', async () => {
  chrome.runtime.sendMessage({ info: 'popup' }, (res) => {
    document.querySelector('#incept').innerHTML = res.data
  })
})

cBtn.addEventListener('click', async () => {
  const res = await sendMessage({ info: 'popup' })
  document.querySelector('#incept').innerHTML = res.data
})

// 设置storage
getStorage.addEventListener('click', () => {
  chrome.storage.local.get(['key']).then((res) => {
    document.querySelector('#storage').innerHTML = res.key
  })
})

// 强制开启vue
openVue.addEventListener('click', async () => {
  // const { id } = await getCurrentTabId()
  // chrome.scripting.executeScript({
  //   target: { tabId: id },
  //   files: ['script/useVue.js']
  // })
  const src = chrome.runtime.getURL('script/useVue.js')
  await sendMessage({ info: 'popup', src })
})

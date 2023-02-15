$('#fillAdmin').on('click', async () => {
  await send2Content({
    news: 'fillAdmin'
  })
})

$('#useVue').on('click', async () => {
  // const { id } = await getCurrentTabId()
  // chrome.scripting.executeScript({
  //   target: { tabId: id },
  //   files: ['script/useVue.js']
  // })
  const src = chrome.runtime.getURL('script/useVue.js')
  await send2Content({ news: 'useVue', src })
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

function send2Content(message, callback) {
  return new Promise((resolve) => {
    getCurrentTabId().then(({ id, url }) => {
      chrome.tabs.sendMessage(id, message, (response) => {
        if (callback) callback(response)
        resolve(response)
      })
    })
  })
}

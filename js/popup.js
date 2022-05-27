const Background = chrome.extension.getBackgroundPage()

$('#fillAdmin').on('click', async () => {
  await send2Content({
    news: 'fillAdmin'
  })
})

$('#proxyBox').on('change', async (val) => {
  try {
    const isOpen = val.target.checked
    val.target.disabled = true
    const { url } = await getCurrentTabId()
    const res = await Background.requestListener({ isOpen, url })
    if (!res.msg) {
      val.target.checked = !val.target.checked
      alert('操作失败')
    }
  } catch (e) {
    alert(JSON.stringify(e))
  } finally {
    $('#proxyText').css('color', isOpen ? 'red' : 'grey')
    val.target.disabled = false
  }
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

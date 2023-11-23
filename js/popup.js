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

$('#clearData').on('click', async () => {
  try {
    await chrome.storage.local.clear()
    const res = await chrome.storage.local.get()
    if (!Object.keys(res).length) {
      alert('清除成功')
    }
  } catch (e) {
    console.error(e)
  }
})

$('#showHot').on('click', async () => {
  const {
    hotVal: { list }
  } = await chrome.storage.local.get()
  if (list) {
    const enums = {
      wb: list[0].splice(0, 10),
      dy: list[1].splice(0, 10),
      bd: list[2].splice(0, 10)
    }
    const hotType = $('#hotSelect').val()
    const hotList = $('#hotList')
    hotList.html('')
    // 使用.each()方法循环遍历数据
    $.each(enums[hotType], function (index, item) {
      // 创建一个新的li元素并将数据插入其中
      const str = `<span data-url="${item.url}" >${item.title}</span>`
      const li = $('<li>').html(str)
      // 将li元素添加到目标节点中
      hotList.append(li)
    })
  }
})

$('#hotList').on('click', 'span', async (e) => {
  const ele = e.target
  const url = $(ele).data('url')
  chrome.tabs.create({ url })
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

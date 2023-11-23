/*
 * @Author: czh-mac
 * @Date: 2023-04-27 15:16
 * @LastEditTime: 2023-11-23 15:50
 * @Description: 头部注释
 */

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

// 获取热点数据
let hotVal = null
async function getHot() {
  const {
    hotVal: { list }
  } = await chrome.storage.local.get()
  if (list) {
    hotVal = {
      wb: list[0].splice(0, 20),
      dy: list[1].splice(0, 20),
      bd: list[2].splice(0, 20)
    }
  }
}
function setHtml(type) {
  const hotList = $('#hotList')
  hotList.html('')
  $.each(hotVal[type], function (index, item) {
    const title =
      item.title.length > 15 ? `${item.title.substring(0, 15)}...` : item.title
    let str = `<span data-url="${item.url}" >${index + 1}. ${title}</span>`
    if (item.hotTagImg) {
      str += `<img src=${item.hotTagImg} />`
    }
    const li = $('<li>').html(str)
    hotList.append(li)
  })
}
$('#showHot').on('click', async () => {
  await getHot()
  $('.content-tabs').css('display', 'flex')
  setHtml('wb')
})
$('#reloadHot').on('click', () => {
  chrome.runtime.sendMessage({
    reloadHot: true
  })
})
$('#hotList').on('click', 'span', async (e) => {
  const ele = e.target
  const url = $(ele).data('url')
  chrome.tabs.create({ url })
})

$('.content-tabs__item').click(async function () {
  const hotType = $(this).attr('data-tab')
  $('.content-tabs__item').removeClass('active')
  $(this).addClass('active')
  setHtml(hotType)
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

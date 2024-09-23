/*
 * @Author: czh-mac
 * @Date: 2023-04-27 15:16
 * @LastEditTime: 2024-09-23 17:21
 * @Description: 头部注释
 */
import { setHot } from '../script/hot.js'

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
  const id = $('#customId').val()
  await send2Content({ news: 'useVue', data: { src, id } })
})

$('#clearData').on('click', async () => {
  try {
    await chrome.storage.local.clear()
    const res = await chrome.storage.local.get()
    if (!Object.keys(res).length) {
      alert('清除成功')
      $('.content-tabs').css('display', 'none')
    }
  } catch (e) {
    console.error(e)
  }
})

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

// 获取热点数据
let hotVal = null
async function hotLoad() {
  hotVal = await setHot()
  $('.content-tabs').css('display', 'flex')
  $('.content-tabs__item').removeClass('active')
  $('.content-tabs__item').eq(0).addClass('active')
  setHtml('wb')
}

// 初始化获取热点信息
hotLoad()

$('#reloadHot').on('click', () => {
  hotLoad()
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

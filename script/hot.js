/*
 * @Author: czh-mac
 * @Date: 2023-08-16 10:39
 * @LastEditTime: 2024-09-23 17:20
 * @Description: 头部注释
 */
const hotUrl = {
  wb: 'https://weibo.com/ajax/side/hotSearch',
  dy: 'https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/',
  bili: 'https://app.bilibili.com/x/v2/search/trending/ranking',
  bd: 'https://top.baidu.com/api/board?tab=realtime'
}

function getHot(url, method = 'get') {
  return fetch(url, {
    method
  })
}

async function setHot() {
  try {
    const hotVal = {}
    const promises = Object.keys(hotUrl).map((key) => getHot(hotUrl[key]))
    const response = await Promise.all(promises)
    for (let i = 0; i < response.length; i++) {
      const item = response[i]
      const res = await item.json()
      // wb
      if (res?.data?.realtime) {
        hotVal.wb = res.data.realtime.map((item) => ({
          title: item.note,
          url: `https://s.weibo.com/weibo?q=${item.note}&Refer=index`,
          hotTagImg: item.icon
        }))
      }
      if (res?.word_list) {
        hotVal.dy = res.word_list.map((item) => ({
          title: item.word,
          url: `https://www.douyin.com/search/${item.word}`
        }))
      }
      if (res?.data?.list) {
        hotVal.bili = res.data.list.map((item) => ({
          title: item.keyword,
          url: `https://search.bilibili.com/all?keyword=${item.keyword}&order=click`,
          hotTagImg: item.icon
        }))
      }
      if (res?.data?.cards) {
        hotVal.bd = res.data.cards[0].content.map((item) => ({
          title: item.word,
          url: item.url,
          hotTagImg: item.hotTagImg
        }))
      }
    }
    return hotVal
  } catch (e) {
    console.error(e)
  }
}

export { setHot }

/*
 * @Author: czh-mac
 * @Date: 2023-11-22 16:02
 * @LastEditTime: 2023-12-13 13:45
 * @Description: 头部注释
 */
console.log('_')
import { setHot } from './script/hot.js'

setHot()

chrome.runtime.onMessage.addListener((req) => {
  req.reloadHot && setHot()
})

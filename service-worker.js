console.log('_')
import { setHot } from './script/hot.js'

setHot()

chrome.runtime.onMessage.addListener((req) => {
  req.reloadHot && setHot()
})

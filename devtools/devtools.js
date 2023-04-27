/*
 * @Author: czh-mac
 * @Date: 2022-12-18 19:16
 * @LastEditTime: 2023-02-15 09:27
 * @Description: 创建panel
 */
function handleShown() {
  console.log('panel被展示')
}

function handleHidden() {
  console.log('panel被隐藏')
}

chrome.devtools.panels.create(
  'My Panel', // title
  'icon.png',
  '/devtools/panel/panel.html',
  (newPanel) => {
    newPanel.onShown.addListener(handleShown)
    newPanel.onHidden.addListener(handleHidden)
  }
)

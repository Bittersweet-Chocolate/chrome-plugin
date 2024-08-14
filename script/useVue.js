/*
 * @Author: czh-mac
 * @Date: 2023-02-15 14:48
 * @LastEditTime: 2024-08-14 14:42
 * @Description: 强制开启vue
 */
function init() {
  console.log('强制开启vue....')
  var flag = 0
  var vueTimer = setInterval((_) => {
    if (flag > 4) {
      clearInterval(vueTimer)
      console.warn('vue开启失败')
    }
    if (document && document.createTreeWalker) {
      clearInterval(vueTimer)
      loopDom()
    }
    flag++
  }, 500)
}
function openVue(node) {
  let vue2, vue3, flag
  if (node.__vue__) {
    vue2 = node.__vue__.$options._base
    if (!vue2.config.devtools) {
      vue2.config.devtools = true
      if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', vue2)
        flag = 1
        alert('vue开启成功')
      }
    } else {
      flag = 1
      alert('vue插件已经开启')
    }
  }
  if (node.__vue_app__) {
    vue3 = node.__vue_app__
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps.push({
      // 以下字段一个不能少
      app: vue3,
      version: vue3.version,
      types: {
        Comment: Symbol('Comment'),
        Fragment: Symbol('Fragment'),
        Static: Symbol('Static'),
        Text: Symbol('Text')
      }
    })
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.enabled = true
    flag = 1
    alert('vue开启成功')
  }
  return flag
}
function loopDom() {
  let walker, node, flag
  walker = document.createTreeWalker(document.body, 1)
  const customId = window.sessionStorage.getItem('__SELF_DEVTOOLS__VUE__ID')
  // 开启指定dom vue插件
  if (customId) {
    // 会出现相同id 节点
    node = document.querySelectorAll(customId)
    let node_idx = 0
    if (node.length > 1) {
      const idx = prompt(
        `找到${node.length}个节点，请输入要开启的节点，默认下标0`,
        '0'
      )
      node_idx = idx
    }
    if (!node) {
      alert('没有对应节点')
      return
    }
    flag = openVue(node[node_idx])
  } else {
    while ((node = walker.nextNode())) {
      flag = openVue(node)
      if (flag) break
    }
  }
  if (!flag) {
    alert('开启失败')
  }
}

init()

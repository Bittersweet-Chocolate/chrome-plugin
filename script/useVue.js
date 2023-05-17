/*
 * @Author: czh-mac
 * @Date: 2023-02-15 14:48
 * @LastEditTime: 2023-05-16 09:56
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
      openVue()
    }
    flag++
  }, 500)
}

function openVue() {
  let vue2, walker, node, vue3
  walker = document.createTreeWalker(document.body, 1)
  while ((node = walker.nextNode())) {
    if (node.__vue__) {
      vue2 = node.__vue__.$options._base
      if (!vue2.config.devtools) {
        vue2.config.devtools = true
        if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
          window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', vue2)
          alert('vue开启成功')
        }
      } else {
        alert('vue插件已经开启')
      }
      break
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
      alert('vue开启成功')
    }
  }
  if (!vue2 && !vue3) {
    alert('开启失败')
  }
}

init()

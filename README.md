# myapp

### 消息提出框（引用GitHub上的EasyToastVue）
import EasyToastVue from '@/components/common/toast'

Vue.use(EasyToastVue)

Vue.prototype.toast = function (msg, options = {}) {
  const CONSTRUCTOR = Vue.extend(EasyToastVue)
  const CACHE = {}
  options.message = msg
  let toast = CACHE[options.id] || (CACHE[options.id] = new CONSTRUCTOR())
  if (!toast.$el) {
    let vm = toast.$mount()
    document.querySelector(options.parent || 'body').appendChild(vm.$el)
  }
  toast.queue.push(options)
}

## vue

### countdown：倒计时
使用方法：
```
import ./countdown
<CountDown v-if="record.status===1&&now<record.payValidTo" :endTime="record.payValidTo"
                     class="remainingTime"></CountDown>
```  

### lazy：加载中动画
使用方法：
```
    <lazy v-on:showContent='load=true'></lazy>
    <div class="content" v-if='load'>
    </div>
```

### popup：弹出确定取消框
使用方法：
```
    <modal v-show="showModal" :button='2' v-on:close="close">
      <h2 slot="header">提示消息</h2>
      <div slot="body">{{msg}}</div>
    </modal>
    
      // 关闭弹出框
      close (flag) {
        this.showModal = false
        if (flag) {
          this.submit()
        }
      }
```

### toash：消息提出框（引用GitHub上的EasyToastVue）
使用方法
```
main.js
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
```

### slideShow：轮播图
使用方法：
```
<slide-show :slides="banner" :inv="invTime"></slide-show>

```

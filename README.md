# myapp

## ES6

### compressImg:压缩图片上传
解决问题：选择头像时拍照不能上传图片
使用方法：（在原项目9运动上的editInfo.vue）
```
    //选择拍照还是图库
    <div class="selectvicinity" v-show='photoShow'>
      <div class="select">
        <div class="option color-green bottom" @click="hidePhoto()">
          <span>请选择</span>
          <form id='formFile' hide='true' enctype="multipart/form-data">
            <input type="file" name="file" id='file' class="inputstyle" accept="image/*" capture='camera'
                   v-on:change="handleFiles($event)" multiple="multiple">
          </form>
        </div>
      </div>
      <div class="cancal color-blue" @click="hidePhoto()"><span>取消</span></div>
    </div>

```

```
      // 选择图片
      handleFiles () {
        var _this = this
        // var form = new FormData(document.getElementById('formFile'))
        compressImg.getCompressImg(document.getElementById('file').files[0], 'avatar').then(function (data) {
          _this.userPhoto = data
          _this.avatar = data
        })
      }

```

### tap：简单的手机触摸事件
解决问题：banner上的滑动感知
使用方法：
```
在vue中使用

<div class="slide-show" id='slide' @touchstart="clearInv" @touchend='runInv' @slid='slide'>
</div>

tap.bindTap()

在JS中使用和原生事件一样
```

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
···
    <lazy v-on:showContent='load=true'></lazy>
    <div class="content" v-if='load'>
    </div>
···

### notice: 错误提示消息
使用方法
```

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


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



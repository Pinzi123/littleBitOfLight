import commentdata from '@/assets/js/data/comment'
import Vue from 'vue'
let vue = new Vue()
let mimeString
export default {
  /**
   * [getCompressImg 压缩图片]
   * @Author   [wyp]
   * @DateTime 2017-06-17T16:25:16+0800
   * @param    {[File]}                 file [base64图片]
   * @param    {[string]}                 type [上传图片类型，决定是否截成正方形]
   * @return   {[Promise]}                      [异步操作]
   */
  getCompressImg (file, type) {
    let _this = this
    vue.toast('上传中')
    return new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.onload = function (e) {
        _this.compress(e.target.result, 4).then(function (dataURL) {
          _this.userPhoto = dataURL
          _this.dataURItoData(dataURL).then(function (b) {
            resolve(_this.ajaxImg(b))
          }, function () {
            vue.toast('上传失败')
          })
        }, function () {
          vue.toast('上传失败')
        })
      }
      reader.readAsDataURL(file)
    })
  },
      // 上传图片
  ajaxImg (blob) {
    var fd = new FormData()
    fd.append('file', blob, mimeString.replace('/', '.'))
    return commentdata.uploadImg(fd, vue.cookie)
    // _this.$.ajax({
    //   url: 'https://api.ns.byxem.com/base/v1/file/avatar/upload',
    //   async: false,
    //   crossDomain: true,
    //   type: 'post',
    //   data: fd,
    //   cache: false,
    //   processData: false,
    //   contentType: false,
    //   success: function (obj) {
    //     vue.popMsg(obj.msg)
    //     document.getElementById('userPhoto').src = obj.data.relativePath
    //     _this.userPhoto = obj.data.relativePath
    //     _this.avatar = obj.data.relativePath
    //   },
    //   error: function (obj) {
    //     vue.popMsg(obj)
    //   }
    // })
  },
  // base64转换为二进制
  dataURItoData (base64Data) {
    return new Promise((resolve, reject) => {
      var byteString
      if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64Data.split(',')[1])
      } else {
        byteString = unescape(base64Data.split(',')[1])
      }
      mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
      console.log(mimeString)
      var ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      var blob = new Blob([ia], {type: mimeString})
      console.log(blob.size)
      if (blob.size > 0) {
        resolve(blob)
      } else {
        reject(new Error('Could not compress image'))
      }
    })
  },
  // 压缩图片
  // 最终实现思路：
  // 1、设置压缩后的最大宽度 or 高度；
  // 2、设置压缩比例，根据图片的不同size大小，设置不同的压缩比。
  compress (res, fileSize) { // res代表上传的图片，fileSize大小图片的大小
    var _this = this
    return new Promise((resolve, reject) => {
      var img = new Image()
      var maxW = 360 // 设置最大宽度
      var dataUrl
      img.onload = function () {
        var cvs = document.createElement('canvas')
        var ctx = cvs.getContext('2d')
        if (img.width > maxW) {
          img.height = img.height * maxW / img.width
          img.width = maxW
        }

        cvs.width = img.width
        cvs.height = img.height

        ctx.clearRect(0, 0, cvs.width, cvs.height)
        ctx.drawImage(img, 0, 0, img.width, img.height)
        var compressRate = _this.getCompressRate(1, fileSize)

        dataUrl = cvs.toDataURL('image/jpeg', compressRate)
        resolve(dataUrl)
      }
      img.onerror = function () {
        reject(new Error('Could not load image'))
      }
      img.src = res
    })
  },
  getCompressRate (allowMaxSize, fileSize) { // 计算压缩比率，size单位为MB
    var compressRate = 1

    if (fileSize / allowMaxSize > 4) {
      compressRate = 0.5
    } else if (fileSize / allowMaxSize > 3) {
      compressRate = 0.6
    } else if (fileSize / allowMaxSize > 2) {
      compressRate = 0.7
    } else if (fileSize > allowMaxSize) {
      compressRate = 0.8
    } else {
      compressRate = 0.9
    }
    console.log('compressRate', compressRate)
    return compressRate
  }
}

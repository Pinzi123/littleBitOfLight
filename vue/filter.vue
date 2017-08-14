Vue.filter('money', function (value) {
  var sign = ''
  var result = ''
  var counter = 0
  if (value < 0) {
    sign = '-'
    value = 0 - value
  }
  if (value === undefined || value === null) {
    result = '0.00'
  } else {
    value = value + ''
    var value1 = value.split('.')[0] || '0'
    var value2 = value.split('.')[1] || '00'
    for (let i = value1.length - 1; i >= 0; i--) {
      counter++
      result = value1.charAt(i) + result
      if (!(counter % 3) && i !== 0) { result = ',' + result }
    }
    result = sign + result + '.' + value2.padEnd(2, '0')
  }
  return result
})

Vue.filter('detailTime', function (value) {
  var newDate = new Date()
  newDate.setTime(value)
  var month = newDate.getMonth() + 1 + ''
  month = month.padStart(2, 0)
  var date = newDate.getDate() + ''
  date = date.padStart(2, 0)
  var hours = newDate.getHours() + ''
  hours = hours.padStart(2, 0)
  var min = newDate.getMinutes() + ''
  min = min.padStart(2, 0)
  return newDate.getFullYear() + '-' + month + '-' + date +
         ' ' + hours + ':' + min
})

Vue.filter('detailTime2', function (value) {
  var newDate = new Date()
  newDate.setTime(value)
  var month = newDate.getMonth() + 1 + ''
  month = month.padStart(2, 0)
  var date = newDate.getDate() + ''
  date = date.padStart(2, 0)
  var hours = newDate.getHours() + ''
  hours = hours.padStart(2, 0)
  var min = newDate.getMinutes() + ''
  min = min.padStart(2, 0)
  return newDate.getFullYear().toString().substr(2, 2) + '-' + month + '-' + date +
         ' ' + hours + ':' + min
})

Vue.filter('simpleTime', function (value) {
  var newDate = new Date()
  newDate.setTime(value)
  var hours = newDate.getHours() + ''
  hours = hours.padStart(2, 0)
  var min = newDate.getMinutes() + ''
  min = min.padStart(2, 0)
  return hours + ':' + min
})

// 评论列表图片
Vue.filter('commentImg', function (value) {
  var length = value.length - 1
  if (value.charAt(0) === '[') {
    if (value.charAt(length) === ']') {
      return value.substring(1, length)
    } else {
      return value.substring(1, length + 1)
    }
  } else if (value.charAt(length) === ']') {
    return value.substring(0, length)
  } else {
    return value
  }
})

//使用方法
    <div class="wallet">
        {{balance |money}}

    </div>
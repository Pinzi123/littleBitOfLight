
/**
 * Created by wyp on 2017/5/8.
 * Modify by wyp on 2017/6/26.
 * 触摸事件
 */
export default {
  bindTap (id = 'slide') {
    var TOUCHSTART
    var TOUCHEND
    if (typeof (window.ontouchstart) !== 'undefined') {
      TOUCHSTART = 'touchstart'
      TOUCHEND = 'touchend'
    // TOUCHMOVE = 'touchmove'
    } else if (typeof (window.onmspointerdown) !== 'undefined') {
      TOUCHSTART = 'MSPointerDown'
      TOUCHEND = 'MSPointerUp'
    // TOUCHMOVE = 'MSPointerMove'
    } else {
      TOUCHSTART = 'mousedown'
      TOUCHEND = 'mouseup'
    // TOUCHMOVE = 'mousemove'
    }

    function tap (node) {
      var x = 0
      var y = 0
      var startTime = 0
      var endTime = 0
      var disFlag = false
      node.oncontextmenu = function () {
        return false
      }
      node.addEventListener(TOUCHSTART, function (e) {
        x = e.touches[0].pageX
        y = e.touches[0].pageY
        startTime = (new Date()).getTime()
      })

      node.addEventListener(TOUCHEND, function (e) {
       // e.stopPropagation()
       // e.preventDefault()
        var curx = e.changedTouches[0].pageX
        var cury = e.changedTouches[0].pageY
        var dis = {disX: 0, disY: 0}
        dis.disX = curx - x
        dis.disY = cury - y
        if (Math.abs(curx - x) < 6 && Math.abs(cury - y) < 6) {
          disFlag = true
        } else {
          disFlag = false
        }
        endTime = (new Date()).getTime()
        if (endTime - startTime > 300 && disFlag) {
          e.target.dispatchEvent(new CustomEvent('longtap', {
            'detail': e,
            'bubbles': true,
            'cancelable': true
          }))
        } else if (disFlag) {
          e.target.dispatchEvent(new CustomEvent('tap', {
            'detail': e,
            'bubbles': true,
            'cancelable': true
          }))
        } else {
          e.target.dispatchEvent(new CustomEvent('slid', {
            'detail': dis,
            'bubbles': true,
            'cancelable': true
          }))
        }
      })
    }

    tap(document.getElementById(id))
  }
}


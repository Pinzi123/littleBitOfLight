<template>
    <span :endTime="endTime" :callback="callback" :endText="endText" :text="text">
        <slot>
            {{text}}：{{content}}
        </slot>
    </span>
</template>
<script>
    export default {
      data () {
        return {
          content: '计算中',
          timer: ''
        }
      },
      props: {
        endTime: {
          type: Number,
          default: 0
        },
        intervalTime: {
          type: Number,
          default: 0
        },
        endText: {
          type: String,
          default: '已过时'
        },
        text: {
          type: String,
          default: '剩余时间'
        },
        callback: Function
      },
      mounted () {
        this.$nextTick(() => {
          this.countdowm(this.endTime)
        })
      },
      destroyed () {
        clearInterval(this.timer)
      },
      methods: {
        interval (value) {
          if (value) {
            var min = '00'
            var sec = '00'
            min = Math.floor(value % 3600000 / 60000)
            sec = Math.floor(value % 60000 / 1000)
            return min + '分' + sec + '秒'
          } else {
            return 'ok'
          }
        },
        countdowm (timestamp) {
          let self = this
          if (this.intervalTime) {
            let t = self.intervalTime
            this.timer = setInterval(function () {
              if (t > 0) {
                self.content = self.interval(t)
                t = t - 1000
              } else {
                clearInterval(this.timer)
                self.content = self.endText
                self._callback()
                self.eventHub.$emit('end')
              }
            }, 1000)
          } else {
            this.timer = setInterval(function () {
              let nowTime = Date.parse(new Date())
              let t = self.endTime - nowTime
              if (t > 0) {
                self.content = self.interval(t)
              } else {
                self.content = self.endText
                clearInterval(this.timer)
                self._callback()
                self.eventHub.$emit('end')
              }
            }, 1000)
          }
        },
        _callback () {
          if (this.callback && this.callback instanceof Function) {
            this.callback(...this)
          }
        }
      }
    }
</script>

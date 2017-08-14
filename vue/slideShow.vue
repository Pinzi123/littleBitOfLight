<template>
  <div class="slide-show" id='slide' @touchstart="clearInv" @touchend='runInv' @slid='slide'>
    <div class="slide-img">
      <a @click="jump(slides[nowIndex].redirectType,slides[nowIndex].url,slides[nowIndex].extra)">
        <transition   v-on:before-enter="beforeEnter"
                      v-on:enter="enter"
                      v-on:leave="leave">
          <img :key='nowIndex' :src="slides[nowIndex].poster||slides[nowIndex].image||slides[nowIndex]">
        </transition>
      </a>
    </div>
    <ul class="slide-pages" id="pages" v-if='slides.length>1'>
      <li v-for="(item, index) in slides"
          @click="goto(index)" :class="{on: index === nowIndex}"
      >
      </li>
    </ul>
  </div>
</template>

<script>
  import tap from '@/assets/js/common/tap'
  export default {
    props: {
      slides: {
        type: Array,
        default: function () {
          return [require('../../assets/img/btn.ticket.screen.default@2x.c79736d.png')]
        }
      },
      inv: {
        type: Number,
        default: 5000
      },
      type: Object
    },
    data () {
      return {
        nowIndex: 0,
        isShow: true,
        isRight: true,
        durationSpeed: 1000
      }
    },
    mounted () {
      tap.bindTap()
      this.runInv()
    },
    computed: {
      prevIndex () {
        if (this.nowIndex === 0) {
          return this.slides.length - 1
        } else {
          return this.nowIndex - 1
        }
      },
      nextIndex () {
        if (this.nowIndex === this.slides.length - 1) {
          return 0
        } else {
          return this.nowIndex + 1
        }
      },
      enterArg () {
        if (this.isRight) {
          return '100%'
        } else {
          return '-100%'
        }
      },
      leaveArg () {
        if (this.isRight) {
          return '-100%'
        } else {
          return '100%'
        }
      }
    },
    methods: {
      // --------
      // 进入中
      // --------
      beforeEnter: function (el) {
        this.$(el)
       .css('left', this.enterArg)
      },
      enter: function (el, done) {
        this.$(el).animate({
          'left': 0
        }, {
          duration: this.durationSpeed,
          complete: this.done
        })
      },
      leave: function (el, done) {
        this.$(el).animate({
          'left': this.leaveArg
        }, {
          duration: this.durationSpeed,
          complete: this.done
        })
      },
      done () {
      },
      goto (index, notDur) {
        this.isShow = false
        if (notDur) {
          setTimeout(() => {
            this.isShow = true
            this.nowIndex = index
          }, 200)
        } else {
          this.isRight = true
          this.durationSpeed = 1000
          setTimeout(() => {
            this.isShow = true
            this.nowIndex = index
          }, 1000)
        }
      },
      // 左右滑动
      slide (e) {
        this.durationSpeed = 600
        if (e.detail.disX < 0) {
          this.isRight = true
          this.goto(this.nextIndex, true)
        } else {
          this.isRight = false
          this.goto(this.prevIndex, true)
        }
      },
      runInv () {
        this.invId = setInterval(() => {
          // 函数挂载有问题
          const pages = document.getElementById('pages')
          if (!pages) {
            clearInterval(this.invId)
          }
          this.goto(this.nextIndex)
        }, this.inv)
      },
      clearInv () {
        clearInterval(this.invId)
      },
      jump (type, url, extra) {
        if (type === 0) {
          // 跳转到网页
          url = url.substr(0, 7).toLowerCase() === 'http://' ? url : 'http://' + url
          window.location.href = url
        } else if (type === 1) {
          // 跳转到机构
          this.$router.push({path: 'organization', query: {orgId: extra}})
        } else if (type === 2) {
          this.toast('暂无赛事')
        }
      }
    }
  }
</script>

<style scoped>
  .slide-trans-enter-active .slide-trans-leave-active{
    transition: all 1s ease;
  }

  .slide-trans-enter {
    transform: translateX(-100%);
  }

  .slide-trans-leave-active {
    transform: translateX(100%);
  }

  .slide-show {
    position: relative;
    height: 147px;
    overflow: hidden;
    text-align: center;
  }

  .slide-img img{
    position: absolute;
    left: 0;
    right: 0;
    width:100%;
    height: 147px;
  }

  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 0px;
    margin: 0 auto;
    width: 100%;
  }

  .slide-pages li {
    display: inline-block;
    cursor: pointer;
    color: #fff;
    width: 10px;
    height: 10px;
    background: grey;
    border-radius: 50%;
    border: grey solid 1px;
    margin: 0 5px;
  }

  .slide-pages .on {
    background: #fff;
  }
</style>

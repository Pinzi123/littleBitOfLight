<template>
  <transition name="modal">
    <div class="modal-mask" v-show='modalShow'>
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              提示消息
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer" v-if='button === 1'>
              <button class="modal-default-button buttton" @click="$emit('close')">
                确认
              </button>
          </div>

          <div class="modal-footer" v-if='button === 2'>
              <button class="modal-default-button left buttton-left" @click="close(false)">
                取消
              </button>
              <button class="modal-default-button right buttton-right" @click="close(true)">
                <slot name="button">
                  确认
                </slot>
              </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'modal',
  props: {
    'modalShow': Boolean,
    'button': {
      type: Number,
      default: 1
    }
  },
  methods: {
    close (flag) {
      this.modalShow = false
      this.$emit('close', flag)
    }
  }
}
</script>
<style scope>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 70vw;
  height: 150px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h2{
  font-size: 1.6rem;
  padding: 10px;
  text-align: center;
}

.modal-body {
  margin: 20px 10px;
  text-align: center;
  font-size: 1.3rem;
  color: #030303;
}
.modal-body div {
  height: auto;
  overflow: hidden;
}

.modal-footer {
  margin-top: 35px;
}

.modal-default-button {
  background-color: #fff;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 12px;
  height: 42px;
  line-height: 42px;
  color: #0076FF;
  font-size: 1.6rem;
}

.buttton{
  width: 100%;
}

.buttton-left{
  border-radius: 0 0 0 12px;
  width: 50%;
}

.buttton-right{
  border-radius: 0 0 12px 0;
  width: 50%;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


</style>

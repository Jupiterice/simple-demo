<template>
  <div
    class="fallback"
    @click="bind(callback)">
    
    <img :src="backImg" class="back-btn"/>
  </div>
</template>

<script type="es6">
  import backImg from '../assets/back.png';

  export default {
    name: 'fallback',
    props: ['callback'],
    data() {
      return {
        backImg,
      }
    },
    methods: {
      bind(callback) {
        const go = this.fallback;
        // If Exists Callback Abort The Router Action And Excute The Callback
        if (typeof callback === 'function') {
          this.callback(go);
        } else {
          go();
        }
      },
      fallback() {
        const $router = this.$router;
        if (!$router.home && $router.home.path === $router.currentRoute.path) {
        //  window.JSBridge.closeWindow();
        } else {
         $router.go(-1);
        }
      },
    },
  };
</script>

<style lang="less">
  .fallback {
    position: absolute;
    min-width: 2.2rem;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 20px;

    .back-btn {
      height: 20px;
      width: 20px;
    }

    .van-icon {
      &:before{
        font-size: 20px;
        color: #333;
      }
    }
  }
</style>

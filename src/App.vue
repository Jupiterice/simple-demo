<template>
  <div id="app">
    <transition
      :name="transitionName"
      @after-leave="afterLeave">
      <keep-alive :include="keepAlivePages">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        prevRoutes: [],
        transitionName: '',
        keepAlivePagesConfig: {
        },
      };
    },
    computed: {
      keepAlivePages() {
        const keepAlivePages = [];
        Object.keys(this.keepAlivePagesConfig).forEach(key => {
          if (this.keepAlivePagesConfig[key]) {
            keepAlivePages.push(key);
          }
        });
        return keepAlivePages;
      },
    },
    watch: {
      $route(to, from) {
        const me = this;
        // 同一个页面，不做记录
        if (to.name === from.name) return;

        if (!me.prevRoutes.length) me.$router.home = from;

        if (to.name === me.prevRoutes[me.prevRoutes.length - 1]) {
          console.log('off');
          from.meta.y = 0;
          this.transitionName = 'slide-right';
          me.prevRoutes.pop();
          this.$set(this.keepAlivePagesConfig, from.meta.keepAlive, false);
        } else if (from.name != null) {
          console.log('on');
          this.transitionName = 'slide-left';
          me.prevRoutes.push(from.name);
          this.$set(this.keepAlivePagesConfig, from.meta.keepAlive, true);
        }
      },
    },
    methods: {
      pageCreated() {
      },
      clearTransition() {
        this.transitionName = '';
      },
      afterLeave() {
        this.$root.$emit('triggerScroll');
      },
    },
  };
</script>

<style>
  #app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    overflow-scrolling: touch;
  }

  .turn-on-enter {
    transform: translate3d(100%, 0, 0);
  }
  .turn-on-enter-active {
    /* z-index: 2; */
  }
  .turn-on-enter-active, .turn-on-leave-active  {
    transition: transform .4s ease;
  }
  .turn-on-leave-active  {
    transform: translate3d(-100%, 0, 0);
  }

  .turn-off-leave-enter {
    transform: translate3d(-100%, 0, 0);
  }
  .turn-off-leave-active {
    transform: translate3d(100%, 0, 0);
    /* z-index: 2; */
  }
  .turn-off-enter-active, .turn-off-leave-active  {
    transition: transform .4s ease;
  }

.slide-right-enter-active,
.slide-left-enter-active{
  will-change: transform;
  transition: all 500ms;
}
.slide-left-leave-active,
.slide-right-leave-active{
    will-change: transform;
    transition: all 1ms;
}

.slide-left-enter,
 .slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     /* opacity: 0; */
    transform: translate3d(-100%, 0, 0);
}
</style>

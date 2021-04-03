<template>
  <div class="age-picker">
    <div class="picked-age">
      {{pickedAge}}
    </div>
    <div
      class="wrap"
      ref="wrapEl"
      @scroll="onScroll">
      <!-- padding blocks of left side-->
      <div
        class="padding-block"
        :style="{
          width: `${paddingBlockWidth}px`,
        }"/>
      
      <!-- scale marks -->
      <div
        class="scale-mark"
        v-for="(n, index) in age+1"
        :key="index"
        >
        <template v-if="(index%10)==8">
          <span
            class="scale-num">
            {{ index }}
          </span>
          <div
            class="scale-mark-line key-mark"
            ></div>
        </template>
        <div
          v-else
          class="scale-mark-line"
          ></div>
      </div>
      <!-- end of scale marks -->
      <!-- right-padding-blocks-->
      <div
        class="padding-block"
        :style="{
          width: `${paddingBlockWidth}px`,
        }"/>
      <!-- end of right-padding-blocks-->
    </div>
  </div>
</template>

<script type="es6">
  export default {
    name: 'fallback',
    props: ['callback'],
    data() {
      return {
        age: 120,
        pickedAge: 0,
        littleMark: 5,
        paddingBlockWidth: 0,
        ticking: null,
      }
    },
    mounted() {
      const outerBox = this.$refs.wrapEl;
      const w = outerBox.offsetWidth;
      const boxWidth = 12 * window.scalingSize;
      this.paddingBlockWidth = (w + boxWidth) / 2;
      // console.log(w);
    },
    methods: {
      getAge() {
        // console.log(123123)
        const outerBox = this.$refs.wrapEl;
        const w = outerBox.offsetWidth;
        const boxWidth = 12 * window.scalingSize;
        let age = Math.ceil((outerBox.scrollLeft + w/2 - this.paddingBlockWidth) / boxWidth) - 1;
        if (age < 0) {
          age = 0;
        }
        if (age > this.age) {
          age = this.age;
        }
        // if (this.pickedAge === 0) {
          this.pickedAge = age;
        // }
        // setTimeout(()=>{
        //   this.pickedAge = age;
        // }, 100);
        // console.log(age);
      },
      onScroll() {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.getAge();
            this.ticking = false;
          });
          this.ticking = true;
        }
      },
    },
  };
</script>

<style lang="less">
.age-picker {
  position: relative;
  top: 40%;
  width: 100%;
  color: #d2d9df;
  &:before,&:after {
    content: '';
    height: 100%;
    width: 50px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, white, #ffffff00);
    z-index: 10;
  }
  &:after {
    left: calc(100vw - 50px);
    background: linear-gradient(270deg, white, #ffffff00);
  }
}

.picked-age {
  @boxSize: 100px;
  position: absolute;
  top: 20-@boxSize;
  left: calc(50% - @boxSize/2);
  width: @boxSize;
  height: @boxSize;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: @boxSize/2;
  background: #ecf4fb;
  color: #535a60;
  font-size: 40px;
  font-weight: 700;
  &:after {
    content: '';
    border: 10px solid #ecf4fb;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom: transparent;
    position: absolute;
    bottom: -8px;
  }
}
.wrap {
  height: 100px;
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  /* 指定捕捉视口应有 100px 的上内边距 */
  scroll-padding: 100px 0 0;
  /* 使用非精确捕捉，能允许滚动最终停止在捕捉点的附近而不需要进一步的调整 */
  // scroll-snap-type: x proximity;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  &:before {
    content: '';
    height: 40px;
    width: 4px;
    background: #7bccd6;
    border-radius: 4px;
    position: absolute;
    left: calc(50% - 2px);
    top: calc(50% - 20px);
    z-index: 10;
  }
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    z-index: 1;
    background: #d2d9df;
  }
  .padding-block {
    display: inline-block;
    // height: 100px;
  }
  .scale-mark {
    position: relative;
    /* 指定每一页文档的顶部为捕捉的位置 */
    scroll-snap-align: none center;
    width: 12px;
    display: inline-block;
    height: 100px;
    line-height: 100px;
    text-align: center;
    // border: 1px solid #ddd;

    .scale-num {
      position: absolute;
      left: calc(50% - 10px);
      width: 20px;
      top: 15px;
      color: #5d646a;
      z-index: 10;
      font-weight: 600;
    }
    .scale-mark-line {
      display: inline-block;
      width: 20%;
      height: 5px;
      border-right: 2px solid #d2d9df;/*px*/
      border-radius: 1px;
      position: relative;
      left: -10%;
      top: -6px;/*px*/
      &.key-mark {
        height: 10px;/*px*/
        top: -4px;/*px*/
      }
    }
  }
}
</style>

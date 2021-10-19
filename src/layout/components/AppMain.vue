<template>
<!-- 主体部分 -->
  <div class="index-container" :style="{ height: windowHeight }">
<!--===============具体子页面-有滚动条时，'页面内容高度' 减少 '滚动条的高度'===============-->
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
 <div class="footer-item flex-center-center">
        <p>天津天任大数据科技有限公司版权所有</p>
        <img src="../../assets/img/copyright.png" />
        <p>津公安备案</p>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { debounce } from '@/utils/util'
export default {
  data() {
    return {
      // 浏览器高度
      windowHeight: ''
    }
  },
  created() {
    this.getHeight()
    window.onresize = debounce(this.getHeight, 300)
  },
  methods: {
    // 浏览器适配 浏览器高度 '-1px'
    getHeight() {
      this.windowHeight = document.documentElement.clientHeight - 1 + 'px'
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  components: {

  }
}
</script>

<style scoped lang='scss'>
/* index内部 */
.index-container {
  width: 100%;
  padding: $index-head-height 0 0 $index-side-width;
  background: $index-background;
  box-sizing: border-box;
  overflow: auto;
}
.footer-item {
  height: 70px;
  // position: relative;
  // top: 25px;
}
.footer-item img {
  width: 20px;
  margin: 0 5px;
}
</style>

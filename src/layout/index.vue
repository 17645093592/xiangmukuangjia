<template>
  <div  :style="{ minWidth: global.BROWSER_MIN_WIDTH + `px`, height: windowHeight }">
      <navbar></navbar>
      <sidebar></sidebar>
      <!-- <Header></Header> -->
      <app-main></app-main>

  </div>
</template>

<script type="text/ecmascript-6">
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Header from '@/components/bread-tag'
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
  components: {
    AppMain,
    Sidebar,
    Navbar,
    Header

  }
}
</script>

<style scoped lang='scss'>

</style>

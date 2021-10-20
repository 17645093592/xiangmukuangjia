<template>
  <div class="mbx">
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{name:'index'}">首页</el-breadcrumb-item>
  <el-breadcrumb-item v-for="(item,index) in list" :key="index">{{item}}</el-breadcrumb-item>
</el-breadcrumb>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'breadCrumb',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getMbx()
  },
  methods: {
    // 获取路由的matched 通过循环遍历到数组中
    getMbx() {
      const matched = this.$route.matched
      matched.forEach(item => {
        if (item.meta.first === true) {
          this.list.push(item.meta.title)
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.mbx{
    padding: 30px 17px;
}
</style>

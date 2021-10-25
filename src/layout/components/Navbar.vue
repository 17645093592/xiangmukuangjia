<template>
  <div>
      <!--========================顶部信息========================-->
    <div class="main-head flex-center-between">
      <p class="version primary-font">{{ global.VERSION }}</p>
      <div class="flex-center banner-right">
        <span class="admin-name">你好，{{ loginData.username }}</span>
        <img
          src="../../assets/img/index-setting.png"
          class="icon-setting pointer"
          title="修改密码"
          @click="updatePassword"
        />
        <img
          src="../../assets/img/index-logout.png"
          class="icon-setting pointer"
          title="退出登录"
          @click="quit"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            loginData:localStorage.getItem('userList')?JSON.parse(localStorage.getItem('userList')) : null
        }
    },
    methods: {
        updatePassword(){

        },
        quit(){
           this.$confirm('退出, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('userList')
          localStorage.removeItem('treeList')
          sessionStorage.removeItem('tag')
          this.$router.push({name:'login'})
          // this.$message({
          //   type: 'success',
          //   message: '退出成功!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
        }
    },
}
</script>

<style lang="scss" scoped>
/* 顶部--高度48px，固定定位在顶部 */
.main-head {
  width: 100%;
  height: $index-head-height;
  background: #fff;
  position: fixed;
  z-index: 100;
  box-shadow: $index-head-shadow;
  box-sizing: border-box;
  padding: 0 24px;
}
.version {
  padding: 2px 8px;
  margin-left: $index-side-width;
  border: 1px solid $primary-color;
  border-radius: $common-border-radius;
}
.icon-setting {
  width: 32px;
  margin-left: 24px;
}
</style>
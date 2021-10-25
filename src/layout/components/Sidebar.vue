<template>
  <div class="main-side">
    <div class="side-title">
      <img src="../../assets/img/index-logo.png" class="index-logo" />
    </div>
    <el-menu
      class="side-list"
      router
      unique-opened
      :default-active="active"
      text-color="#8598B9"
      active-text-color="#fff"
      @select="goRouter"
    >
      <div
        v-for="(item, index) in sideList"
        :key="index"
        @mouseenter="hoverSide(index)"
        @mouseleave="hoverSide(false)"
      >
        <!-- 带二级菜单的一级导航 -->
        <el-submenu v-if="item.children.length" :index="item.path">
          <!-- 悬停/选中状态 -->
          <div
            slot="title"
            class="hover flex-center-between"
            v-if="isHover(index) || isAct(item)"
          >
            <!-- || isAct(item) -->
            <div class="flex-center side-title-act">
              <i :class="item.icon"></i>
              <span>{{ item.authName }}</span>
            </div>
            <img
              src="../../assets/img/index-arrow-act.png"
              class="icon arrow-icon"
            />
          </div>
          <!-- 默认状态 -->
          <div slot="title" class="flex-center-between" v-else>
            <div class="flex-center">
              <i :class="item.icon"></i>
              <span>{{ item.authName }}</span>
            </div>
            <img
              src="../../assets/img/index-arrow.png"
              class="icon arrow-icon"
            />
          </div>
          <!-- 二级导航 -->
          <el-menu-item-group popper-class="sub-list">
            <el-menu-item
              v-for="(subItem, subIndex) in item.children"
              :key="subIndex"
              :index="subItem.path"
              >{{ subItem.authName }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <!-- 一级导航 -->
        <el-menu-item v-else :index="item.path">
          <div class="flex-center" :class="{ hover: hoverIndex == index }">
            <i :class="item.icon"></i>
            <span>{{ item.authName }}</span>
          </div>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { getmenus } from '@/api'
export default {
  data() {
    return {
      sideList: [],
      hoverIndex: -1,
       iconList:[
         'el-icon-user-solid','el-icon-star-on','el-icon-s-goods','el-icon-warning','el-icon-info'
       ] ,
        
      active: '',
    }
  },
  computed: {
    // 当前选中的路由item
    getRouteItem() {
      return (
        this.treeList.find(
          (item) =>
            item.path == this.active &&
            item.children.length == 0 &&
            item.resourceType == 1
        ) || {}
      )
    },
    // 选中一级菜单
    isAct() {
      // 当前选中的item可能是二级目录，二级目录比对 Pid
      return (routeItem) =>
        routeItem.id == this.getRouteItem.id ||
        routeItem.id == this.getRouteItem.pid
    },
    // 悬停一级菜单
    isHover() {
      return (index) => this.hoverIndex == index
    },
  },
  mounted() {
    this.getmenus()
    this.active = this.$route.name
  },
  methods: {
    async getmenus() {
      let res = await getmenus()
      // console.log(res, '')
      res.data.map((item,index)=>{
          this.iconList.forEach((items,idx)=>{
            if(index == idx){
              item.icon = items
            }
          })
      })
      this.sideList = res.data

      this.treeList = this.treeConvertList(res.data)
      localStorage.setItem('treeList',JSON.stringify(res.data))

       this.changeRouter()

    },
    // 树型转换线型
    treeConvertList(root) {
      const Root = JSON.parse(JSON.stringify(root))
      const queue = []
      queue.push(Root)
      const node = queue.shift()
      node.forEach((item) => {
        queue.push(...item.children)
      })
      delete node.children
      const list = [...node, ...queue]
      return list
    },
    // 菜单悬停
    hoverSide(index) {
      this.hoverIndex = this.utils.checkEmpty(index) ? -1 : index
    },
    // 路由切换时，修改参数
    changeRouter() {
      // console.log('是我')
      // 当前路由如果是'index'，跳转到侧栏首个权限
      if (this.$route.name == this.global.INDEX_PAGE) {
        // 首页权限有2级权限，跳转2级权限第一个资源
        this.active = this.utils.checkEmpty(this.sideList[0].children)
          ? this.sideList[0].path
          : this.sideList[0].children[0].path
        this.$router.push(this.active)
      }
    },
    // 跳转页面
    goRouter(router) {
      // console.log(router, '')
      this.$router.push(router)
      this.active = router
    },
  },
  watch: {
    // 监听路由--退到'index页'，跳到当前权限第一页
    $route(to, from) {
      // console.log('当前路由-----', this.$route.path)
      this.changeRouter()
      this.goRouter(this.$route.name)
    },
  },
}
</script>

<style lang="scss" scoped>
// 侧栏
.main-side {
  width: $index-side-width;
  height: 100vh;
  position: fixed;
  z-index: 1000;
  background: $index-side-background;
  overflow: auto;
}
// 隐藏侧栏滚动条
.main-side::-webkit-scrollbar {
  width: 0;
}
// 侧栏顶部标题
.side-title {
  height: $index-head-height;
}
.side-title .index-logo {
  width: 100%;
  height: 100%;
}
// 侧栏list
.side-list {
  padding-bottom: 20px;
  border-right: none;
  background: transparent;
}
.side-title-act {
  color: #fff;
}
// 侧栏图标
.side-icon {
  margin-right: 8px;
}
// 箭头
.arrow-icon {
  transition: transform 0.5s;
}
.hover .icon {
  color: #fff;
}
// 悬停/二级被选中 箭头icon翻转180deg
.hover .arrow-icon {
  transform: rotate(180deg);
}
</style>
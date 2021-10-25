<template>
  <div class="box">
    <el-tag
      :key="tag.title"
      v-for="tag in utils.removeObj(dynamicTags)"
      closable
      :type="isActive(tag)"
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
    <router-link tag="li" :to='tag.path' class="tag-title ">{{tag.title}}</router-link>
    </el-tag>
   
  </div>
</template>

<script>
export default {
  name:'breadTag',
  data() {
    return {
      
      dynamicTags:sessionStorage.getItem('tag')?JSON.parse(sessionStorage.getItem('tag')):[],
      numArr:[],
   
    }
  },
  mounted() {
    this.setTags(this.$route)
    this.utils.removeObj(this.dynamicTags)

  },
  methods: {
    // 点击添加
   setTags(route){
    var num = route.meta.title
    var flag = this.numArr.every(function(val,index){
      return val != num
    })

    if(flag){

      if(route.meta.first == true){
        
         this.dynamicTags.push({
              title:route.meta.title,
              name:route.name,
              path:route.fullPath,
              //  hidecloes
            })
          this.numArr.push(route.meta.title)
      }
    }
    sessionStorage.setItem('tag',JSON.stringify( this.utils.removeObj(this.dynamicTags)))
   },
  
  //  关闭标签
   handleClose(tag){
     this.dynamicTags.splice(this.dynamicTags.indexOf(tag),1);
     this.numArr.splice(this.numArr.indexOf(tag.title),1)
     if( this.dynamicTags.length > 0){
       this.$router.push(this.dynamicTags[this.dynamicTags.length -1].path)
      sessionStorage.setItem('tag',JSON.stringify( this.utils.removeObj(this.dynamicTags)))

     }else{
       this.$router.push({name:'index'})
     }
   },
   isActive(tag){
     if(tag.path == this.$route.fullPath){
       return ''
     }else{
       return 'info'
     }
   }
  },
  watch: {
    // 监听路由--退到'index页'，跳到当前权限第一页
    $route(newVal , old) {
      // console.log('当前路由-----', this.$route.name)
      
      this.setTags(newVal)

      // this.goRouter(this.$route.name)
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  // 68 234
  padding: 25px 0 15px 17px;;
  background: $index-background;
  box-sizing: border-box;
  overflow: auto;
}
.box span{
  padding: 5px;
  width: 100px;
  margin-right: 10px;
  cursor:pointer;
  .el-tag.el-tag--info .el-tag__close{
    margin-left: 10px;
  }
}
.el-tag{
  height: 40px;
}
.activeCol{
  background: red;
}
.tag-title{
 display: inline-block;
 margin-left: 10px;
}
.box /deep/.el-tag.el-tag--info{
  background-color: #fff;
    border-color: #e9e9eb;
    // color: #909399;
    color: #000;

}

</style>
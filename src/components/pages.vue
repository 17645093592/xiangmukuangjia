<template>
    <div class='page-item flex-center-between'>
        <slot name='page-left'>
            <div v-if='!isLeft'></div>
        </slot>
        <el-pagination :layout='layout' :page-sizes='sizeList' :pager-count='5' :total='pageItem.total' :current-page='pageItem.pageNum' :page-size='pageItem.pageSize' @current-change='setPageNum' @size-change='setPageSize'>
        </el-pagination>
        <slot name='page-right'>
            <div v-if='isLeft'></div>
        </slot>
    </div>
</template>
<script>
/**
 * 分页 <pages></pages>
 * @param {Object} *pageItem 分页Item，包含total，pageNum，pageSize
 * @param {String} layout 组件布局 默认"上一页 页码 下一页 总页数 每页条数 跳转"
 * @param {Boolean} isLeft 分页左对齐还是右对齐 默认false，右对齐
 *
 */
export default {
  name: 'pages',
  data() {
    return {
      sizeList: this.global.SIZE_LIST
    }
  },
  props: {
    pageItem: {
      type: Object,
      required: true
    },
    layout: {
      type: String,
      default: 'prev,pager,next,total,sizes,jumper'
    },
    isLeft: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 设置页码
    setPageNum(pageNum) {
      this.pageItem.pagenum = pageNum
      this.pageHandler()
    },
    // 设置每页条数
    setPageSize(pageSize) {
      this.pageItem.pagesize = pageSize
      this.pageHandler()
    },
    // 更新pageItem，返回change方法
    pageHandler() {
      this.$emit('update:pageItem', this.pageItem)
      this.$emit('pageChange', this.pageItem.pagenum)
    }
  }
}
</script>
<style lang='scss' scoped></style>

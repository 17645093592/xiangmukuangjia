<template>
  <el-dialog class="default-dialog" width="600px" top="10vh" :title="title" :visible.sync="value" :before-close="close" :close-on-click-modal="false">
      <slot name="dialog-info"></slot>
      <span slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type='primary' @click='sure'>确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
    name: 'defaultDialog',
  data() {
    return {}
  },
  props:{
      title:{
          type:String,
          default:''
      },
      value:{
          type:Boolean,
          default:false
      }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    sure() {
      this.$emit('sure')
    }
  }
}
</script>

<style>

</style>
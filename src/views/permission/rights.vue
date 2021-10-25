<template>
  <div>
      <breadTag></breadTag>
    <div class="container">
      <breadCrumb></breadCrumb>
      <el-table height="470" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#" width="80">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="280">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="280">
        </el-table-column>
        <el-table-column prop="" label="层级">
            <template v-slot="{ row }">
              <span v-if="row.level === '0'">一级</span>
              <span v-if="row.level === '1'">二级</span>
              <span v-if="row.level === '2'">三级</span>
            </template>  
         </el-table-column>
      </el-table>

       <!-- <pages :pageItem.sync="pageItem" @pageChange="init"></pages> -->
    </div>
  </div>
</template>

<script>
import {getRightsList} from '@/api/rights'
import pages from '../../components/pages.vue'
export default {
  components: { pages },
  data() {
    return {
      tableData:[],
      pageItem: this.global.PAGE_ITEM(),

    }
  },
  mounted() {
      this.init()
  },
  methods: {
      async init(){
        const res = await getRightsList()
        this.tableData = res.data
      }
  },
}
</script>

<style>
</style>


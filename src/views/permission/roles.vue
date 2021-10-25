<template>
  <div>
    <breadTag></breadTag>
    <div class="container">
      <breadCrumb></breadCrumb>
      <el-button type="primary" class="btn" @click="addRoles()">添加角色</el-button>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="expand" width="">
          <template v-slot="{ row }">
            <div class="zanwushuju" v-if="row.children.length == 0">
              暂无数据
            </div>
            <el-row class="elrow" v-for="(item1, i1) in row.children" :key="i1">
              <el-col :span="4">
                <el-tag @close="deleRight(row, item1.id)" closable type="">{{
                  item1.authName
                }}</el-tag>
                <i style="color: #8598b9" class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row
                  class="elrow"
                  v-for="(item2, i2) in item1.children"
                  :key="i2"
                >
                  <el-col :span="4">
                    <el-tag
                      @close="deleRight(row, item2.id)"
                      closable
                      type="success"
                      >{{ item2.authName }}</el-tag
                    >
                    <i style="color: #8598b9" class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <el-tag
                      @close="deleRight(row, item3.id)"
                      class="elrow elrow-tag"
                      closable
                      type="warning"
                      v-for="(item3, i3) in item2.children"
                      :key="i3"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="150"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="">
        </el-table-column
        ><el-table-column prop="roleDesc" label="角色描述" width="">
        </el-table-column>
        <el-table-column prop="address" label="操作" width="280">
          <template v-slot="{ row }">
            <el-button type="primary" plain size="mini" @click="saveRoles(row)"
              >分配权限</el-button
            >
            <el-button type="primary" plain size="mini" @click="editRoles(row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              plain
              size="mini"
              @click="deleteRoles(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 修改权限弹出框 -->
      <defaultDialog
        v-model="isAccountDialog"
        :title="accountDialogTitle"
        @sure="sureAccountDialog"
      >
        <el-tree
          v-if="accountDialogTitle == '分配权限'"
          :data="treeList"
          slot="dialog-info"
          ref="tree"
          show-checkbox
          node-key="id"
          :default-expanded-keys="arrexpand"
          :default-checked-keys="arrcheckedList"
          :props="defaultProps"
        >
        </el-tree>
        <el-form v-else slot="dialog-info" :model="formData" label-width="100px">
          <el-form-item label="角色名称" :required="!formData.userId">
            <el-input
              v-model="formData.roleName"
              placeholder="请输入角色名称"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="角色描述"
            :required="!formData.userId"
          >
            <el-input
              v-model="formData.roleDesc"
              placeholder="请输入角色描述"
              :maxlength="20"
            ></el-input>
          </el-form-item>
        </el-form>
      </defaultDialog>
    </div>
  </div>
</template>

<script>
import { getRoles, deleOneRoles, getRightsList,saveRightsList ,deleRoles,addRoles,updataRoles} from '@/api/roles'
export default {
  data() {
    return {
      tableData: [],
      isAccountDialog: false,
      accountDialogTitle: '',
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'authName',
      },
      formData:{},
      //里面有id则展开节点 是否展开节点
      arrexpand: [],
      // 该角色有的权限
      arrcheckedList: [],
      currRolesID:-1
    }
  },
  mounted() {
    this.init()

  },
  methods: {
    async init() {
      const res = await getRoles()
      this.tableData = res.data

    },
    // 添加角色
    async addRoles(){
      this.formData = {}
      this.accountDialogTitle = '添加角色'
      this.isAccountDialog = true
    },
    // 取消部分权限
    async deleRight(row, rightId) {
      const obj = {
        roleId: row.id,
        rightId,
      }
      const res = await deleOneRoles(obj)
      row.children = res.data
    },
    // 分配权限
    async saveRoles(row) {
      this.arrcheckedList = []
      this.accountDialogTitle = '分配权限'
      this.currRolesID = row.id
      const res = await getRightsList()
      this.treeList = res.data
      // 展开所有tree
      this.arrexpand = this.getAllNodeId(this.arrexpand, res.data)
      // 选中的权限
      this.arrcheckedList = this.formatTree(this.arrcheckedList, row.children)
      this.isAccountDialog = true
    },
    // 递归获取所有tree的id
    getAllNodeId(arr, moduleList) {
      for (let i = 0; i < moduleList.length; i++) {
        // console.log('moduleDataList[i].id  in getAllNodeId: ', moduleList[i].id)
        arr.push(moduleList[i].id)
        if (moduleList[i].children) {
          arr = this.getAllNodeId(arr, moduleList[i].children)
        }
      }
      return arr
    },
    // 递归获取tree最后一层的id
    formatTree(arr, data) {
      for (let i in data) {
        if (data[i].children === null) continue
        if (data[i].children) {
          // 证明不是最后一级，继续找
          this.formatTree(arr,data[i].children)
        } else {
          // 证明是最后一级，取值
          arr.push(data[i].id)
        }
      }
      return arr
    },

    // 编辑
    editRoles(row) {
      console.log(row, '')
      this.isAccountDialog = true
      this.formData = row
      this.accountDialogTitle = '编辑角色'
    },
    // 删除
    async deleteRoles(row) {
         this.$confirm('删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          const res = await deleRoles(row.id)
          this.init()

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    // 点击确定的对话框
    async sureAccountDialog() {
      if(this.accountDialogTitle == '分配权限'){
        let arr1 =  this.$refs.tree.getCheckedKeys()
        let arr2 =  this.$refs.tree.getHalfCheckedKeys()
        let all = [...arr1,...arr2]
        let obj = {
          roleId:this.currRolesID,
          rids:all.join(',')
        }
        const res = await saveRightsList(obj)
        //  location.reload() 
         this.init()
      }else if(this.accountDialogTitle == '添加角色'){
         const res = await addRoles(this.formData)
         console.log(res, '')
         this.$message.success('创建成功')
         this.init()
      }else if(this.accountDialogTitle == '编辑角色'){
        const res = await updataRoles(this.formData)
        this.$message.success('修改成功')
         this.init()
      }

      // this.init()
      this.isAccountDialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
.btn {
  margin-bottom: 20px;
}
.elrow {
  margin-bottom: 10px;
}
.elrow-tag {
  margin-right: 10px;
}
.zanwushuju {
  text-align: center;
  padding: 20px;
}
</style>


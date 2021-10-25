<template>
  <div>
    <breadTag></breadTag>
    <div class="container">
      <breadCrumb></breadCrumb>
      <!-- 搜索内容 -->
      <div class="flex">
        <div class="input-box">
          <el-input
            placeholder="请输入内容"
            v-model="searchData.query"
            class="input-with-select"
            @change="getTableDate"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-button type="primary" class="btn" @click="addUser"
          >添加用户</el-button
        >
      </div>

      <!-- 表格 -->
      <!-- "username": "tige117",
                "mobile": "18616358651",
                "type": 1,
                "email": "tige112@163.com",
                "create_time": "2017-11-09T20:36:26.000Z",
                "mg_state": true, // 当前用户的状态
                "role_name": "炒鸡管理员" -->
      <div class="table">
        <el-table border :data="tableData" style="width: 100%">
          <!-- <el-table-column type="index" label="#" width="60"> </el-table-column> -->
          <el-table-column prop="username" label="姓名" width="">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width=""> </el-table-column
          ><el-table-column prop="mobile" label="电话" width="">
          </el-table-column
          ><el-table-column prop="create_time" label="创建时间" width="">
          </el-table-column
          ><el-table-column prop="mg_state" label="用户状态" width="">
            <template v-slot="{ row }">
              <el-switch
                v-model="row.mg_state"
                @change="switchHandler(row)"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="280">
            <template v-slot="{ row }">
              <el-button
                type="primary"
                plain
                size="mini"
                @click="editRoles(row)"
                >分配角色</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="editMembers(row)"
                >编辑</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="deleteMembers(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <pages :pageItem.sync="pageItem" @pageChange="getTableDate"></pages>
      <!-- 分配角色弹出框 -->
      <defaultDialog
        v-if="accountDialogTitle == '分配角色'"
        v-model="isAccountDialog"
        :title="accountDialogTitle"
        @sure="sureAccountDialog"
      >
        <el-form slot="dialog-info" :model="formData" label-width="100px">
          <el-form-item label="登录账号" :required="!formData.userId">
            <el-input
              v-model="formData.username"
              :disabled="accountDialogTitle == '分配角色'"
              placeholder="请输入账号"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="分配角色" required>
            <el-select v-model="formData.rid" placeholder="请选择项目名称">
              <el-option
                :value="item.id"
                :label="item.roleName"
                v-for="item in projectNameOptions"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </defaultDialog>
      <!-- 新增编辑弹出框 -->
      <defaultDialog
        v-model="isAccountDialog"
        :title="accountDialogTitle"
        @sure="sureAccountDialog"
         v-if="accountDialogTitle !== '分配角色'"
      >
        <el-form slot="dialog-info" :model="formData" label-width="100px">
          <el-form-item label="登录账号" :required="!formData.userId">
            <el-input
              v-model="formData.username"
              placeholder="请输入账号"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="登录密码"
            v-if="accountDialogTitle == '新增用户'"
            :required="!formData.userId"
          >
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" required>
            <el-input
              v-model="formData.email"
              placeholder="请输入邮箱"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式" required>
            <el-input
              v-model="formData.mobile"
              placeholder="请输入联系方式"
              :maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="分配角色"
            required
            v-if="accountDialogTitle == '分配角色'"
          >
            <el-select v-model="formData.rid" placeholder="请选择项目名称">
              <el-option
                :value="item.id"
                :label="item.roleName"
                v-for="item in projectNameOptions"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </defaultDialog>
    </div>
  </div>
</template>

<script>
import {
  getUsers,
  UpdateUsers,
  addUsers,
  DeleteUsers,
  getOneUsers,
  saveOneUsers,
  saveUsersRoles,
} from '@/api/users'
import { getRoles } from '@/api/roles'
export default {
  data() {
    return {
      // 搜索
      searchData: { query: '' },
      // 表格
      tableData: [],
      // 分页form
      pageItem: this.global.PAGE_ITEM(),
      // 弹框
      isAccountDialog: false,
      // 弹框标题
      accountDialogTitle: '',
      // 表单
      formData: {},
      // 角色下拉框
      projectNameOptions: [],
    }
  },
  created() {
    this.getTableDate()
  },
  methods: {
    async getTableDate(pageNum = 1) {
      const data = Object.assign(this.searchData, this.pageItem)
      const res = await getUsers(data)
      if(!res.data)return
      this.pageItem.total = res.data.total

      res.data.users.map((item) => {
        var d = new Date(item.create_time)
        item.create_time = this.formatDate(d)
      })
      this.tableData = res.data.users
      // console.log(this.tableData)
    },
    // 点击新增用户
    addUser() {
      this.accountDialogTitle = '新增用户'
      this.dialogForm = {}
      this.isAccountDialog = true
    },

    // 修改用户状态
    async switchHandler(row) {
      let obj = {
        uId: row.id,
        type: row.mg_state,
      }
      const res = await UpdateUsers(obj)
      this.getTableDate()
    },
    // 分配角色
    async editRoles(row) {
      this.accountDialogTitle = '分配角色'
      const res = await getOneUsers({ id: row.id })
      this.formData = res.data
      const roles = await getRoles()
      this.projectNameOptions = roles.data
      this.isAccountDialog = true
    },
    // 编辑
    async editMembers(row) {
      const res = await getOneUsers({ id: row.id })
      // console.log(roles, '')
      this.formData = res.data
      // console.log(res.data, 'res')

      this.accountDialogTitle = '编辑用户'

      this.isAccountDialog = true
    },
    // 删除
    deleteMembers(row) {
      this.$confirm('删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
             let res = await DeleteUsers({ id: row.id })
             this.getTableDate()
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
    // 弹框点击确定
    async sureAccountDialog() {
      if (this.utils.checkEmpty(this.formData.username)) {
        this.$message.error('登录账号不能为空')
        return
      }
      if (
        this.utils.checkEmpty(this.formData.password) &&
        this.accountDialogTitle == '新增用户'
      ) {
        this.$message.error('登录密码不能为空')
        return
      }
      if (this.utils.checkEmpty(this.formData.email)) {
        this.$message.error('邮箱不能为空')
        return
      }
      if (this.utils.checkEmpty(this.formData.mobile)) {
        this.$message.error('手机号不能为空')
        return
      }
      if (this.accountDialogTitle == '新增用户') {
        const res = await addUsers(this.formData)
        if (res.meta.status == 201) {
          this.$message(res.meta.msg)
        }
      } else if (this.accountDialogTitle == '编辑用户') {
        const res = await saveOneUsers(this.formData)
      }else if (this.accountDialogTitle == '分配角色') {
        const res = await saveUsersRoles(this.formData)
      }

      this.getTableDate()
      this.formData = {}
      this.isAccountDialog = false
    },
    // 时间戳转时间
    formatDate(now) {
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()
      var hour = now.getHours()
      var minute = now.getMinutes()
      var second = now.getSeconds()
      return (
        year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.input-box {
  width: 30%;
  margin-right: 20px;
  text-align: center;
}

.btn {
  width: 8%;
}
.table {
  margin-top: 20px;
}
</style>


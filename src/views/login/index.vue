<template>
  <div class="login">
            <el-form class="login-form" :label-position="labelPosition" label-width="80px" :model="formdata">
                <h2>用户登录</h2>
                <el-form-item label="用户名">
                    <el-input v-model="formdata.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formdata.password"></el-input>
                </el-form-item>
                <el-button @click="login" class="login-btn" type="primary" >登录</el-button>
            </el-form>
  </div>
</template>

<script>
import {Login} from '@/api'
export default {
    data() {
        return {
            labelPosition: 'top',
            formdata: {
                username: 'admin',
                password: '123456',
            }
        }
    },
    methods: {
        async login(){
            let res = await Login(this.formdata)
            console.log(res.data, 'res')
            if(res.data){
                    localStorage.setItem('token',res.data.token)
                    // 跳转登录页面
                    this.$router.push({name:'index'})

                }
        },
    },
}
</script>

<style lang="scss" scoped>
    .login{
        background: #324152;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-form{
            background: #fff;
            width: 25%;
            padding: 30px;
            border-radius: 10px;
        }

        .login-btn{
            width: 100%;
            height: 40px;
            margin-top: 20px;
        }
    }
</style>
<template>
  <div class="page">
		<transition name="fade-transform" mode="out-in">
    <el-row>
      <el-col style="text-align: center;margin-top: 100px;" :xs="{ span: 12, offset: 8 }" :lg="{ span: 8, offset: 8 }">
        <h1 class="logo-text" ></h1>
      </el-col>
      <el-col style="margin-top: 50px;"  :xs="{ span: 12, offset: 8 }" :lg="{ span: 6, offset: 9 }">
        <el-form ref="formValidate"   :model="formValidate" :rules="ruleValidate" >
          <el-form-item :label="$t('message.username')" prop="username">
            <el-input class="has-prefix"  :maxlength="50" v-model="formValidate.username" placeholder="请输入用户名">
              <i class="el-icon-user-solid" slot="prefix" />
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('message.password')" prop="password">
            <el-input class="has-prefix" style="padding-left: 0px!important;" :type="'password'" :minlength="6" :maxlength="20" v-model="formValidate.password" placeholder="请输入登录密码">
              <i class="el-icon-lock" slot="prefix" />
            </el-input>
          </el-form-item>
          <el-form-item >
            <el-button long type="success" @click="handleSubmit('formValidate')">{{$t('message.signIn')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
		</transition>
  </div>
</template>
<script>
  const md5 = require('js-md5');
  const LOGIN_URL = "/employee/login";
  import {post} from "@/framework/http/request"
  export default {
    name: "Login",
    data() {
      return {
        projectName: "lychee后台管理系统",
        formValidate: {
          username: "ccc",
          password: "123456"
        },
        ruleValidate: {
          username: [
            {
              required: true,
              message: "用户名不能为空",
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              message: "登录密码不能为空",
              trigger: "blur"
            }
          ]
        }
      };
    },
    methods: {
      handleSubmit(name) {
        let _t = this;
        this.$refs[name].validate(valid => {
          if (valid) {
            let param = {
              username: _t.formValidate.username,
              // password:  md5(_t.formValidate.password),
              password: _t.formValidate.password
            };
            post(LOGIN_URL, param ,(res) =>{
              console.log(res.employee)
              let user = res.employee;
              _t.$store.commit('SAVE_USER', {
                user: user,
              });
              _t.$store.dispatch("SAVE_USER_CACHE");
              _t.$router.push("/index");
            })
          }
        });
      },
      regainCaptcha() {
        var timestamp = (new Date()).valueOf();
        var url = this.$refs.captcha.src;
        if ((url.indexOf("?") >= 0)) {
          url = url.substring(0, url.length - 13) + timestamp;
        } else {
          url = url + "?timestamp=" + timestamp;
        }
        this.$refs.captcha.src = url;
      }
    }
  };
</script>
<style lang="less" scoped>
  .page {
    background-color: #ffffff;
    img.logo {
      width: 100px;height: 100px;
    }
    .logo-text {
      font-size: 30px;
      color: #333333;
    }
  }
  .el-input{
    width: 100%;
  }
  .el-button--success{
    width: 100%;
    background: #19be6b;
  }
</style>

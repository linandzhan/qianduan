<template>
  <el-header style="z-index:2;position:fixed;top: 0;width:100%;display: flex;padding: 0;height: 54px">
    <div class="sider-logo">{{$t('message.projectName')}}</div>
    <div class="head-setting">
      <div style="display: flex;align-items: center">
        <el-page-header @back="goBack" v-if="$route.meta.isShowBack">
        </el-page-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item,index) in breadcrumbList"
            :to="item.path ? { path: item.path } : {}"
          >
            {{$t(item.name)}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
<!--        选择国际化语言-->
        <el-select v-model="selectValue" @change="langChange" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-dropdown @command="handleClick" v-if="$route.path !== '/login'">
           <span class="el-dropdown-link" style="font-size: 12px">
             {{store.user.username || '管理员'}}
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit" command="editPsd">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dialog
          title="修改密码"
          :visible.sync="dialogVisible"
          :modal-append-to-body='false'
          :append-to-body="true"
          width="50%"
          :before-close="handleClose">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleConfirm('ruleForm')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "layout-header",
  data(){
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
   return{
     projectName: 'litchi后台管理系统',
     // breadcrumbList:[]
     selectValue:'',
     language:'中文',
     options:[
       {
         value: 'zh',
         label: '中文'
       }, {
         value: 'en',
         label: 'English'
       }
     ],
     dialogVisible:false,
     rules: {
       pass: [
         { validator: validatePass, trigger: 'blur' }
       ],
       checkPass: [
         { validator: validatePass2, trigger: 'blur' }
       ],
     },
     ruleForm: {
       pass: '',
       checkPass: '',
     },
   }
  },
  computed:{
    breadcrumbList(){
      return this.$route.meta.breadcrumb;
    },
    store(){
      return this.$store.state;
    }
  },
  methods:{
    langChange(e){
      // console.log(e)
      localStorage.setItem('name_language',e);
      this.$i18n.locale = e;
    },
    goBack() {
      this.$router.go(-1);
    },
    handleClick(val) {
      switch (val) {
        case 'editPsd':
          this.dialogVisible = true;
          break;
        case 'logout':
          this.$post('api/manager/logout',{},res => {
            this.$message({
              message: '退出成功',
              type: 'success'
            });
          });
          this.$store.dispatch('CLEAR_USER_CACHE');
          this.$store.commit('SAVE_ITEM',{
            user:''
          });
          this.$router.replace({path:'/login'});
          break;
      }
    },
    handleClose(){
      this.dialogVisible = false;
    },
    handleConfirm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created() {
    // this.breadcrumbList = this.$route.meta.breadcrumb;
    this.selectValue = localStorage.getItem('name_language') || 'zh'
  }

}
</script>

<style lang="less" scoped>
  .sider-logo {
    color: #fff;
    background: #2b2f3a;
    width: 210px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    letter-spacing: 5px;
  }
  .head-setting{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    box-shadow: 0 1px 2px 0 rgba(9,18,26,0.06), 0 4px 8px 0 rgba(39,56,73,0.08);
    padding: 0 20px;
    background: #fff;
    >span{
      font-size: 12px;
    }
    /deep/.el-input__inner{
      border: none;
      text-align: right;
    }
    /deep/.el-input{
      width: 100px;
    }
  }
  .el-dropdown-menu{
    background: #ffffff;
    width: 123px;
    padding: 6px 0;
    font-size: 14px;
    margin: 0;
    border-radius:0;
    .el-dropdown-menu__item{
      color: #606266;
      &:hover{
        background: #f5f7fa;
        color: #606266;
      }
    }
    .popper__arrow{
      opacity: 1;
    }
  }
  .head-setting/deep/.el-select__caret{
    opacity: 0!important;
  }
</style>

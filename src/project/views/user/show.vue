<template>
  <div >
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
          <el-dropdown style="position: absolute;right: -9px;top: -6px"  @command="handleClick">
            <el-button type="text">
              <img src="../../assets/more.png" alt="" width="10" height="8">
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="状态">启用</el-dropdown-item>
              <el-dropdown-item command="状态">禁用</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="text item">
          <span class="text_label">User ID：</span>
          {{user.id}}
        </div>
        <div class="text item">
          <span class="text_label">启用状态：</span>
          {{user.status}}
        </div>
        <div class="text item">
          <span class="text_label">手机号：</span>
          {{user.phone}}
        </div>
        <div class="text item">
          <span class="text_label">昵称：</span>
          {{user.nickname}}
        </div>
        <div class="text item">
          <span class="text_label">邮箱：</span>
          {{user.email}}
        </div>
        <div class="text item">
          <span class="text_label">注册时间：</span>
          {{user.createAt}}
        </div>
        <div class="text item">
          <span class="text_label">最近登录时间：</span>
          {{user.accessAt}}
        </div>
        <div class="text item">
          <span class="text_label">备注：</span>
          {{user.comment}}
        </div>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card class="box-card-large">
        <el-tabs v-model="activeName">
          <el-tab-pane label="账户信息" name="first">
            账户信息
          </el-tab-pane>
          <el-tab-pane label="设备信息" name="second">
            设备信息
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>


    <!--      <el-dialog-->
    <!--        title="查看图片"-->
    <!--        :visible.sync="imgVisible"-->
    <!--        :modal-append-to-body='false'-->
    <!--        width="50%"-->
    <!--        :before-close="handleClose">-->
    <!--        <img :src="'https://www.gunghobox.com/images/'+manager.avatar" alt="" width="100%">-->
    <!--      </el-dialog>-->
  </div>
</template>

<script>
  import {get, enable, disable, findById} from './user-service'


  export default {
    name: "show",
    data() {
      return {
        user: {},
        id: this.$route.params.id,
        activeName: 'first',
      }
    },
    created() {
      this.findById();
    },
    methods: {
      findById() {
        findById({id: this.id}, res => {
          this.user = res;
        });
      },
      handleClick(command){
        switch (command) {
          case '状态':
            let status = this.user.status;
            if (status === '禁用') {
              enable({id: this.id}, res => {
                this.$message({
                  type: 'success',
                  message: '已启用!'
                });
                this.findById();
              })
            } else {
              disable({id: this.id}, res => {
                this.$message({
                  type: 'success',
                  message: '已禁用!'
                });
                this.findById();
              })
            }
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .text_label{
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .clearfix{
    position: relative;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 92%;
    margin: 20px;
    display: inline-block;
  }
  .box-card-large{
    width: 92%;
    display: inline-block;
    margin: 20px;
  }
  .el-button--text{
    color: #3e5265;
  }
  .el-button--mini{
    padding: 4px 12px;
  }
  .table-button{
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }
</style>

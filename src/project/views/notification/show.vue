<template>
  <div >
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <div class="text item">
          <span class="text_label">创建时间：</span>
          {{message.createAt}}
        </div>
        <div class="text item">
          <span class="text_label">推送方式：</span>
          {{message.channel}}
        </div>
        <div class="text item">
          <span class="text_label">消息标题：</span>
          {{message.title}}
        </div>
        <div class="text item">
          <span class="text_label">推送时间：</span>
          {{message.createAt}}
        </div>
        <div class="text item">
          <span class="text_label">图文内容：</span>
          <div v-html="message.content" class="rich_text">
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card class="box-card-large">
        <el-tabs v-model="activeName">
          <el-tab-pane label="未推送" name="first">
            <pending
              :id="id"
              @add-user="userVisible = true"
            ></pending>
          </el-tab-pane>
          <el-tab-pane label="已推送" name="second">
            <sent
              :id="id"

            ></sent>
          </el-tab-pane>
          <el-tab-pane label="已取消" name="third">
            <canceled
              :id="id"
            ></canceled>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
<!--    弹出层-->
    <add-user
      :user-visible="userVisible"
      @on-dialog-close="handleClose"
      @on-save-success="handleSave"
    ></add-user>
  </div>
</template>

<script>
  import {get} from '@/project/service/notificationPacket'
  import Search from "@/framework/components/search";
  import addUser from './addUser'
  import pending from './pending'
  import sent from './sent'
  import canceled from './canceled'
  export default {
    name: "show",
    components:{
      Search,addUser,pending,sent,canceled
    },
    data() {
      return {
        message: {},
        data:[],
        editProps: {
          visible: false
        },
        imgVisible: false,
        userVisible:false,
        id: this.$route.params.id,
        editId: 0,
        activeName: 'first',
        page: 1,
        pageSize: 10,
        userPage: 1,
        userSize: 10,
        sort: {desc: ['id']},
        roleList: [],
        total: 0,
        userTotal:0,
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        userList:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        searchItems: [
          {
            name: "手机号",
            key: "phone",
            type: "string"
          },
          {
            name: "昵称",
            key: "name",
            type: "string"
          }
        ],
      }
    },
    created() {
      this.get();
      // this.roleSearch();

    },
    methods: {
      get() {
        get({id: this.id}, res => {
          this.message = res;
        });
      },
      handleClose() {
        this.editProps.visible = false;
        this.userVisible = false;
      },
      handleSave() {
        this.userVisible = false;
        this.search(1);
      },
      handleCheckChange(data){
        console.log(data);
      },
      handleClick(command){
        switch (command) {
          case '编辑':
            this.editId = this.id;
            this.editProps.visible = true;
            break;
        }
      },

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

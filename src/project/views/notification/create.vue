<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="60%"
    :before-close="handleClose">
    <div style="overflow: auto;height:40vh;padding: 10px 0 40px;">
      <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px" v-if="messageType !== 'sms'">
        <el-form-item label="消息标题" prop="title">
          <el-input v-model="formValidate.title" placeholder="输入标题"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="subTitle" >
          <el-input v-model="formValidate.subTitle" placeholder="输入副标题"></el-input>
        </el-form-item>
        <el-form-item label="图文详情" prop="content">
          <Editor :defaultContent="formValidate.content" @on-change-content="onChangeEditor"/>
        </el-form-item>
      </el-form>
      <div v-if=" messageType === 'sms'">
        <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px" v-if="messageType === 'sms'">
          <el-form-item label="消息标题" prop="title">
            <el-input v-model="formValidate.title" placeholder="输入标题"></el-input>
          </el-form-item>
          <el-form-item label="短信详情" prop="content" >
            <el-input type="textarea" :rows="6" v-model="formValidate.content" placeholder="输入副标题"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm('formValidate')" >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Editor from "@/framework/components/editor"
  import Upload from "@/framework/components/upload";
  import Search from "@/framework/components/search";
  import { save } from './notification-service';
  import { search,count } from '../user/user-service'
  export default {
    name: "dialog",
    components:{
      Upload,Editor,Search
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },
      messageType:{
        type:String,
        default:'短信推送'
      }
    },
    data(){
      return{
        formValidate:{
          title:'',
          content:'',
          scope:'',
          type:this.messageType,
          createAt: "2019-11-30 17:15:39"
        },
        ruleValidate:{
          title:[{required:true,message:'不能为空',trigger:'blur'}],
          subTitle:[{required:true,message:'不能为空',trigger:'blur'}],
          content:[{required:true,message:'不能为空',trigger:'blur'}],
        },
        model:'notificationPacket',
        active: 0,
        data:[],
        page:1,
        pageSize:10,
        total:0,
        sort: {asc: [], desc: ['id']},
        extraParam:{},
        searchItems: [
          {
            name: "手机号",
            key: "phone",
            type: "string"
          },
          {
            name: "最近登录时间",
            key: "accessAt",
            type: "daterange",
          },
          {
            name: "状态",
            key: "status",
            type: "select",
            displayValue: ["禁用", "启用"],
            value: ["禁用", "启用"]
          }
        ],
        tableData:[{
          title: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        }, {
          title: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        },{
          title: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        },{
          title: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        },{
          title: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄'
        },],
      }
    },
    computed:{
    },
    created(){

    },
    methods:{
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleConfirm(name){
        this.$nextTick(() => {
          this.$refs[name].validate(valid => {
            if (valid) {
              this.formValidate.channel = this.messageType;
              save({
                [this.model]:this.formValidate,
              },res => {
                this.$notify.success('添加成功');
                this.$emit('on-save-success');
              })
            }
          })
        });
      },
      pre() {
        if (this.active-- < 0) this.active = 0;
      },
      next() {
        this.search(this.page);
        if (this.active++ > 2) this.active = 0;
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this.search(this.page);
      },
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
            sort: _t.sort
          },
          user: _t.extraParam
        };
        if (
          param.pageable.sort.asc.length === 0 &&
          param.pageable.sort.desc.length === 0
        ) {
          delete param.pageable.sort;
        }
        search(param, res => {
          let data = res;
          _t.data = data;
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        let param = {user: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      handleSelectionChange(){

      },
      searchBySearchItem(){

      },
      onChangeEditor(val){

        this.formValidate.contet = val.html;
      },
      handleSelectSms(val){
        this.formValidate.title = val.title;
        this.formValidate.content = val.content;
      }
    }
  }
</script>

<style scoped>

</style>

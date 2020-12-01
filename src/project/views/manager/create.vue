<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px">

      <el-form-item label="姓名" prop="username">

        <el-input v-model="formValidate.username" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input type="password" v-model="formValidate.password" placeholder="输入账号"></el-input>
      </el-form-item>
      <!-- <el-form-item label="姓名" prop="realname">
        <el-input v-model="formValidate.realname" placeholder="输入姓名"></el-input>
      </el-form-item> -->
      <el-form-item label="头像" prop="image">
        <upload
          @on-transport-file-list="handleTransportFileList"
          :max-size="5120"
          :limit="3"
        >
        </upload>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formValidate.phone" placeholder="输入手机号"></el-input>
      </el-form-item>
      <!-- <el-form-item label="邮箱" prop="email">
        <el-input v-model="formValidate.email" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formValidate.comment" placeholder="输入备注"></el-input>
      </el-form-item> -->

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('formValidate')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import {save} from './manager-service'

  export default {
    name: "dialog",
    mixins: [emitter],
    components: {
      Upload
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("登录密码不能为空"));
        } else {
          if (this.formValidate.password !== "") {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField("confirmPassword");
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("再次输入你的密码"));
        } else if (value !== this.formValidate.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      };
      const validateFileList = (rule, value, callback) => {
        if (this.formValidate.fileList.length === 0) {
          callback("头像不能为空");
        } else {
          callback();
        }
      };
      return {
        model:'employeeInfo',
        formValidate: {
   //       status: '启用',
          username: '',
          password: '',
          realname: '',
          phone: '',
          email: '',
          image:'',
          comment: ''
        },
        ruleValidate: {
          username: [
            {required: true, message: "姓名不能为空", trigger: "blur"}
          ],
          password: [
            {required: true, message: "不能为空", trigger: "blur"}
          ],

          // realname: [
          //   {required: true, message: "姓名不能为空", trigger: "blur"}
          // ],
          phone: [
            {required: true, message: "手机号不能为空", trigger: "blur"}
          ],
          // email: [
          //   {required: true, message: "邮箱不能为空", trigger: "blur"},
          //   {type: "email", message: "邮箱格式不对", trigger: "blur"}
          // ],
        },
      }
    },
    computed: {},
    methods: {
      handleClose() {
        this.$emit('on-dialog-close');
      },
      handleConfirm(name) {
        this.broadcast('SiUpload', 'on-form-submit', () => {
        });
        this.$nextTick(() => {
          this.$refs[name].validate(valid => {
            if (valid) {
              save(
                {[this.model]:this.formValidate},
                res => {
                if(res.code == 200){
                  this.$message.success('添加成功');
                  this.$emit('on-save-success');
                }else{
                  this.$message.success('添加失败');
                }

              })
            }
          })
        });

      },
      handleTransportFileList(fileList) {
        this.formValidate.image = fileList[0].response.data;
      }
    }
  }
</script>

<style scoped>

</style>

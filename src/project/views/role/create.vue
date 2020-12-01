<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px">

      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formValidate.name" placeholder="输入姓名"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="comment">
        <el-input v-model="formValidate.comment" placeholder="输入备注"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('formValidate')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import {save} from './role-service'

  export default {
    name: "dialog",
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
      return {
        model: 'role',
        formValidate: {
          name: '',
          comment: '',
        },
        ruleValidate: {
          name: [{required: true, message: '不能为空', trigger: 'blur'}],
          comment: [{required: true, message: '不能为空', trigger: 'blur'}],
        }
      }
    },
    computed: {},
    methods: {
      handleClose() {
        this.$emit('on-dialog-close');
      },
      handleConfirm(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            save({[this.model]: this.formValidate}, res => {
              this.$message.success('添加成功');
              this.$emit('on-save-success');
            })
          }
        });

      },
    }
  }
</script>

<style scoped>

</style>

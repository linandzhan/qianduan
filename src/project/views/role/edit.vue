<template>
  <el-dialog
    title="编辑信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">

    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formValidate.name" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input v-model="formValidate.comment" placeholder="输入备注"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">

      <el-button type="primary" @click="handleConfirm('formValidate')">确 定</el-button>
      <el-button type="info" @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import {get, update} from './role-service'

  export default {
    name: "edit",
    components: {
      Upload
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
      editId: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        model: 'role',
        formValidate: {
          name: '',
          comment: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '不能为空', trigger: "blur"}
          ],
          comment: [
            {required: true, message: '不能为空', trigger: "blur"}
          ]
        },

      }
    },
    computed: {},
    watch: {
      editId(val) {
        this.get(val);
      }
    },
    methods: {
      handleClose() {
        this.$emit('on-dialog-close');
      },
      handleConfirm(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            update({[this.model]: this.formValidate}, res => {
              this.$message.success('修改成功');
              this.$emit('on-save-success');
            })
          }
        });

      },
      get(id) {
        get({id: id}, res => {
          let keys = Object.keys(res);
          keys.map(key => {
            this.formValidate[key] = res[key];
          });

        });
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="formValidate" :model="item" :rules="ruleValidate" label-width="150px">
      <span> 基本信息 </span>
      <el-form-item label="关键词" prop="name">
        <el-input v-model="formValidate.name" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item label="排序数字" prop="position">
        <el-input-number v-model="formValidate.position"  :min="1" :max="10000" label="输入文字"></el-input-number>
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
  import {save, get, update} from './trending-word-service'

  export default {
    name: "creat",
    components: {
      Upload
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
      item: {
        type: Object,
        default: {},
      }
    },
    data() {
      return {
        radio: '1',//1是启用的意思
        formValidate: {
          name: '',
          position:0,
        },
        ruleValidate: {
          name: [{required: true, message: '不能为空', trigger: 'blur'}],
          position: [{required: true, message: '不能为空', trigger: 'blur'}],
        },
        model:'trendingWord'
      }
    },
    computed: {},
    methods: {
      handleClose() {
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleConfirm(name) {
          this.$refs[name].validate(valid => {
            if (valid) {
              update({[this.model]: this.formValidate}, res => {
                this.$notify.success('编辑成功');
                this.$emit('on-save-success');
              })
            }
          });
      },
      findById() {
          get({id: this.id}, res => {
            this.formValidate = res;
          });
      },
      handleTransportFileList() {

      },
    },
    watch: {
      item(val) {
        this.formValidate = JSON.parse(JSON.stringify(val));
        console.log(val);
      }
    },
    created() {

    },
  }
</script>

<style scoped>

</style>

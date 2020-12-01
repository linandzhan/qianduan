<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="60%"
    :before-close="handleClose">
<!--    <div style="overflow: auto;height:40vh;padding: 10px 0 40px;">-->
    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px">
      <el-form-item label="文章名字" prop="title">
        <el-input v-model="formValidate.title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="排序数字" prop="position">
        <el-input-number v-model="formValidate.position"  :min="1" :max="1000"></el-input-number>      </el-form-item>
      <el-form-item label="图文详情" prop="content">
        <Editor :defaultContent="formValidate.content" @on-change-content="onChangeEditor"/>
      </el-form-item>
    </el-form>
<!--    </div>-->

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm('formValidate')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import Editor from "@/framework/components/editor"
  import { save } from '../page-service' //接口
  import Emitter from '@/framework/mixins/emitter'

  export default {
    mixins: [Emitter],
    name: "creat",
    components: {
      Upload,Editor
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
      id: {
        type: Number,
        default: 0,
      }
    },
    data() {
      return {
        categoryList:[],
        radio: '1',//1是启用的意思
        show: false,

        formValidate: {
          label:'help'
        },
        ruleValidate: {
          title: [{required: true, message: '不能为空', trigger: 'blur'}],
          position: [{required: true, message: '不能为空', trigger: 'blur'}],
          content: [{required: true, message: '不能为空', trigger: 'blur'}],
        },
        model:'page'
      }
    },
    computed: {},
    methods: {
      onChangeEditor(val){
        this.formValidate.content = val.html;
      },
      handleClose() {
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleConfirm(name) {
        this.$nextTick(() => {
          this.$refs[name].validate(valid => {
            if (valid) {
              save({[this.model]:this.formValidate},res => {
                this.$message.success('添加成功');
                this.$emit('on-save-success');
              })
            }
          })
        });

      },
      handleTransportFileList(e) {
        console.log(e)
        this.formValidate.thumbnail = e[0].response.data
      },
      handleTransportFileList2(e) {
        console.log(e)
        this.formValidate.blueprint = e[0].response.data
      },

    },

    created() {
      // this.findById()
    }
  }
</script>

<style scoped>

</style>

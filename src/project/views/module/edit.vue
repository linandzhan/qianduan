<template>
  <el-dialog
    title="编辑信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">
    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px">
      <el-form-item label="模块名称" prop="name">
        <el-input v-model="formValidate.name" placeholder="请输入..."></el-input>
      </el-form-item>
      <el-form-item label="path" prop="path">
        <el-input v-model="formValidate.path" placeholder="请输入..."></el-input>
      </el-form-item>
      <el-form-item
        label="排序顺序"
        prop="position"
        :rules="[
          { required: true, message: '排序顺序不能为空'},
          { type: 'number', message: '排序顺序必须为数字值'}
        ]"
      >
        <el-input v-model.number="formValidate.position" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <i v-if="formValidate.icon" :class="formValidate.icon" style="margin-right:10px"></i> <el-button  @click="addIconProps.visible = true">选择图标</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="handleConfirm('formValidate')">确 定</el-button>
      <el-button type="info" @click="handleClose">取 消</el-button>
    </div>
    <i-add-icon
      :dialog-visible="addIconProps.visible"
      :edit-id="editId"
      @on-addIconDialog-close="addIconHandleClose"
      @on-addIconDialog-success="addIconHandleSuccess"
    />
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import {update,get} from '@/project/service/module'
  import IAddIcon from "./addIcon"
  import emitter from "@/framework/mixins/emitter"
  export default {
    name: "edit",
    mixins:[emitter],
    components: {
      Upload,IAddIcon
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
      editId: {
        type: Number,
        default: 0
      },
      isEdit:{
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        addIconProps:{
          visible:false
        },
        model: 'module',
        formValidate: {
        },
        ruleValidate: {
          name: [
            {required: true, message: "模块名称不能为空", trigger: "blur"}
          ],
        },
      }
    },
    computed: {},
    watch: {
      dialogVisible(val){
        if(val == true){
          this.get()
        }
      },
      editId(val) {
        // this.get(val);
      },
      isEdit(val){
        if(val == true){

        }
      }
    },
    methods: {
      addIconHandleClose(){
        this.addIconProps.visible = false;
      },
      addIconHandleSuccess(icon){
        this.formValidate.icon = icon
        this.addIconProps.visible = false;
      },
      handleClose() {
        this.isEdit = false
        this.formValidate = {}
        this.$emit('on-dialog-close');
      },
      handleConfirm(name) {
        //指向广播 this.broadcast为混入的方法
        this.$nextTick(() => {
          this.$refs[name].validate(valid => {
            if (valid) {
              let params = {
                id:this.editId,
                name:this.formValidate.name,
                path:this.formValidate.path,
                position:this.formValidate.position,
                type:"employee",
                client:"console",
                icon:this.formValidate.icon
              }
              update({module:params}, res => {
                this.$message.success('修改成功');
                this.formValidate = {}
                this.$emit('on-save-success');
              })
            }
          })
        })
      },
      get(id) {
        get({id: this.editId}, res => {
          this.formValidate = res;
        });
      }
    }
  }
</script>

<style scoped>

</style>

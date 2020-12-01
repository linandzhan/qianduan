<template>
  <el-dialog
    title="版本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px">

      <el-form-item label="系统" prop="platform">
        <el-input v-model="platform" disabled></el-input>
      </el-form-item>
      <el-form-item label="版本号" prop="number" >
        <el-input v-model="formValidate.number" placeholder="输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="强制更新" prop="isOptional" >
        <el-select v-model="formValidate.isOptional" placeholder="请选择">
          <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value"
          >
          </el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="版本描述" prop="description" >
        <el-input type="textarea" v-model="formValidate.description"></el-input>
      </el-form-item>
      <el-form-item label="下载地址" v-if="platform !== 'iphone' && platform !== 'ipad'">
        <Upload
          type="file"
          @on-transport-file-list="handleTransportFileList"
          accept="apk"
        ></Upload>
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
  import { save } from './version-service'
  import emitter from '@/framework/mixins/emitter'
  export default {
    name: "dialog",
    mixins:[emitter],
    components:{
      Upload
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },
      platform:{
        type:String,
        default: '',
      }
    },
    data(){
      return{
        model:'version',
        formValidate:{
          number:'',
          isOptional:'',
          description:''
        },
        ruleValidate:{
          number:[{required:true,message:'不能为空',trigger:'blur'}],
          isOptional:[{required:true,message:'不能为空',trigger:'change'}],
          description:[{required:true,message:'不能为空',trigger:'blur'}],
        },
        options:[
          {label:'是',value:true},
          {label:'否',value:false}
        ]
      }
    },
    created(){
      // this.formValidate.platform = this.platform;
      // console.log(this.platform);
    },
    computed:{
    },
    methods:{
      handleClose(){
        this.$emit('on-dialog-close');
      },
      handleConfirm(name){
        this.formValidate.platform = this.platform;
        this.broadcast("SiUpload", "on-form-submit", () => {
        });
        this.$nextTick(() => {
          this.$refs[name].validate(valid => {
            if (valid) {
              save({[this.model] : this.formValidate},res => {
                this.$notify.success('添加成功');
                this.$emit('on-save-success');
              })
            }
          })
        });

      },
      handleTransportFileList(fileList){
       if (this.platform === 'iphone' || this.platform === 'ipad') {

       } else {
         if (fileList.length > 0) {
           this.formValidate.url = fileList[0].response.data;
         }else {

         }
       }
      }
    }
  }
</script>

<style scoped>

</style>

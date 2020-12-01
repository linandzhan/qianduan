<template>
  <div class="preview">
    <el-dialog
      title="查看图片"
      :visible.sync="imgVisible"
      :modal-append-to-body='false'
      width="50%"
      :before-close="handleClose">
      <img :src="$store.state.prefix+imgUrl" alt="" width="100%">
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "previewImg",
      props:{
        imgVisible:{
          type:Boolean,
          default() {
            return false;
          }
        },
        imgUrl:{
          type:String,
          default() {
            return ''
          }
        }
      },
      data(){
          return{

          }
      },
      methods:{
        handleClose(){
          this.$emit('on-preview-cancal');
        }
      }
    }
</script>

<style lang="less" scoped>
  .preview/deep/.el-dialog__body{
    max-height: 100vh!important;
    overflow: auto;
  }

</style>

<template>
  <el-row class="page">
    <el-col class="welcome" :span="10" :offset="8">{{$t('message.projectName')}}</el-col>
  </el-row>
</template>

<script>
    export default {
        name: "Welcome"
    }
</script>

<style lang="less" scoped>
  .page {
  .welcome {
    margin-top: 200px;
    font-size: 30px;
    color: #333333;
  }
  }
</style>

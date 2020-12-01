<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
  import Layout from '@/framework/layout'

  export default {
    name: 'App',
    components: {
      Layout
    }
  }
</script>

<style lang="less">
	@import './framework/style/trasition.less';
  @import "./framework/style/dialog.less";
  @import "./framework/style/table.less";
  @import "./framework/style/layoutLeft.less";
  @import "./framework/style/button.less";
  @import "./framework/style/card.less";
  @import "./framework/style/form";
  @import "./framework/style/tabs";
  @import "./framework/style/step";
  @import "./project/styles/style";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
</style>

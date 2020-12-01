<template>
  <el-aside
    width="211px"
    :style="{
    position: 'fixed',
    height: 'calc(100vh - 48px)',
    left: 0,
    overflow: 'auto',
    background: '#304156',
    boxSizing: 'border-box',
    }">
    <div ref="menuBlock" :style="'height:' + menuBlockHeight + 'px'" class="sider-menu-block">
      <el-menu
        background-color="#304156"
        text-color="rgb(191, 203, 217)"
        active-text-color="#1890ff"
        :unique-opened="true"
        @select="onSelect"
      >
        <template v-for="(item,i) in menuList">
          <el-submenu :index="i.toString()">
            <template slot="title"><i :class="item.icon"></i>{{$t(item.displayName)}}</template>
            <el-menu-item
              :index="i+'-'+j"
              v-if="!child.children"
              v-for="(child,j) in item.children"
            >
              {{child.displayName}}
            </el-menu-item>
            <el-submenu :index="i + '-' + j" v-else>
              <template slot="title">{{child.displayName}}</template>
              <el-menu-item
                v-for="(c,k) in child.children"
                :index="i + '-' + j + '-' + k"
                :key="k"
              >
                {{c.displayName}}
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
const menuList = require("./menuList.json")
export default {
  name: "SiLayoutLeft",
  data(){
    return{
      projectName: "floder后台管理系统",
      menuList: menuList,
      menuBlockHeight: 0
    }
  },
  mounted() {
    // 计算滚动区域高度
    // let logoHeight = this.$refs.siderLogo.offsetHeight;
    // this.menuBlockHeight = window.innerHeight - logoHeight;
    // this.getMyMenu();
  },
  methods:{
    onSelect(name,path){
      let menuList = this.menuList;
      let flag = typeof name === "number";
      let link = "/";
      let displayName = "";
      if (flag) {
        link = menuList[name].link;
        displayName = menuList[name].displayName;
      } else {
        let arr = name.split("-");
        if (arr.length === 2) {
          // 第二层数据
          link = menuList[arr[0]].children[arr[1]].link;
          displayName = menuList[arr[0]].children[arr[1]].displayName;
        } else {
          // 第三层数据
          link = menuList[arr[0]].children[arr[1]].children[arr[2]].link;
          displayName =
            menuList[arr[0]].children[arr[1]].children[arr[2]].displayName;
        }
      }
      this.$router.push(link);
    },
    getMyMenu(){
      let menuList = JSON.parse(localStorage.getItem('userCache')).menus;
      let newArr = menuList.map(first => {
        if (first.moduleList) {
          return {
            displayName:first.name,
            icon:'',
            children:first.moduleList.map(second => {
              if (second.moduleList){
                return {
                  displayName:second.name,
                  icon:'',
                  children:second.moduleList.map(third => {
                    return{
                      displayName:third.name,
                      icon:''
                    }
                  })
                }
              } else {
                return{
                  displayName:second.name,
                  icon:'',
                  link:second.path
                }
              }

            })
          }
        } else {
          return {
            displayName:first.name,
            icon:'el-icon-setting',
            link:first.path,
          }
        }


      });
      console.log(newArr);
      this.menuList = newArr;

    }
  }
}
</script>

<style lang="less" scoped>
	.el-submenu .el-menu-item {
		background-color: #1f2d3d !important;
	}	
  .sider-logo {
    // color: #19be6b;
    color: #57b382;
    width: 100%;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    margin: 10px 0;
  }
  .el-menu-item:hover{
    background:rgb(48, 65, 86)!important;

  }
  .el-aside{
    /*!*隐藏滚动条，当IE下溢出，仍然可以滚动*!*/
    /*-ms-overflow-style:none;*/
    /*!*火狐下隐藏滚动条*!*/
    /*overflow:-moz-scrollbars-none;*/
    &::-webkit-scrollbar{
      display:none;
    }
  }
</style>

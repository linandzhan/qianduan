<template>
  <div class="search">
    <div class="search-block">
      <search-item
        :clear="clear"
        :key="i"
        v-for="(item,i) in searchItems"
        :item="item"
        @on-change="onChange"
      ></search-item>
      <slot></slot>
      <el-button class="search-btn" icon="el-icon-search" type="primary" @click="onSearch">搜索</el-button>
      <el-button icon="el-icon-refresh" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script>
  import SearchItem from "./search-item.vue";
  import { setTimeout } from "timers";
  export default {
    name: "SiSearch",
    props: {
      searchItems: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        keywords: {},
        clear: false
      };
    },
    components: {
      SearchItem
    },
    computed: {},
    methods: {
      onSearch() {
        console.log(this.keywords);
        this.$emit("on-search", this.keywords); // handle seach
      },
      onReset() {
        this.keywords = {};
        this.clear = true;
        setTimeout(() => {
          this.clear = false;
        }, 200);
        this.$emit("on-search", this.keywords); //  handle seach
      },
      onChange(obj) {
        let value = obj.value;
        console.log(typeof (value));
        if (value === -1 || value === "" || value === undefined) {
          delete this.keywords[obj.key]; // if value is undefined or "" or -1 delete it
        } else  {
          this.keywords[obj.key] = obj.value;
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .search {
    padding-top: 10px;
    .search-block {
      /*padding: 10px 20px;*/
      // background-color: #ffffff;
      .search-btn {
        /*margin: 0 10px;*/
        // background: #00a16c;
        border: none;
        border-radius: 2px;
      }
    }
  }
</style>

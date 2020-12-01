<template>
  <div class="search-item">
    <div class="label">{{item.name}}</div>
    <div class="content" v-if="item.type === 'string'">
      <el-input v-model="value" :clearable="true" :placeholder="item.name" @change="onChange"></el-input>
    </div>
    <div class="content" v-if="item.type === 'select'">
      <el-select
        v-model="value"
        :placeholder="item.name"
        @change="onChange"
        :clearable="true"
        style="width: 200px"
      >
        <el-option :value="-1" label="不限">不限</el-option>
        <el-option v-for="(d,i) in item.displayValue" :value="i" :key="i" :label="d">{{d}}</el-option>
      </el-select>
    </div>
    <div class="content" v-if="item.type === 'datetime'">
      <el-date-picker
        v-model="value"
        type="datetime"
        @change="onChange"
        style="width: 200px"
        format="yyyy-MM-dd HH:mm:ss"
        :placeholder="item.name"
      ></el-date-picker>
    </div>
    <div class="content" v-if="item.type === 'date'">
      <el-date-picker
        v-model="value"
        @change="onChange"
        format="yyyy-MM-dd"
        type="date"
        :placeholder="item.name"
        style="width:350px"
      ></el-date-picker>
    </div>
    <div class="content" v-if="item.type === 'daterange'" >
      <el-date-picker
        v-model="value"
        @change="onChange"
        format="yyyy-MM-dd"
        type="daterange"
        :placeholder="item.name"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 350px"
      ></el-date-picker>
    </div>
    <div class="content" v-if="item.type === 'datetimerange'">
      <el-date-picker
        v-model="value"
        @change="onChange"
        value-format="yyyy-MM-dd hh:mm:ss"
        format="yyyy-MM-dd hh:mm:ss"
        type="datetimerange"
        :placeholder="item.name"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 400px"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SiSearchItem",
    props: {
      item: {
        type: Object,
        default() {
          return {};
        }
      },
      clear: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        value: ""
      };
    },
    watch: {
      clear(clear) {
        if (clear) {
          this.value = "";
        }
      }
    },
    methods: {
      onChange(e) {
        console.log(e);
        let obj = {};
        obj.key = this.item.key;
        let type = this.item.type;
        if (type === "string") {
          let value = e;
          if (value) {
            obj.value = value;
          }
        } else if (type === "select") {
          let value = e;
          if (value !== -1) {
            obj.value = this.item.value[value];
            this.value = this.item.value[value];
          }
        } else if (type === "date") {
          obj.value = e;
        } else if (type === "datetime") {
          obj.value = e;
        } else if (type === "daterange") {
          if (!e[1] && !e[0]) {
            obj.value = undefined;
          } else {
            obj.value = e;
          }
        } else if (type === "datetimerange") {
           if (e) {
             if (!e[1] && !e[0]) {
               // when arr member is '', set this item disappear
               obj.value = undefined;
             } else {
               obj.value = e;
             }
           }else {
             obj.value = undefined;
           }
        }
        this.$emit("on-change", obj); // emit
      }
    }
  };
</script>

<style lang="less" scoped>
  .search-item {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 10px;
    .label,
    .content {
      display: inline-block;
    }
    .label {
      font-size: 14px;
      text-align: center;
      margin-right: 15px;
    }
  }
</style>

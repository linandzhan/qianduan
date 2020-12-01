<template>
  <div >
    <!--    按钮和分页-->
    <el-col :span="24">
      <search
        style="width: 95%;margin: 10px auto"
        :search-items="searchItems"
        @on-search="searchBySearchItem"
      ></search>
    </el-col>
    <el-col :span="24">
      <div style="width: 95%;margin: 0px auto;">
        <div class="pager-group">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, jumper, prev, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-col>
    <!--      表格-->
    <el-col :span="24">
      <el-table
        v-loading="loading"  element-loading-spinner="el-icon-loading"
        :data="tableData"
        style="width: 95%;margin:10px auto;"
        @selection-change="handleSelectionChange"
      >
<!--        <el-table-column-->
<!--          type="selection"-->
<!--          width="55">-->
<!--        </el-table-column>-->
        <el-table-column
          label="接口"
          prop="path"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="匿名访问"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" @click.stop="openPermission(scope.row)">{{scope.row.free ==true?'关闭':'启用'}}</el-button>
<!--            <el-button type="text" @click.stop="closePermission(scope.row.id)">关闭</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>

</template>

<script>
  import Search from "@/framework/components/search";
  import {search,count,update} from '@/project/service/permission'
  export default {
    data() {
      return {
        model:"permission",
        selectList:[],
        tableData: [],
        pageSize: 10,
        page: 1,
        total: 0,
        loading: true,
        extraParam:{},
        searchItems: [
          {
            name: "接口",
            key: "path",
            type: "string"
          },
          {
            name: "匿名访问",
            key: "free",
            type: "selectValue",
            displayValue:['启用','关闭'],
            value:['true','false']
          },
        ],
      }

    },
    components: {
      Search
    },
    mounted() {
    },
    methods: {
      openPermission(row){
        let that = this
        let status = ''
        if(row.free == false){
          status = '启用'
        }else{
          status = '关闭'
        }
        let id = row.id
        that.$confirm(`确定${status}选中内容？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(status == '启用'){
            row.free = true
          }else{
            row.free = false
          }
          let params = row
          update({permission:params},res=>{
            that.$message({
              type: 'info',
              message: `${status}成功`
            });
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: `已取消${status}`
          });
        });
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      },
      searchBySearchItem(searchItems) {
        console.log(searchItems)
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.searchItems,
            len = searchItemList.length;
          i < len;
          i++
        ) {
          keys.push(searchItemList[i].key);
        }
        console.log(keys)
        for (let i in keys) {
          if (searchItems[keys[i]]) {
            this.extraParam[keys[i]] = searchItems[keys[i]];
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        this.search(1);
      },
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
            desc:'id'
          },
          permission: _t.extraParam
        };
        search(param, res => {
          let data = res;
          _t.tableData = data;
          _t.getTotal();
          this.loading = false
        });
      },
      getTotal() {
        let _t = this;
        let param = {[this.model]: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      //表格事件方法
      handleSelectionChange(val) {
        this.selectList = val;
        console.log(this.selectList)
      },
    },
    created() {
      this.search(1)
    }
  }

</script>

<style scoped lang="less">
  .el-aside {
    padding: 20px;
    border-right: 1px solid #eee;
    .el-input {
      margin-bottom: 20px;
    }
    .icon {
      font-size: 12px;
    }
  }

</style>

<template>
  <el-row class="page">
    <!--    搜索-->
    <el-col :span="24">
      <search
        style="width: 95%;margin: 10px auto"
        :search-items="searchItems"
        @on-search="searchBySearchItem"
      ></search>
    </el-col>
    <!--    按钮和分页-->
    <el-col :span="24">
      <div style="width: 95%;margin: 10px auto;">

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
    <!--    表格-->
    <el-col :span="24">
      <el-table
        :data="data"
        style="width: 95%;margin:0 auto;"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="选择"
          width="80">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.id" @change="onChange">选择</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称&型号"
        >
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="商品分类"
        >
        </el-table-column>
      </el-table>
    </el-col>


  </el-row>
</template>
<script>
  import Search from "@/framework/components/search";
  // import IEdit from "./productEdit"
  import {post} from "@/framework/http/request";
  import Emitter from '@/framework/mixins/emitter'
  import {searchGoods, countGoods, del, enable, disable,getCategory,pass,reject} from '@/project/service/goods' //接口
  import {findById} from '@/project/service/store';

  export default {
    name:'commodityAudit',
    mixins: [Emitter],

    data() {
      return {
        categoryListName:[],
        categoryListId:[],
        // storeName: JSON.parse(decodeURIComponent(this.$route.params.storeName)),
        model: "goods",
        createProps: {
          visible: false
        },
        editProps: {
          visible: false
        },
        menu: {
          visible: false
        },
        editId: 0,//编辑id
        data: [],
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        searchItems: [
          {
            name: "商品名称",
            key: "goodsName",
            type: "string"
          },
          {
            name: "商品分类",
            key: "categoryId",
            type: "select",
            displayValue: [],
            value: []
          }
        ],
        radio:0
      };
    },
    // created() {
    //   this.search(1);
    // },
    computed: {
      route() {
        return this.$route;
      }
    },
    components: {
      Search,
    },
    methods: {
      //批量删除
      batchDelete() {
        this.broadcast("SiTable", "on-get-selectList");
        let _t = this;
        this.$nextTick(() => {
          let selectList = this.selectList;
          if (selectList.length === 0) {
            this.$notify.warning({
              title: "至少选择一条数据"
            });
            return;
          }
          this.$confirm('确定删除所选记录吗?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            selectList.forEach(item=>{
              del({id: item.id}, res => {
                if(selectList.indexOf(item)==selectList.length-1){
                  _t.search(_t.page);
                  // this.$message({
                  //   type: 'success',
                  //   message: '删除成功!'
                  // });
                }
              });
            })


          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        });
      },
      findById() {
        findById({storeId: this.id}, res => {
          this.data = res;
        });
      },
      handleEdit() {
        this.editId = this.selectList[0].id
        this.editProps.visible = true;
      },
      handleStatusChange(row) {
        let status;
        let _t = this;
        if (row.status.indexOf('启用') >= 0) {
          status = '禁用'
        } else {
          status = '启用'
        }
        this.$confirm(`确定${status}选中内容？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (status === '禁用') {
            disable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已禁用!'
              });
              _t.search(_t.page);
            })
          } else {
            enable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已启用!'
              });
              _t.search(_t.page);
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handlePageSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(1);
      },
      handlePageChange(page) {
        this.search(page);
      },
      sortChange(e){//{column: {…}, prop: "updateAt", order: "ascending"}
        let asc = this.sort.asc;
        let desc = this.sort.desc;
        console.log(e);
        if(asc.indexOf(e.prop)>-1) asc.splice(asc.indexOf(e.prop), 1);
        if(desc.indexOf(e.prop)>-1) desc.splice(desc.indexOf(e.prop), 1);
        if(e.order!=null){
          if(e.order=="ascending"){
            this.sort['asc'].push(e.prop);
          }else if(e.order=="descending"){
            this.sort['desc'].push(e.prop);
          }
        }
        this.search(1);
      },
      // handleSortChange(sort) {
      //   let key = sort.key;
      //   let order = sort.order;
      //   let asc = this.sort.asc;
      //   let desc = this.sort.desc;
      //   if (asc.indexOf(key) > -1) {
      //     let idx = asc.indexOf(key);
      //     asc.splice(idx, 1);
      //   }
      //   if (desc.indexOf(key) > -1) {
      //     let idx = desc.indexOf(key);
      //     desc.splice(idx, 1);
      //   }
      //   if (order !== "normal") {
      //     this.sort[order].push(key);
      //   }
      //   this.search(1);
      // },
      searchBySearchItem(searchItems) {
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
        for (let i in keys) {
          if (searchItems[keys[i]]) {
            this.extraParam[keys[i]] = searchItems[keys[i]];
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        if(this.extraParam.categoryId) this.extraParam.categoryId = this.categoryListId[this.categoryListName.indexOf(this.extraParam.categoryId)];
        if(this.extraParam.updateAt) {
          this.extraParam.startAt = this.$moment(this.extraParam.updateAt[0]).format('YYYY-MM-DD HH:mm:ss');
          this.extraParam.endAt = this.$moment(this.extraParam.updateAt[1]).format('YYYY-MM-DD HH:mm:ss');
        }
        this.search(1);
      },
      toCreate() {
        this.editId=0;
        this.createProps.visible = true;
      },
      search(page) {
        console.log(this.$route.params)
        console.log("storeName"+this.storeName)
        console.log('id'+this.id)
        let _t = this;
        _t.page = page;
        let param = {
          storeName:_t.storeName,
          // status:"已通过",
          pageable: {
            page: page,
            size: _t.pageSize,
            sort: _t.sort
          },
          // [this.model]: _t.extraParam
        };
        if (
          param.pageable.sort.asc.length === 0 &&
          param.pageable.sort.desc.length === 0
        ) {
          delete param.pageable.sort;
        }
        if(!this.extraParam.hasOwnProperty('updateAt')){
          if(this.extraParam.hasOwnProperty('startAt'))delete this.extraParam.startAt;
          if(this.extraParam.hasOwnProperty('endAt')) delete this.extraParam.endAt;
        }
        for(let key in _t.extraParam){
          param[key] = _t.extraParam[key];
        }

        console.log(param);
        searchGoods(param, res => {
          let data = res;
          // data=data.filter(item=>item.status=='已通过')
          _t.data = data;
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        let param = {
          // status:"已通过",
          // storeName:_t.storeName,
        };
        for (let key in _t.extraParam) {
          param[key]=_t.extraParam[key];
        }
        countGoods(param, res => {
          _t.total = parseInt(res);
        });
      },
      handleTransportSelectList(list) {
        this.selectList = list;
      },

      //批量启用
      batchEnable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            enable({id: s.id}, res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //批量禁用
      batchDisable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定禁用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            disable({id: s.id}, res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },

      delete(id) {
        let _t = this;
        del({id: id}, res => {
          _t.search(_t.page);
        });
      },
      enable(id, url) {
        let _t = this;
        post(url, {id: id}, res => {
          _t.search(_t.page);
        });
      },
      handleClose() {
        this.createProps.visible = false;
        this.editProps.visible = false;
      },
      handleSave() {
        this.createProps.visible = false;
        this.search(this.page);
      },
      handleSelectionChange(val) {
        if (val.length > 1) {
          console.log(val);
          val.splice(0,1);
        }


        // this.$nextTick(() => {
        //   this.$refs.multipleTable.toggleRowSelection(val);
        // })
      },
      handleRowClick(row) {
        // print(this.id);
        console.log(this.id);
        this.$router.push({path: `list/show/` + row.id})
      },

      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this.search(this.page);
      },
      onMenuChange(val) {
        console.log(val);
      },
      handleClick(command) {
        switch (command) {
          case '编辑':
            console.log('编辑');
            this.editId = this.selectList[0].id;
            this.createProps.visible = true;
            break;
        }
      },
      onChange(val) {
        this.$emit('on-select-id',val);
      }
    },
    mounted() {
      getCategory({}, res => {
        res.forEach(item=>
          {
            if(item.status=='已启用'){
              this.categoryListName.push(item.name)
              this.categoryListId.push(item.id)
              this.searchItems[1].displayValue=this.categoryListName
              this.searchItems[1].value=this.categoryListName
            }
          }
        );
        console.log('categoryListName');
        console.log(this.categoryListName,this.categoryListId);

      });
      this.search(1);
      // this.findAllRoles();
    }
  };
</script>
<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-button+.el-button{
    margin-left: 2px;
  }
  .el-button--default:hover{
    color: #00a16c;
    border: 1px solid#00a16c;
    background: white;
  }
  .footor{
    margin:10px 30px;
    width: 90%;
    text-align: right;
  }
</style>

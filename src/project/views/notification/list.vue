<template>

  <el-row>
    <el-col  style="margin:10px 1%;width: 98%;">
      <el-tabs type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="短信推送">
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
                <el-button  icon="el-icon-plus"  type="primary" @click="toCreate">新建</el-button>
                <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>
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
                @selection-change="handleSelectionChange"
                @row-dblclick="handleRowClick"
                @sort-change="handleSortChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="消息标题"
                >
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="toDetail(scope.row)"
                      type="text"
                      size="small">
                      {{scope.row.title}}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createAt"
                  label="创建时间"
                  sortable
                >
                </el-table-column>

              </el-table>
            </el-col>
            <!--    新建-->
            <i-create
              :messageType="messageType"
              :dialog-visible="createProps.visible"
              @on-dialog-close="handleClose"
              @on-save-success="handleSaveSuccess"
            />



          </el-row>
        </el-tab-pane>
        <el-tab-pane label="APP内消息中心推送">
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
                <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="toCreate">新建</el-button>
                <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>
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
                @selection-change="handleSelectionChange"
                @row-dblclick="handleRowClick"
                @sort-change="handleSortChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column

                  label="消息标题"
                >
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="toDetail(scope.row)"
                      type="text"
                      size="small">
                      {{scope.row.title}}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createAt"
                  label="创建时间"
                  sortable
                >
                </el-table-column>

              </el-table>
            </el-col>
            <!--    新建-->
            <i-create
              :messageType="messageType"
              :dialog-visible="createProps.visible"
              @on-dialog-close="handleClose"
              @on-save-success="handleSaveSuccess"
            />



          </el-row>
        </el-tab-pane>
        <el-tab-pane label="通知栏推送">
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
                <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="toCreate">新建</el-button>
                <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>
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
                @selection-change="handleSelectionChange"
                @row-dblclick="handleRowClick"
                @sort-change="handleSortChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column

                  label="消息标题"
                >
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="toDetail(scope.row)"
                      type="text"
                      size="small">
                      {{scope.row.title}}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createAt"
                  label="创建时间"
                  sortable="custom"
                >
                </el-table-column>

              </el-table>
            </el-col>
            <!--    新建-->
            <i-create
              :messageType="messageType"
              :dialog-visible="createProps.visible"
              @on-dialog-close="handleClose"
              @on-save-success="handleSaveSuccess"
            />

            <!--    &lt;!&ndash;    编辑&ndash;&gt;-->
            <!--    <i-edit-->
            <!--      :dialog-visible="editProps.visible"-->
            <!--      :edit-id="editId"-->
            <!--      @on-dialog-close="handleClose"-->
            <!--    />-->


          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>

</template>
<script>
  import Search from "@/framework/components/search";
  import ICreate from "./create"
  import {post} from "@/framework/http/request";
  import Emitter from '@/framework/mixins/emitter'
  import {search, count, del, enable, disable} from '@/project/service/notificationPacket'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "notificationPacket",
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
        sort: {asc: [], desc: ['id']},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        messageType:'sms',
        searchItems: [
          {
            name: "标题",
            key: "title",
            type: "string"
          },
          {
            name: "创建时间",
            key: "createAt",
            type: "datetimerange"
          }
        ]
      };
    },
    computed: {
      route() {
        return this.$route;
      }
    },
    components: {
      Search,ICreate
    },
    methods: {
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
      handleSortChange(sort) {
        let order = sort.order;
        if (order === 'ascending'){
          this.sort = {
            asc:[sort.prop]
          }
        } else {
          this.sort = {
            desc:[sort.prop]
          }
        }
        this.search(1);
      },
      searchBySearchItem(searchItems) {
        let keys = [];
        for (
          let i = 0,searchItemList = this.searchItems,len = searchItemList.length;
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
        //有时间段搜索进行转化字段
        if (this.extraParam.createAt) {
          this.extraParam.startCreateAt = this.extraParam.createAt[0];
          this.extraParam.endCreateAt = this.extraParam.createAt[1];
          delete this.extraParam.createAt;
        }else {
          delete this.extraParam.startCreateAt;
          delete this.extraParam.endCreateAt;
        }
        this.search(1);
      },
      toCreate() {
        this.createProps.visible = true;
      },
      search(page) {
        let _t = this;
        _t.page = page;
        _t.extraParam.channel = this.messageType;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
            sort: _t.sort
          },
          [this.model]: _t.extraParam
        };
        search(param, res => {
          let data = res;
          _t.data = data;
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        let param = {[this.model]: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      handleTransportSelectList(list) {
        this.selectList = list;
      },
      //批量删除
      batchDelete() {
        this.broadcast("SiTable", "on-get-selectList");
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
            del({ids: ids}, res => {
              _t.search(_t.page);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        });
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
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
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
      handleSelectionChange(val) {
        this.selectList = val;
      },
      handleRowClick(row) {
        // this.editId = row.id;
        // this.createProps.visible = true;
      },
      toDetail(row) {
        this.$router.push({path: '/notification/show/' + row.id})
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
            this.editProps.visible = true;
            break;
          case '启用':
            console.log('启用');
            this.batchEnable();
            break;
          case '禁用':
            console.log('禁用')
            this.batchDisable();
            break;
        }
      },
      handleTabClick(val){
        this.messageType = val.label;
        if (val.label === '短信推送') {
          this.messageType = 'sms'
        } else if (val.label === 'APP内消息中心推送') {
          this.messageType = 'inside'
        } else if (val.label === '通知栏推送') {
          this.messageType = 'push'
        }
        this.search(this.page);
      },
      handleSaveSuccess(){
        this.createProps.visible = false;
        this.search(this.page);
      }
    },
    mounted() {
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

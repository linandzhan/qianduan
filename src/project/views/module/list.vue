<template>
  <div class="moduleBox">
    <div class="tree">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="后台" style="height: 95%" name="console">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="consoleFilterText"
            style="margin-bottom: 20px;width: 150px"
          >
          </el-input>
          <el-button type="primary" style="margin-bottom: 10px" @click="handleCreate">添加</el-button>
          <el-tree
            v-loading="loading" element-loading-spinner="el-icon-loading"
            :data="data"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            :filter-node-method="consoleFilterNode"
            ref="consoleTree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <i class="el-icon-circle-plus-outline" @click="() => handleCreate(data)"></i>
          <i class="el-icon-edit" @click="() => handleEdit(data)"></i>
          <i class="el-icon-delete" @click="() => showDeleteTips(node, data)"></i>
        </span>
      </span>
          </el-tree>
        </el-tab-pane>
       <!-- <el-tab-pane label="app" name="app">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            style="margin-bottom: 20px;width: 150px"
          >
          </el-input>
          <el-button type="primary" style="margin-bottom: 10px" @click="handleCreate">添加</el-button>
          <el-tree
            v-loading="loading1" element-loading-spinner="el-icon-loading"
            :data="appData"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            :filter-node-method="filterNode"
            ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <i class="el-icon-circle-plus-outline" @click="() => handleCreate(data)"></i>
          <i class="el-icon-edit" @click="() => handleEdit(data)"></i>
          <i class="el-icon-delete" @click="() => showDeleteTips(node, data)"></i>
        </span>
      </span>
          </el-tree>
        </el-tab-pane> -->
      </el-tabs>
      <!--      <el-button type="primary" style="margin-bottom: 10px" @click="consoleFindByTypeAndClient">后台</el-button>-->
      <!--      <el-button type="primary" style="margin-bottom: 10px" @click="appFindByTypeAndClient">app</el-button>-->


    </div>
    <div class="content">
      <el-row>
        <!--        <el-col :span="24">-->
        <!--          <div style="width: 95%;margin: 20px auto;">-->
        <!--            <el-button type="primary" @click="handleCreatePermission">添加权限</el-button>-->
        <!--          </div>-->
        <!--        </el-col>-->
        <el-col :span="24">
          <el-card style="margin: 10px">
            <div slot="header">{{moduleName}}</div>
            <!--          按钮与分页-->
            <el-col :span="24">
              <div style="width: 95%;margin: 20px auto;">
                <el-button type="primary" @click="handleCreatePermission">添加权限</el-button>
              </div>
            </el-col>

            <!--          表格-->
            <el-col :span="24">
              <div style="margin:0 0 10px 0;">
                <el-table
                  :data="tableData"
                  v-loading="tableLoading"
                  element-loading-spinner="el-icon-loading"
                  style="width: 95%;margin:0 auto;"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <!--            <el-table-column-->
                  <!--              prop="id"-->
                  <!--              label="id"-->
                  <!--            >-->
                  <!--            </el-table-column>-->

                  <el-table-column
                    prop="path"
                    label="接口"
                  >
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                      <el-button type="text" @click.stop="deletePermission(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>

          </el-card>

        </el-col>
        <i-edit
          :dialog-visible="editProps.visible"
          :edit-id="editId"
          @on-dialog-close="handleClose"
          @on-save-success="handleSuccess"
        />
        <i-create
          :dialog-visible="createProps.visible"
          :edit-id="editId"
          @on-dialog-close="handleClose"
          @on-save-success="handleSuccess"
        />
        <i-permission
          :dialog-visible="createPermissionProps.visible"
          :edit-id="editId"
          @on-dialog-close="handleClose"
          @on-createPermission-success="handleCreatePermissionSuccess"
        />
      </el-row>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <div style="width: 100%;height: 50px;background: #ffe6e6;border: 1px solid #c82929;margin: 10px auto;">
          <div style="line-height: 50px;margin-left: 20px">
            <i class="el-icon-warning" style="color: #e47475;font-size: 18px"></i>
            <span style="color: #c82929;display: inline-block;margin-left: 10px;font-size: 18px">确认删除所选记录吗？</span>
          </div>
        </div>
        <div slot="footer" style="text-align: center">
          <el-button type="primary" @click="remove">确认</el-button>
          <el-button type="info" @click="dialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  let id = 1000;
  import {findByTypeAndClient, deleteById, removePermission} from '@/project/service/module'
  import {findPermissionList} from "@/project/service/permission";
  import ICreate from "./create"
  import IEdit from "./edit"
  import IPermission from "./createPermission"

  export default {
    data() {
      return {
        dialogVisible:false,
        moduleName: '请选择模块',
        tableLoading: false,
        activeName: "console",
        moduleId: 0,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        createProps: {
          visible: false
        },
        editProps: {
          visible: false
        },
        createPermissionProps: {
          visible: false
        },
        isCreate: false,
        isPermission: false,
        isEdit: false,
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        tableData: [],
        filterText: '',
        consoleFilterText: '',
        editId: null,
        data: [],
        appData: [],
        loading: true,
        deleteData:null,
        loading1:true,
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      consoleFilterText(val) {
        console.log(val)
        this.$refs.consoleTree.filter(val);
      },
      activeName(val) {
        this.moduleName = '请选择模块'
        this.tableData = []
      }
    },
    components: {
      ICreate, IEdit, IPermission
    },
    methods: {
      deletePermission(id) {
        let param = {
          module: {
            id: this.moduleId
          },
          permission: {
            id: id
          }
        }
        removePermission(param, res => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          findPermissionList({module: {id: this.moduleId}}, res => {
            this.tableData = res
          })
        })

      },
      handleClick(tab) {
        if (this.activeName == "console") {
          // this.consoleFindByTypeAndClient()
        } else {
          // this.appFindByTypeAndClient()
        }
      },
      handleSuccess() {
        this.editProps.visible = false;
        this.createProps.visible = false;
        if (this.activeName == "console") {
          this.consoleFindByTypeAndClient()
        } else {
          this.appFindByTypeAndClient()
        }
      },
      handleCreatePermissionSuccess() {
        this.createPermissionProps.visible = false;
        findPermissionList({module: {id: this.moduleId}}, res => {
          this.tableData = res
        })
      },
      handleCreatePermission() {
        this.isPermission = true
        this.createPermissionProps.visible = true;
      },
      handleEdit(data) {
        console.log(data)
        this.editId = data.id
        this.isEdit = true
        this.editProps.visible = true;
      },
      handleCreate(data) {
        console.log(data)
        this.editId = data.id
        this.isCreate = true
        this.createProps.visible = true;
      },
      handleNodeClick(data) {
        this.tableLoading = true
        console.log(data);
        this.editId = data.id
        this.moduleId = data.id
        this.moduleName = data.name
        findPermissionList({module: {id: data.id}}, res => {
          this.tableData = res
          this.tableLoading = false
        })
      },
      handleClose() {
        this.createProps.visible = false;
        this.editProps.visible = false;
        this.createPermissionProps.visible = false;
        this.isPermission = false
        this.isEdit = false
        this.isCreate = false
      },
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
            sort: _t.sort
          },
          [this.model]: _t.extraParam
        };
        if (
          param.pageable.sort.asc.length === 0 &&
          param.pageable.sort.desc.length === 0
        ) {
          delete param.pageable.sort;
        }
        // search(param, res => {
        //   let data = res;
        //   _t.data = data;
        //   _t.getTotal();
        // });
      },
      getTotal() {
        let _t = this;
        let param = {[this.model]: _t.extraParam};
        // count(param, res => {
        //   _t.total = parseInt(res);
        // });
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
            let ids = []
            this.selectList.forEach(v => {
              ids.push(v.id)
            })
            del({ids: ids}, res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            });

          }).catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });
          });
        });
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      filterNode(value, data) {
        console.log(value, data)
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      consoleFilterNode(value, data) {
        console.log(value, data)
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      append(data) {
        const newChild = {id: id++, label: 'testtest', children: []};
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      showDeleteTips(node, data){
        this.dialogVisible = true
        this.deleteData = data
        // this.remove(node, data)
      },
      remove() {
        let that = this
        // that.$confirm(`确定删除选中内容？`, '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        let params = {
          id:this.deleteData.id
        }
          deleteById(params, res => {
            // that.$message.success('删除成功');
            if (this.activeName == 'console') {
              that.consoleFindByTypeAndClient()
            } else {
              that.appFindByTypeAndClient()
            }
            that.moduleName = '请选择模块'
            that.dialogVisible = false
          })
        // }).catch(() => {
        //   that.$message({
        //     type: 'info',
        //     message: `已取消删除`
        //   });
        // });

      },
      consoleFindByTypeAndClient() {
        findByTypeAndClient({type: "Manager", client: "web"}, res => {
          console.log(res)
          this.data = res
          this.loading = false
        })
      },
      appFindByTypeAndClient() {
        findByTypeAndClient({type: "employee", client: "app"}, res => {
          console.log(res)
          this.appData = res
          this.loading1 = false
        })
      }
    },
    mounted() {
      this.consoleFindByTypeAndClient()
      // this.appFindByTypeAndClient()
      // this.search(1);
    }
  };
</script>

<style>
  .moduleBox {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .tree {
    margin-top: 10px;
    margin-left: 10px;
    width: 270px;
    height: 100%;
    overflow: auto;
    /*border-bottom: 1px solid #eee;*/
  }

  .tree::-webkit-scrollbar {
    display: none;
  }

  .content {
    width: 85%;
    height: 95%;
    margin-right: 20px;
    /*padding: 20px;*/
  }
</style>

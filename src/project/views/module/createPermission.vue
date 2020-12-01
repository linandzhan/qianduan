<template>
  <el-dialog
    title="编辑信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">
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
    <el-col :span="24">
      <el-table
        :data="tableData"
        style="width: 95%;margin:10px auto;"
        @selection-change="handleSelectionChange"
        highlight-current-row
        @current-change="selectOneRow"
      >
<!--        <el-table-column-->
<!--          type="selection"-->
<!--          width="55">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="path"
          label="接口">
        </el-table-column>
        <el-table-column
          label="选择权限"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="selectPermission(scope.row.id)"
              type="text"
              size="small">
             选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <div slot="footer" class="dialog-footer" style="text-align: center">
<!--      <el-button type="primary" @click="handleConfirm">确 定</el-button>-->
<!--      <el-button type="info" @click="handleClose">取 消</el-button>-->
    </div>
  </el-dialog>
</template>

<script>
  import Search from "@/framework/components/search";
  import Upload from "@/framework/components/upload";
  import {search,count} from '@/project/service/permission'
  import {addper} from '@/project/service/module'
  import emitter from "@/framework/mixins/emitter"
  export default {
    name: "edit",
    mixins:[emitter],
    components: {
      Upload,Search
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
      editId: {
        type: Number,
        default: 0
      },
      isPermission: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        searchItems: [
          {
            name: "接口",
            key: "path",
            type: "string"
          },
        ],
        extraParam: {},
        selectList: null,
        tableData: [],
        pageSize: 10,
        page: 1,
        total: 0,
        model: 'permission',
        formValidate: {
        },
        ruleValidate: {
          name: [
            {required: true, message: "模块名称不能为空", trigger: "blur"}
          ],
        },
      }
    },
    computed: {},
    watch: {
      dialogVisible(val) {
        if(val == true){
          this.search(1)
        }
      }
    },
    methods: {
      selectPermission(id){
        let params={
          module:{
            id:this.editId,
          },
          permission:{
            id:id
          }
        }
        addper(params,res=>{
          console.log(res)
          this.$emit('on-createPermission-success');
        })
      },
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
        this.search(1);
      },
      selectOneRow(row){
        console.log(row)
        this.selectList = row
      },
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
          },
          permission: _t.extraParam
        };
        search(param, res => {
          let data = res;
          _t.tableData = data;
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
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      },
      handleSelectionChange(val) {
        this.selectList = val;
        console.log(this.selectList)
      },
      handleRowClick(row) {
        this.editId = row.id;
        this.editProps.visible = true;
      },
      handleClose() {
        this.isPermission = false
        this.$emit('on-dialog-close');
      },
      handleConfirm(){
        if(this.editId == 0){
        }else {
          let params={
            module:{
              id:this.editId,
            },
            permission:{
              id:this.selectList.id
            }
          }
          addper(params,res=>{
            console.log(res)
            this.$emit('on-createPermission-success');
          })
        }

      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <el-dialog
    title="选择用户以及推送时间"
    :visible.sync="userVisible"
    :modal-append-to-body='false'
    :append-to-body="true"
    width="50%"
    :before-close="handleClose">
    <el-col :span="24" style="margin-left: 15px;">
      <span>推送时间：</span>
      <el-radio v-model="radio" label="1">立即推送</el-radio>
      <el-radio v-model="radio" label="2">定时推送</el-radio>
      <el-date-picker
        v-model="formValidate.sendAt"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间"
        v-if="radio == 2"
      >
      </el-date-picker>
    </el-col>
    <el-col :span="24" style="margin-left: 15px;margin-top: 10px;">
      <span>推送对象：</span>
      <el-radio v-model="formValidate.accountType" label="all">全部用户</el-radio>
      <el-radio v-model="formValidate.accountType" label="many">指定用户</el-radio>
    </el-col>
    <div v-if="formValidate.accountType === 'many'">
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="searchItems"
          @on-search="searchBySearchItem"
        ></search>
      </el-col>
      <div class="pager-group">

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes,jumper,prev,next"
          :total="total">
        </el-pagination>
      </div>
      <el-table
        :data="data"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
        >
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
      <el-button type="info" @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {search, count} from '../user/user-service'
  import {batchSave} from './notification-service'
  import Search from "@/framework/components/search";
  export default {
    name: "addUser",
    props: {
      userVisible: {
        type: Boolean,
        default: false,
      }
    },
    components:{
      Search
    },
    data() {
      return {
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        model: 'store',
        extraParam:{},
        data:[],
        searchItems: [
          {
            name: "手机号",
            key: "phone",
            type: "string"
          },
          {
            name: "昵称",
            key: "name",
            type: "string"
          }
        ],
        radio:'',
        formValidate:{

        },
        selection:[]
      }
    },
    created() {
      this.search(1);
    },
    methods: {
      searchBySearchItem(searchItems) {
        this.extraParam = searchItems;
        this.search(1);
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
      handleClose() {
        this.$emit('on-dialog-close');
      },
      handleConfirm() {
        let idList = this.selection.map(s => {
          return s.id
        });
        if (this.radio) {
          this.$message.error('不能为空');
          return;
        } else if (this.formValidate.accountType) {
          this.$message.error('不能为空');
          return;
        }
        batchSave(
          {
            accountType : this.formValidate.accountType,
            notificationPacketId : this.$route.params.id,
            sendAt : this.formValidate.sendAt,
            accountIdList:idList
          },res => {
            this.$message.success('添加成功');
            this.formValidate = {};
            this.$emit('on-save-success');
          }
          )
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this.search(this.page);
      },
      handleSelectionChange(selection){
        this.selection = selection;
      },
      //批量删除
      batchDelete() {
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
      selectAll(){
        this.data.forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(item);
        })
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div>
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
        <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                   @click="toCreate">添加推送人
        </el-button>
        <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="cancelAll">全部取消</el-button>
        <el-button icon="el-icon-delete" @click="batchDelete">取消</el-button>
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
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
        >
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="推送时间"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="cancel(scope.row)"
              type="text"
              size="small">
              取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import {
    findByNotificationPacketIdAndStatus,
    countByNotificationPacketIdAndStatus,
    batchCancel,
    cancelAll
  } from './notification-service'

  export default {
    name: "pending",
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    components: {
      Search
    },
    data() {
      return {
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        model: 'notification',
        extraParam: {},
        data: [],
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
        selectList: []
      }
    },
    created() {
      // this.search(1);
      // this.findByNotificationPacketId();
      this.findByNotificationPacketIdAndStatus();
      this.$root.$on(`on-notification-refresh`, () => {
        this.findByNotificationPacketIdAndStatus();
      })
    },
    methods: {
      searchBySearchItem(searchItems) {
        this.extraParam = searchItems;
        this.findByNotificationPacketIdAndStatus(1);
      },
      search(page) {
        let _t = this;
        _t.page = page;
        _t.extraParam.status = 'pending';
        _t.extraParam.notificationPacketId = parseInt(this.id);
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
      findByNotificationPacketIdAndStatus() {
        let _t = this;
        findByNotificationPacketIdAndStatus(
          {
            notificationPacketId: this.$route.params.id,
            status: 'pending',
            pageable: {
              page: this.page,
              size: this.pageSize,
            }
          }, res => {
            this.data = res;
            this.countByNotificationPacketIdAndStatus();
          })
      },
      countByNotificationPacketIdAndStatus() {
        let _t = this;
        countByNotificationPacketIdAndStatus(
          {
            notificationPacketId: this.$route.params.id,
            status: 'pending',
            pageable: {
              page: this.page,
              size: this.pageSize,
            }
          }, res => {
            _t.total = parseInt(res);
          })
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

      },
      handleCurrentChange(val) {
        this.page = val;
        this.findByNotificationPacketIdAndStatus();
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this.findByNotificationPacketIdAndStatus();
      },
      handleSelectionChange(selection) {
        this.selectList = selection;
        console.log(this.selection);
      },
      //批量删除
      batchDelete() {
        const _t = this;
        let selectList = this.selectList;
        if (selectList.length === 0) {
          this.$notify.warning({
            title: "至少选择一条数据"
          });
          return;
        }
        let idList = selectList.map(s => {
          return s.id
        });
        this.$confirm('确定删除所选记录吗?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchCancel({idList: idList}, res => {
            _t.findByNotificationPacketIdAndStatus();
            this.$message({
              type: 'success',
              message: '取消成功!'
            });
            this.$root.$emit(`on-notification-refresh`);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      toCreate() {
        this.$emit('add-user');
      },
      cancel(row) {
        batchCancel({idList: [row.id]}, res => {
          this.$message.success('取消成功');
          this.findByNotificationPacketIdAndStatus();
          this.$root.$emit(`on-notification-refresh`);
        })
      },
      cancelAll() {
        cancelAll({
          notificationPacketId: this.$route.params.id
        }, res => {
          this.$message.success('取消成功');
          this.findByNotificationPacketIdAndStatus();
          this.$root.$emit(`on-notification-refresh`);
        })
      }
    }
  }
</script>

<style scoped>

</style>

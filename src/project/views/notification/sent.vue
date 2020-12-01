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
                   @click="reSentAll">全部重发
        </el-button>
        <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                   @click="batchReSent">批量重发
        </el-button>
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
              @click.native.prevent="reSent(scope.row)"
              type="text"
              size="small">
              重发
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
  import {search, count} from '../user/user-service'
  import Search from "@/framework/components/search";
  import {
    batchReSend,
    reSendAll,
    findByNotificationPacketIdAndStatus,
    countByNotificationPacketIdAndStatus
  } from './notification-service'

  export default {
    name: "sent",
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
        selectList:[],
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
      }
    },
    created() {
      // this.search(1);
      this.findByNotificationPacketIdAndStatus();
      this.$root.$on(`on-notification-refresh`, () => {
        this.findByNotificationPacketIdAndStatus();
      })
    },
    methods: {
      searchBySearchItem(searchItems) {
        this.extraParam = searchItems;
        this.findByNotificationPacketIdAndStatus();
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
      findByNotificationPacketIdAndStatus() {
        let _t = this;
        findByNotificationPacketIdAndStatus(
          {
            notificationPacketId: this.$route.params.id,
            status: 'sent',
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
            status: 'sent',
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
      handleSelectionChange(selection) {
        this.selectList = selection;
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this.findByNotificationPacketIdAndStatus();
      },
      //批量重发
      batchReSent() {
        let _t = this;
        this.$nextTick(() => {
          let selectList = this.selectList;
          if (selectList.length === 0) {
            this.$notify.warning({
              title: "至少选择一条数据"
            });
            return;
          }
          let idList = selectList.map(s => s.id);
          this.$confirm('确定重发所选记录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            batchReSend({idList: idList, sendAt: this.getFormatDate()}, res => {
              _t.findByNotificationPacketIdAndStatus();
              this.$root.$emit(`on-notification-refresh`);
              this.$message({
                type: 'success',
                message: '重发成功!'
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
      reSent(row) {
        batchReSend({
          idList: [row.id],
          sendAt: this.getFormatDate(),
        }, res => {
          this.$message.success('重发成功');
          this.findByNotificationPacketIdAndStatus();
          this.$root.$emit(`on-notification-refresh`);
        })
      },
      reSentAll() {
        reSendAll({
          notificationPacketId: this.$route.params.id,
          sendAt:this.getFormatDate()
        }, res => {
          this.$message.success('重发成功');
          this.findByNotificationPacketIdAndStatus();
          this.$root.$emit(`on-notification-refresh`);
        })
      },
      getFormatDate() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let second = date.getSeconds();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
        }
        if (min >= 0 && min <= 9) {
          min = "0" + min;
        }
        if (second >= 0 && second <= 9) {
          second = "0" + second;
        }
        let currentDate = date.getFullYear() + "-" + month + "-" + strDate
          + " " + hour + ":" + min + ":" + second;
        return currentDate;
      },
      toCreate() {
        this.$emit('add-user');
      }
    }
  }
</script>

<style scoped>

</style>

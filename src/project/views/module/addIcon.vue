<template>
  <el-dialog
    title="编辑信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    append-to-body
    :before-close="handleClose">
    <el-col :span="24">
      <el-table
        :data="tableData"
        style="width: 95%;margin:10px auto;"
      >
<!--        <el-table-column-->
<!--          type="selection"-->
<!--          width="55">-->
<!--        </el-table-column>-->
        <el-table-column
          label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" @click.stop="selectIcon(scope.row.icon)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
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
    <div slot="footer" class="dialog-footer" style="text-align: center">
<!--      <el-button type="primary" @click="handleConfirm('formValidate')">确 定</el-button>-->
<!--      <el-button type="info" @click="handleClose">取 消</el-button>-->
    </div>
  </el-dialog>
</template>

<script>

  import {addper} from '@/project/service/module'
  import emitter from "@/framework/mixins/emitter"
  const iconList = require("@/framework/layout/iconList.json")
  export default {
    name: "addIcon",
    mixins:[emitter],
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        selectList: null,
        tableData: [],
        pageSize: 10,
        page: 1,
        total: iconList.length,
        select:'',
      }
    },
    computed: {},
    watch: {
      dialogVisible(val) {
        if(val == true){

        }
      }
    },
    mounted() {
      this.search(1)
    },
    methods: {
      search(page){
        let index = (page * this.pageSize) -1
        this.tableData = iconList.slice(index,index+this.pageSize)
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page)
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page)
      },
      selectIcon(icon){
        this.select = icon
        this.$message.success('选择成功');
        this.$emit('on-addIconDialog-success',this.select);
      },
      handleClose() {
        this.$emit('on-addIconDialog-close');
      },
      handleConfirm(){
      }
    }
  }
</script>

<style scoped>

</style>

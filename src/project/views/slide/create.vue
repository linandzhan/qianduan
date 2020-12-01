<template>
  <el-dialog
    title="广告管理"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="60%"
    :before-close="handleClose">


    <div style="overflow: auto;height:40vh;padding: 10px 0 40px;">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
      </el-steps>
      <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px" v-show="active === 1">
        <el-form-item label="广告位" prop="location">
          <el-select v-model="formValidate.location" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告标题" prop="title">
          <el-input v-model="formValidate.title" placeholder="输入标题"></el-input>
        </el-form-item>
        <el-form-item label="广告图片" prop="image">
          <upload
            @on-transport-file-list="handleTransportFileList($event,'background')"
            :max-size="5120"
			type="file"
            :limit="1"
          >
          </upload>
        </el-form-item>
        <el-form-item label="开始时间" prop="effectAt">
          <el-date-picker
            v-model="formValidate.effectAt"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="expireAt">
          <el-date-picker
            v-model="formValidate.expireAt"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="排序数字" prop="position">
          <el-input-number size="small" v-model="formValidate.position" style="width: 200px"></el-input-number>
        </el-form-item>
      </el-form>
      <el-form v-show="active === 2">
          <el-form-item label="广告类型" >
            <el-select v-model="typeValue"  placeholder="请选择" @change="changeType">
              <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外部链接" prop="link" v-if="formValidate.type === 'http'">
            <el-input v-model="formValidate.link" placeholder="输入链接"></el-input>
          </el-form-item>
          <goods @on-select-id="onSelectId" v-if="formValidate.type === 'object' && typeValue === '商品详情'">

          </goods>
      </el-form>

    </div>
    <div slot="footer" class="dialog-footer">

      <el-button type="info" @click="pre" v-if="active === 2">上一步</el-button>
      <el-button type="info" @click="next" v-if="active === 1">下一步</el-button>
      <el-button type="primary" @click="handleConfirm('formValidate')" v-if="active === 2">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import Editor from "@/framework/components/editor"
  import Upload from "@/framework/components/upload";
  import Search from "@/framework/components/search";
  import goods from './goods'
  import {save} from './slide-service';
  import {search, count} from "@/project/service/store"
  import emitter from "@/framework/mixins/emitter";

  export default {
    name: "dialog",
    mixins:[emitter],
    components: {
      Upload, Editor, Search,goods
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
      messageType: {
        type: String,
        default: '短信推送'
      }
    },
    directives: {
      required: {
        inserted: function (el) {
          console.log(el.children)
          el.children[0].addEventListener('blur', function (event) {
            if (el.value == '' || el.value == null) {
              el.children[0].style.border = "1px solid red";
              console.log('我不能为空');
            };
          });
        }
      }
    },

    data() {
      return {
        num: 1,
        typeValue: '',
        type: [{
          value: '外部链接',
          label: '外部链接'
        }, {
          value: '商品详情',
          label: '商品详情'
        }],
        options: [
          {
            value: '首页banner图',
            label: '首页banner图'
          }, {
            value: '商城banner图',
            label: '商城banner图'
          }, {
            value: '直播banner图',
            label: '直播banner图'
          }],
        value: '',
        formValidate: {
          location: '',
          title: '',
          image: '',
          effectAt: '',
          expireAt: '',
          position: 0,
          link:'',
          status:'启用'
        },
        ruleValidate: {
          location: [{required: true, message: '不能为空', trigger: 'change'}],
          title: [{required: true, message: '不能为空', trigger: 'blur'}],
          image: [{required: true, message: '不能为空'}],
          effectAt: [{required: true, message: '不能为空', trigger: 'blur'}],
          expireAt: [{required: true, message: '不能为空', trigger: 'blur'}],
          position: [{required: true, message: '不能为空', trigger: 'blur'}],
        },
        model: 'slide',
        active: 1,
        data: [],
        page: 1,
        pageSize: 10,
        total: 0,
        sort: {asc: [], desc: ['id']},
        extraParam: {},
        searchItems: [
          {
            name: "手机号",
            key: "phone",
            type: "string"
          },
          {
            name: "最近登录时间",
            key: "accessAt",
            type: "daterange",
          },
          {
            name: "状态",
            key: "status",
            type: "select",
            displayValue: ["禁用", "启用"],
            value: ["禁用", "启用"]
          }
        ],
        model:'slide'
      }
    },
    methods: {
      handleClose() {
        this.$emit('on-dialog-close');
      },
      handleConfirm(name) {
        this.broadcast("SiUpload", "on-form-submit", () => {
        });
        this.$nextTick(() => {
          this.$refs[name].validate(valid => {
            if (valid) {
              save({
                [this.model]: this.formValidate,
              }, res => {
                this.$notify.success('添加成功');
                this.$emit('on-save-success');
              })
            }
          });
        });

      },
      handleTransportFileList(fileList) {
        if (fileList.length > 0) {
          let arr = []
          fileList.forEach(item => {
            arr.push(item.response.data);
          });
          this.formValidate.image = arr.join(';');
        } else {

        }

      },
      pre() {
        this.active--;
      },
      next() {
        this.active++;
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this.search(this.page);
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
          user: _t.extraParam
        };
        if (
          param.pageable.sort.asc.length === 0 &&
          param.pageable.sort.desc.length === 0
        ) {
          delete param.pageable.sort;
        }
        search(param, res => {
          let data = res;
          _t.data = data;
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        let param = {user: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      onChangeEditor(val) {
        this.formValidate.contet = val.html;
      },
      changeType(val) {
        this.formValidate.link = '';
        if (val === '外部链接') {
          this.formValidate.type = 'http';
        } else {
          this.formValidate.type = 'object';
        }
      },
      onSelectId(id) {
        switch (this.typeValue) {
          case "商品详情":
            this.formValidate.link = `Goods:${id}`;
            break;
        }
      },
    }
  }
</script>

<style scoped>

</style>

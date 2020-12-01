<template>
  <div style="position: relative">
    <quill-editor
      style="height: 100%;width: 100%;"
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <input type="file" id="imgInput" @change="onChange($event)">
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { post } from '@/framework/http/request'
const Font = Quill.import("formats/font");
Font.whitelist = ["Arial", "宋体", "黑体", "微软雅黑"];
Quill.register(Font, true);
export default {
  name: "SiEditor",
  props: {
    editable: { type: Boolean, default: true },
    defaultContent: {
      type: String,
      default: ""
    },

  },
  data() {
    return {
      content: this.defaultContent,
      editor: null,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [
              {
                font: ["Arial", "宋体", "黑体", "微软雅黑"]
              }
            ],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        },
        placeholder: "请输入"
      }
    };
  },
  components: {
    quillEditor
  },
  mounted(){
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
  },
  watch: {
    editable(flag) {
      this.editor.enable(flag);
    },
    defaultContent(content) {
      this.content = content;
    }
  },
  methods: {
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorReady(editor) {
      this.editor = editor;
      this.$on("on-form-submit", () => {
        this.$emit("on-transport-editor-content", this.content);
      });
    },
    onEditorChange(editor) {
      // console.log(editor);
      this.$emit('on-change-content',editor);
    },
    /**
     * @Description: 主要是把服务器图片代替base64
     * @author Zd Lin
     * @date 2020/3/22/022
    */
    // 点击图片ICON触发事件
    imgHandler(state) {
      console.log(state)
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      if (state) {
        // let fileInput = document.getElementById('imgInput')
        // fileInput.click() // 加一个触发事件
        // 选择并上传一张图片
        let fileInput = document.getElementById('imgInput')
        fileInput.click() // 加一个触发事件
      }
    },
    onChange(ev){
      let file = ev.target.files[0];
      let param = new FormData();
      param.append('file',file);
      post('api/attachment/upload',param,res => {
        let url = this.$store.state.prefix + res;
        this.content = this.$refs.myQuillEditor.quill.getSelection();
        // 调用编辑器的 insertEmbed 方法，插入URL
        this.$refs.myQuillEditor.quill.insertEmbed(this.content !== null ? this.content.index : 0, 'image', url, Quill.sources.USER)
        console.log(url);
        console.log(this.content);

      })
    }
  }
};
</script>

<style lang="less">
  #imgInput{
    opacity: 0;
  }
</style>

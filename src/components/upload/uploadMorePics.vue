<template>
    <div>
      <el-upload :file-list="morePics" class="upload-demo" action="/store/upload.ajax" list-type="picture" :auto-upload="false" :before-upload="handleBefore" :on-success="handleSuccess" :on-remove="handleRemove" multiple :limit="5" :on-exceed="handleExceed">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-dialog title="对不起" :visible.sync="DialogVisible" width="30%" :before-close="otherHandleClose">
        <span>您所上传的图片中有大小超出2MB的图片，请您更换图片。</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="DialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="DialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data(){
    return {
//    上传图片的路径
      picUrlArr:[],
//    判断上传图片大小的文字提示框
      DialogVisible: false,
//    判断上传图片大小的按钮
      otherBtn: true,
      //        图片上传地址
      actionUrl:'',
    }
  },
  props:{
    theAction:{
      type:String,
      default:''
    },
    morePics:{
      type:Array,
      default:[]
    }
  },
  created(){
    this.actionUrl = this.theAction;
  },
  methods:{
    handleBefore(file) {
      if(file.size > 2097152){
        this.DialogVisible = true;
        return false;
      }else{
        console.log("上传成功")
      }
    },
    handleSuccess(response, file, fileList) {
      console.log(fileList)
//      console.log(response.data)
      this.picUrlArr.push(response.data);
      this.$emit("getMorePic",this.picUrlArr);
    },
    handleRemove(file, fileList) {
				console.log(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
//    点击图片大于2M的文字提示框的关闭按钮的钩子函数
    otherHandleClose() {
      this.DialogVisible = false;
    },
  }
}
</script>

<style>

</style>

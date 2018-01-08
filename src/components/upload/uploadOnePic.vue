<template>
  <div>
    <el-upload :file-list="onePic" class="upload-demo" :limit="1" list-type="picture" :action="actionUrl" :before-upload="handleBefore" :on-success="handleSuccess" :on-remove="handleRemove" :on-exceed="handleExceed">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传1张jpg/png文件，且不超过2MB</div>
    </el-upload>

    <el-dialog title="对不起" :visible.sync="DialogVisible" width="30%" :before-close="handleClose">
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
        picUrl:'',
//    图片上传地址
        actionUrl:'',
        DialogVisible:false
      }
    },
    props:{
      theAction:{
        type:String,
        default:''
      },
      onePic:{
        type:Array,
        default:[]
      }
    },
    created(){
      this.actionUrl = this.theAction;
    },
    methods:{
      //文件上传之前   如大于2M 就会执行移除文件的方法
      handleBefore(file) {
        if(file.size > 2097152){
          this.DialogVisible = true;
          return false;
        }else{
          console.log("上传成功");
        }
      },
      //上传成功调用的函数
      handleSuccess(response, file, fileList) {
        this.picUrl = response.data
//        console.log(this.picUrl)
        this.$emit("getOnePic",this.picUrl);
      },
      //移除文件调用的函数
      handleRemove(file, fileList) {
        console.log('删除图片成功');
//        console.log(fileList);
      },
      //上传文件个数超过限制调用的函数
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
//    点击图片大于2M的文字提示框的关闭按钮的钩子函数
      handleClose() {
        this.DialogVisible = false;
      }
    }
  }
</script>

<style>

</style>

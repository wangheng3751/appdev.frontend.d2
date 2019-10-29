<template>
  <el-form ref="editform" :rules="rules" :model="form" label-width="100px">
    <el-form-item label="应用名称" prop="Name">
      <el-input v-model="form.Name" placeholder="应用名称"></el-input>
    </el-form-item>
    <el-form-item label="应用图标" prop="Icon">
      <el-avatar v-if="form.Icon" :src="baseURL+form.Icon"></el-avatar>
      <el-upload
        class="upload-demo"
        :action="baseURL+'/common/file/Upload'"
        :multiple="false"
        :limit="1"
        :file-list="fileList"
        :on-success="onFileUpload"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="访问路径" prop="Path">
      <el-input v-model="form.Path" placeholder="访问路径"></el-input>
    </el-form-item>
    <el-form-item label="是否主应用：" prop="IsPrimary">
      <el-radio-group v-model="form.IsPrimary">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <div v-if="form.IsPrimary==1">
      <el-form-item label="登录方式" prop="LoginType">
        <el-radio-group v-model="form.LoginType">
          <el-radio :label="0">AppKey+AppSecret模式</el-radio>
          <el-radio :label="1">服务商模式</el-radio>
          <el-radio :label="2">CorpId+CorpSecret模式</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="AppId" prop="AppId">
        <el-input v-model="form.AppId" placeholder="钉钉微应用AppId"></el-input>
      </el-form-item>
      <el-form-item label="AppKey" v-if="form.LoginType<2" prop="AppKey">
        <el-input v-model="form.AppKey" placeholder="钉钉微应用AppKey"></el-input>
      </el-form-item>
      <el-form-item label="AppSecret" v-if="form.LoginType<2" prop="AppSecret">
        <el-input v-model="form.AppSecret" placeholder="钉钉微应用AppSecret"></el-input>
      </el-form-item>
      <el-form-item label="CorpId" v-if="form.LoginType==2" prop="CorpId">
        <el-input v-model="form.CorpId" placeholder="CorpId"></el-input>
      </el-form-item>
      <el-form-item label="CorpSecret" v-if="form.LoginType==2" prop="CorpSecret">
        <el-input v-model="form.CorpSecret" placeholder="CorpSecret"></el-input>
      </el-form-item>
    </div>
    <el-form-item label="自定义样式" prop="CustomStyle">
      <el-input v-model="form.CustomStyle" placeholder="自定义样式"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input type="textarea" placeholder="应用说明" rows="5" v-model="form.Description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { createApplication, updateApplication } from "@/api/application";
import { getAll as getAppList } from "@/api/application";
import { Message } from "element-ui";
export default {
  name: "ApplicationDetail",
  data() {
    return {
      baseURL: process.env.VUE_APP_API,
      fileList: [],
      form: {
        Id: 0,
        Name: "",
        LoginType: 0,
        IsPrimary: false,
        Icon: "",
        CustomStyle:""
      },
      rules: {
        Name: [{ required: true, message: "请输入应用名称", trigger: "blur" }]
      }
    };
  },
  props: {
    model: {
      type: Object
    }
  },
  mounted: function() {
    this.setModel(this.model);
  },
  watch: {
    model: function(model) {
      this.clearForm();
      this.setModel(model);
    }
  },
  methods: {
    clearForm() {
      Object.keys(this.form).map(key => {
        this.$set(this.form, key, key == "Id" ? 0 : "");
      });
    },
    setModel(model) {
      model &&
        Object.keys(model).map(key => {
          this.$set(this.form, key, model[key]);
        });
    },
    onCancel() {
      this.$emit("onCancel");
    },
    onSubmit() {
      this.$refs.editform.validate(valid => {
        if (valid) {
          this.submitData();
        }
      });
    },
    submitData() {
      if (this.form.Id) {
        updateApplication(this.form).then(res => {
          res && this.onSuccess();
        });
      } else {
        createApplication(this.form).then(res => {
          res && this.onSuccess();
        });
      }
    },
    onSuccess() {
      this.clearForm();
      Message({ message: "保存成功", type: "success", duration: 2 * 1000 });
      this.$emit("onSuccess");
    },
    onFileUpload(response) {
      if (response.OK) {
        this.$set(this.form, "Icon", response.ObjectData.path);
        this.fileList = [];
      }
    }
  }
};
</script>

<style scoped>
.el-form-item {
  text-align: left !important;
}
.upload-demo {
  float: left;
}
.el-avatar {
  float: left;
  margin-right: 20px;
}
</style>
<template>
  <el-form ref="editform" :model="form" label-width="80px">
    <el-form-item label="姓名" prop="UserName">
      <el-input v-model="form.UserName" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="备用手机" prop="SparePhone">
      <el-input v-model="form.SparePhone" placeholder="输入备用手机号"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="IdCard">
      <el-input v-model="form.IdCard" placeholder="输入身份证号"></el-input>
    </el-form-item>
    <el-form-item label="钉钉号" prop="DingTalkId">
      <el-input v-model="form.DingTalkId" placeholder="输入钉钉号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateEmployee } from "@/api/user";
import { Message } from "element-ui";
export default {
  name: "UserDetail",
  data() {
    return {
      form: {
        Id: 0,
        UserName: "",
        IdCard: "",
        DingTalkId: "",
        SparePhone:""
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
        Object.keys(this.form).map(key => {
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
      updateEmployee(this.form).then(res => {
        res && this.onSuccess();
      });
    },
    onSuccess() {
      this.clearForm();
      Message({ message: "保存成功", type: "success", duration: 2 * 1000 });
      this.$emit("onSuccess");
    }
  }
};
</script>

<style scoped>
.el-form-item {
  text-align: left !important;
}
</style>
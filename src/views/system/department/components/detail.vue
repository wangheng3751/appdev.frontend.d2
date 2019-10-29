<template>
  <el-form ref="editform" :model="form" label-width="90px">
    <el-form-item label="部门名称：" prop="name">{{ form.name }}</el-form-item>  
    <el-form-item label="部门类型：" prop="deptType">
      <el-radio-group v-model="form.deptType">
        <el-radio v-for="t in typeList" :label="t.Id" :key="t.Id">{{t.Name}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { setDeptType } from "@/api/department";
import { Message } from "element-ui";
const typeList = require("./dept-type.json");
export default {
  props: {
    model: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        id: 0,
        name: "",
        deptType: 0
      },
      typeList: typeList
    };
  },
  created() {},
  mounted() {
    this.setModel(this.model);
  },
  watch: {
    model: function(v) {
      this.clearForm();
      this.setModel(v);
    }
  },
  methods: {
    clearForm() {
      Object.keys(this.form).map(key => {
        this.$set(this.form, key, key.indexOf("id") >= 0 ? 0 : "");
      });
    },
    setModel(model) {
      model &&
        Object.keys(this.form).map(key => {
          this.$set(this.form, key, model[key]);
        });
    },
    onSubmit() {
      this.$refs.editform.validate(valid => {
        if (valid) {
          this.submitData();
        }
      });
    },
    submitData() {
      const { id, deptType } = this.form;
      setDeptType({ id, deptType }).then(res => {
        res && this.onSuccess();
      });
    },
    onSuccess() {
      this.clearForm();
      Message({ message: "保存成功", type: "success", duration: 2 * 1000 });
      this.$emit("onSuccess");
    },
    onCancel() {
      this.$emit("onCancel");
    }
  }
};
</script>
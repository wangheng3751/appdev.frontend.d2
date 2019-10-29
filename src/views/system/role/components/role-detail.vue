<template>
    <el-form ref="editform"  :rules="rules" :model="form" label-width="80px">
        <el-form-item label="名称" prop="Name">
            <el-input v-model="form.Name" placeholder="角色名称"></el-input>
        </el-form-item>    
         <el-form-item label="编码" prop="Code">
            <el-input v-model="form.Code" placeholder="角色编码"></el-input>
        </el-form-item>                             
        <el-form-item  label="描述">
            <el-input type="textarea" placeholder="角色说明" rows="5" v-model="form.Description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { createRole, updateRole } from '@/api/role'
import { Message } from 'element-ui'
export default {
    name: 'RoleDetail',
    data(){
        return {
            form: {
                Id:0,
                Name: '',
                Code: '',
                Description:''
            },
            rules: {
                Name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                Code: [
                    { required: true, message: '请输入角色编码', trigger: 'blur' }
                ]
            }
        }
    },
    props: {
      model:{
        type:Object
      }
    },
    mounted:function(){
        this.setModel(this.model);
    },
    watch:{
       "model":function(model){
          this.clearForm();
          this.setModel(model);
       }
    },
    methods:{
        clearForm(){
            Object.keys(this.form).map(key=>{
               this.$set(this.form,key,key=="Id"?0:"");
            });
        },
        setModel(model){
            model&&Object.keys(model).map(key=>{
               this.$set(this.form,key,model[key]);
            });
        },
        onCancel(){
            this.$emit('onCancel');
        },
        onSubmit(){
            this.$refs.editform.validate((valid) => {
                if (valid) {
                   this.submitData();
                }
            });
        },
        submitData(){
            if(this.form.Id){
                updateRole(this.form).then(res => {
                    res&&this.onSuccess();
                })
            }else{
                createRole(this.form).then(res => {
                    res&&this.onSuccess();
                })
            }  
        },
        onSuccess(){
            this.clearForm();
            Message({message: "保存成功",type: 'success',duration: 2 * 1000})
            this.$emit('onSuccess');     
        }
    }
}
</script>

<style scoped>
    .el-form-item{
        text-align: left !important
    } 
</style>
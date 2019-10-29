<template>
    <el-form ref="editform"  :rules="rules" :model="form" label-width="80px">  
        <el-form-item label="路由名称" prop="Name">
            <el-input v-model="form.Name" placeholder="UI展示用(如：用户管理)"></el-input>
        </el-form-item>    
        <el-form-item label="权限编码" prop="PermissionCode">
            <el-input v-model="form.PermissionCode" placeholder="权限编码"></el-input>
        </el-form-item> 
        <el-form-item label="访问路径" prop="Path">
            <el-input v-model="form.Path" placeholder="访问路径"></el-input>
        </el-form-item>   
        <el-form-item label="组件名称" prop="Component">
            <el-input v-model="form.Component" placeholder="代码内使用(英文，如:user)"></el-input>
        </el-form-item>     
        <el-form-item label="组件地址" prop="ComponentPath">
            <el-input v-model="form.ComponentPath" placeholder="组件地址"></el-input>
        </el-form-item>  
        <el-form-item label="所属应用"  prop="ApplicationId">
            <el-select v-model="form.ApplicationId" placeholder="请选择所属应用">
                <el-option v-for="(d,index) in appList" :key="index" :label="d.Name" :value="d.Id"></el-option>
            </el-select>
        </el-form-item>                                 
        <el-form-item label="排序">
            <el-input v-model="form.Sort" type="number" placeholder="排序"></el-input>
        </el-form-item>  
        <el-form-item  label="描述">
            <el-input type="textarea" placeholder="路由说明" rows="5" v-model="form.Description"></el-input>
        </el-form-item>    
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { createRouter, updateRouter } from '@/api/router'
import { getAll as getAppList } from '@/api/application'
import { Message } from 'element-ui'
export default {
    name: 'RouterDetail',
    data(){
        return {
            form: {
                Id:0,
                Name: '',
                Title:'',
                PermissionCode: '',
                Path:'',
                Component:'',  
                ComponentPath:'',
                Sort:0,
                ApplicationId:''
            },
            appList:[],
            rules: {
                Title: [
                    { required: true, message: '请输入路由标题', trigger: 'blur' }
                ],
                Name: [
                    { required: true, message: '请输入路由名称', trigger: 'blur' }
                ],
                PermissionCode: [
                    { required: true, message: '请输入权限编码', trigger: 'blur' }
                ],
                Path: [
                    { required: true, message: '请输入访问路径', trigger: 'blur' }
                ],
                Component: [
                    { required: true, message: '请输入组件名称', trigger: 'blur' }
                ],
                ComponentPath: [
                    { required: true, message: '请输入组件地址', trigger: 'blur' }
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
        this.getAppList();
    },
    watch:{
       "model":function(model){
          this.clearForm();
          this.setModel(model);
       }
    },
    methods:{
        getAppList(){
            getAppList().then(res=>{
               this.appList=res.rows;
            })
        },
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
            this.$set(this.form,"ParentId",0);
            if(this.form.Id){
                updateRouter(this.form).then(res => {
                    res&&this.onSuccess();
                })
            }else{
                createRouter(this.form).then(res => {
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
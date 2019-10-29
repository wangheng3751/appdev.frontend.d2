<template>
    <el-form ref="editform"  :rules="rules" :model="form" label-width="80px">  
        <el-form-item label="功能名称" prop="Title">
            <el-input v-model="form.Title" placeholder="UI展示用(如：用户管理)"></el-input>
        </el-form-item>   
        <el-form-item label="类型" prop="Type">
            <el-radio-group v-model="form.Type">
                <el-radio  :label="0">菜单</el-radio>
                <el-radio  :label="1">功能</el-radio>
            </el-radio-group>
        </el-form-item> 
        <el-form-item label="关联路由" v-if="form.Type==0"  prop="RouterId">
            <el-select v-model="form.RouterId" placeholder="请选择路由" @change="onRouterChange">
                <el-option v-for="(d,index) in routerList" :key="index" :label="d.Name" :value="d.Id"></el-option>
            </el-select>
        </el-form-item>     
        <el-form-item label="权限编码" prop="PermissionCode">
            <el-input v-model="form.PermissionCode" placeholder="权限编码"></el-input>
        </el-form-item>   
        <el-form-item label="所属应用"  prop="ApplicationId">
            <el-select v-model="form.ApplicationId" placeholder="请选择所属应用">
                <el-option v-for="(d,index) in appList" :key="index" :label="d.Name" :value="d.Id"></el-option>
            </el-select>
        </el-form-item>      
        <el-form-item label="图标" prop="Icon">
            <el-input v-model="form.Icon" placeholder="图标"></el-input>
        </el-form-item>                            
        <el-form-item label="排序">
            <el-input v-model="form.Sort" type="number" placeholder="排序"></el-input>
        </el-form-item>  
        <el-form-item  label="描述">
            <el-input type="textarea" placeholder="功能说明" rows="5" v-model="form.Description"></el-input>
        </el-form-item>    
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { createMenu, updateMenu } from '@/api/menu'
import { getAll as getAppList } from '@/api/application'
import { getAll as getRouterList } from '@/api/router'
import { Message } from 'element-ui'
export default {
    name: 'MenuDetail',
    data(){
        return {
            ParentId:0,//父容器传入
            form: {
                Id:0,
                Title:'',
                Type:0,
                PermissionCode: '',
                Path:'',
                Sort:0,
                Icon:'',
                ApplicationId:'',
                ParentId:0,
                RouterId:0
            },
            appList:[],
            routerList:[],
            rules: {
                Title: [
                    { required: true, message: '请输入功能标题', trigger: 'blur' }
                ],
                Type: [
                    { required: true, message: '请选择类型', trigger: 'blur' }
                ],
                PermissionCode: [
                    { required: true, message: '请输入权限编码', trigger: 'blur' }
                ],
                ApplicationId: [
                    { required: true, message: '请选择所属应用', trigger: 'blur' }
                ]
            }
        }
    },
    props: {
      model:{
        type:Object
      },
      parentId:{
          type:Number
      }
    },
    mounted:function(){
        this.setModel(this.model);
        this.getAppList();
        this.getRouterList();
    },
    watch:{
       "model":function(v){
          this.clearForm();
          this.setModel(v);
       },
       "parentId":function(v){
          this.ParentId=v;
        }
    },
    methods:{
        getAppList(){
            getAppList().then(res=>{
               this.appList=res.rows;
            })
        },
        getRouterList(){
            getRouterList().then(res=>{
               this.routerList=res.rows;
            })
        },
        onRouterChange(val){
            let sel=this.routerList.filter((item)=>{
                return item.Id==val;
            })[0];
            this.$set(this.form,"PermissionCode",sel.PermissionCode);
        },
        clearForm(){
            Object.keys(this.form).map(key=>{
               this.$set(this.form,key,key.indexOf("Id")>=0?0:"");
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
                   !this.form.ParentId&&this.$set(this.form,"ParentId",this.parentId||0);
                   this.submitData();
                }
            });
        },
        submitData(){
            if(this.form.Id){
                updateMenu(this.form).then(res => {
                    res&&this.onSuccess();
                })
            }else{
                createMenu(this.form).then(res => {
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
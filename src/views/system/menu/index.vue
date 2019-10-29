<template>
<d2-container>
    <el-form slot="header" :inline="true" size="mini" style="margin-bottom: -18px;">
      <el-form-item label="名称">
        <el-input v-model="filterText" placeholder="名称" style="width: 100px;"/></el-form-item>
      <el-form-item> 
        <el-button type="primary" @click="onSearchFormSubmit"> <d2-icon name="search"/> 查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearchFormReset"> <d2-icon name="refresh"/> 重置</el-button>
      </el-form-item>
      <el-form-item v-permission="['menu.create']">
        <el-button type="primary" @click="handleCreate" icon="el-icon-plus"> 添加</el-button>
      </el-form-item>
    </el-form>

  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="Id"
    ref="menutree"
    default-expand-all
    :tree-props="defaultProps">
    <el-table-column prop="Title" label="名称" width="180">

    </el-table-column>
    <el-table-column prop="Path" label="路由路径" width="180"></el-table-column>
    <el-table-column prop="PermissionCode" label="权限代码" width="220"></el-table-column>
    <el-table-column prop="Type" label="类型" width="180">
      <template slot-scope="scope">
        <span>{{scope.row.Type=="0"?"菜单":"功能"}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" prop="id">
        <template slot-scope="scope">
          <el-button v-permission="['menu.createchild']" size="mini" type="primary" icon="el-icon-plus" @click="onCreateChild(scope.row.Id)" circle></el-button>
          <el-button v-permission="['menu.edit']" size="mini" type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row)" circle></el-button>
          <el-button v-permission="['menu.delete']" size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.Id)" circle></el-button>
        </template>
      </el-table-column>
  </el-table>

    <el-dialog center :title="editModel?'编辑功能':'创建功能'" :visible.sync="createDialogVisible" @close="handerEditClose">
        <menu-detail  v-on:onSuccess="onFormSubmitSuccess" :parentId="parentId" :model="editModel" v-on:onCancel="onFormSubmitCancel"/>
    </el-dialog>
</d2-container>
</template>

<script>
import { getAll,deleteMenu } from '@/api/menu'
import MenuDetail from './components/menu-detail'
export default {
  components: {
    MenuDetail:MenuDetail
  },
  props: {
    loading: {
      default: false
    }
  },
  data () {
    return {
        createDialogVisible:false,
        filterText:"",
        tableData: [],
        defaultProps: {children: 'Children',hasChildren:'HasChildren'},
        editModel:null,
        parentId:0 //创建下级时使用
    }
  },
  created() {
    this.fetchTreeData()
  },
  mounted() {
     
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    fetchTreeData(){
      getAll().then(response => {
        this.tableData=response.rows;
      })
    },
    //编辑表单提交成功
    onFormSubmitSuccess(){
      this.editModel=null;
      this.hideFormModal();
      //重新加载列表数据
      this.reloadList();
    },
     //关闭编辑框事件
    handerEditClose(){
      this.parentId=0;
      this.editModel=null;
    },
    //编辑表单取消提交
    onFormSubmitCancel(){
      this.hideFormModal();
    },
    //新增按钮点击
    handleCreate(){
      this.showFormModal();;
    },
    //编辑事件
    handleUpdate(data){
      this.editModel=data;
      this.showFormModal();
    },
    //删除事件
    handleDelete(id){
      this.$confirm('确定删除该功能吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMenu(id);
      })
    },
    //删除
    deleteMenu(id){
      deleteMenu(id).then(res=>{
        if(res){
          this.$message({type: 'success',message: '删除成功!'});
          this.reloadList();
        }
      });
    },
    onCreateChild(id){
      this.parentId=id;
      this.handleCreate();
    },
    //搜索提交
    onSearchFormSubmit () {
        this.reloadList();
    },
    //搜索重置
    onSearchFormReset () {
      this.$refs.searchForm.resetFields();
      this.reloadList();
    },
    //重新加载列表数据
    reloadList(){
      this.tableData=[];
      this.fetchTreeData();
    },
    showFormModal(){
      this.createDialogVisible=true;
    },
    hideFormModal(){
      this.createDialogVisible=false;
    }
  }
}
</script>

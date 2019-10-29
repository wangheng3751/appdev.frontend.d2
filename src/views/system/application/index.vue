<template>
<d2-container>
    <el-form
        slot="header"
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        size="mini"
        style="margin-bottom: -18px;">
        <el-form-item label="名称" prop="name">
            <el-input v-model="searchForm.name"  placeholder="应用名称" style="width: 100px;"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"  @click="onSearchFormSubmit"> <d2-icon name="search"/> 查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="onSearchFormReset"> <d2-icon name="refresh"/> 重置</el-button>
        </el-form-item>
        <el-form-item v-permission="['application.create']">
            <el-button type="primary" @click="handleCreate" icon="el-icon-plus"> 添加</el-button>
        </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      v-loading="loading"
      size="mini"
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="应用名称" width="120" prop="Name"></el-table-column>
      <el-table-column label="应用图标" width="150" prop="Icon"></el-table-column>
      <el-table-column label="访问地址" width="300" prop="Path"></el-table-column>
      <el-table-column label="描述"  :show-overflow-tooltip="true"  prop="Description"></el-table-column>
      <el-table-column label="操作" prop="id">
        <template slot-scope="scope">
          <el-button size="mini" v-permission="['application.edit']" type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row)" circle></el-button>
          <el-button size="mini" v-permission="['application.delete']" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.Id)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        slot="footer"
        :current-page="pagination.pageIndex"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: -10px;"
        @size-change="onPageSizeChange"
        @current-change="onPageSizeSelected">
    </el-pagination>

    <el-dialog center :title="editModel?'编辑应用':'创建应用'" :visible.sync="createDialogVisible" @close="handerEditClose">
        <application-detail  v-on:onSuccess="onFormSubmitSuccess" :model="editModel" v-on:onCancel="onFormSubmitCancel"/>
    </el-dialog>
</d2-container>
</template>

<script>
import { getList,deleteApplication } from '@/api/application'
import ApplicationDetail from './components/application-detail'
export default {
  components: {
    ApplicationDetail:ApplicationDetail
  },
  data () {
    return {
      loading:false,
      tableData: [],
      multipleSelection: [],
      createDialogVisible:false,
      //搜索
      searchForm: {
        name:''
      },
      //分页
      pagination:{
        pageIndex:0,
        pageSize:20,
        total:0
      },
      editModel:null
    }
  },
  created() {
    this.fetchList()
  },
  watch: {
   
  },
  methods: {
    //列表数据加载
    fetchList(){
      getList({
        ...this.searchForm,
        ...this.pagination
      }).
        then(response => {
        this.tableData=response.rows;
        this.$set(this.pagination,"total",response.total);
      })
    },
    //编辑表单提交成功
    onFormSubmitSuccess(){
      this.editModel=null;
      this.createDialogVisible=false;
      //重新加载列表数据
      this.reloadList();
    },
    //编辑表单取消提交
    onFormSubmitCancel(){
        this.createDialogVisible=false;
    },
    //多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    //新增按钮点击
    handleCreate(){
      this.createDialogVisible=true;
    },
    //关闭编辑框事件
    handerEditClose(){
      this.editModel=null;
    },
    //编辑事件
    handleUpdate(data){
      this.editModel=data;
      this.createDialogVisible=true;
    },
    //删除事件
    handleDelete(id){
      this.$confirm('确定删除该应用吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteApplication(id);
      })
    },
    //删除
    deleteApplication(id){
      deleteApplication(id).then(res=>{
        if(res){
          this.$message({type: 'success',message: '删除成功!'});
          this.reloadList();
        }
      });
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
    //分页数据长度变化
    onPageSizeChange (val) {
      this.pagination = val
    },
    //页码选中
    onPageSizeSelected (val) {
      
    },
     //重新加载列表数据
    reloadList(){
      this.tableData=[];
      this.$set(this.pagination,"pageIndex",0);
      this.fetchList();
    }
  }
}
</script>

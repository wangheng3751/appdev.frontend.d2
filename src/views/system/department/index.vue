<template>
  <d2-container>
    <el-form slot="header" :inline="true" size="mini" style="margin-bottom: -18px;">
      <el-form-item label="名称">
        <el-input v-model="filterText" placeholder="部门名称" style="width: 100px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleFormSubmit">
          <d2-icon name="search" /> 查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleFormReset">
          <d2-icon name="refresh" /> 重置
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" v-permission="['department.sync']" type="primary" icon="el-icon-refresh" @click="onSyncFromDingtalk">从钉钉同步</el-button>
      </el-form-item>
    </el-form>

    <el-tree
      :data="treeData"
      :props="defaultProps"
      :default-expanded-keys="defaultKeys"
      accordion
      node-key="id"
      ref="tree"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}
          <!--<span class="dept-type">{{ getDeptType(data.deptType) }}</span>-->
        </span>
        <span>
          <el-button size="mini" v-permission="['department.edit']" type="primary" icon="el-icon-edit" @click="handleUpdate(data)" circle></el-button>
          <!--<el-button size="mini" type="primary" icon="el-icon-plus" circle></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>-->
        </span>
      </span>
    </el-tree>
    <el-dialog center title="部门详情" :visible.sync="createDialogVisible" @close="handerEditClose">
      <dept-detail
        v-on:onSuccess="onFormSubmitSuccess"
        :model="editModel"
        v-on:onCancel="onFormSubmitCancel"
      />
    </el-dialog>
  </d2-container>
</template>

<script>
import { getDeptTree,syncFromDingtalk } from "@/api/department";
import DeptDetail from "./components/detail";
const typeList = require('./components/dept-type.json');
export default {
  components: {
    DeptDetail: DeptDetail
  },
  props: {
    loading: {
      default: false
    }
  },
  data() {
    return {
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      defaultKeys:["1"],
      createDialogVisible:false,
      editModel:null
    };
  },
  created() {
    this.fetchTreeData();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    fetchTreeData() {
      getDeptTree().then(response => {
        this.treeData = response;
      });
    },
    handleNodeClick(data) {
      
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleFormSubmit() {
      this.$refs.tree.filter();
    },
    handleFormReset() {
      this.filterText = "";
      this.$refs.tree.filter();
    },
    //编辑事件
    handleUpdate(data){
      this.editModel=data;
      this.createDialogVisible=true;
    },
    handerEditClose(){

    },
    onFormSubmitSuccess(){
      this.editModel=null;
      this.createDialogVisible=false;
      //重新加载列表数据
      this.fetchTreeData();
    },
    onFormSubmitCancel(){
      this.createDialogVisible=false;
    },
    getDeptType(type){
      var types=typeList.filter((item)=>{ return item.Id==type });
      if(types.length>0) return types[0].Name;
      return "";
    },
    onSyncFromDingtalk(){
      syncFromDingtalk().then(res=>{
          this.$message({type: 'success',message: `同步完成!共同步${res.DeptCount}个部门,${res.UserCount}个人员,耗时${res.Duration}秒`});
          //重新加载列表数据
          this.fetchTreeData();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-icon-edit {
  color: #409eff;
  margin-left: 20px;
}
.el-icon-delete {
  color: #f56c6c;
  margin-left: 10px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 50px;
}
.dept-type{
   margin-left: 20px;
   color: #409eff
}
</style>
<!---todo样式污染解决-->
<style>
.el-tree-node__content {
  height: 36px !important;
}
</style>

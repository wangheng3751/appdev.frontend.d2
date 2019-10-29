<template>
  <div class="my-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-table
          :data="appData"
          size="mini"
          ref="apptable"
          style="width: 100%;"
          highlight-current-row
          @current-change="handleAppSelectionChange">
          <el-table-column label="应用名称" prop="Name"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="16">
        <div class="menu-container">
          <el-form :inline="true" size="mini">
            <el-form-item label="名称">
              <el-input v-model="filterText" placeholder="功能名称" style="width: 150px;" />
            </el-form-item>
          </el-form>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            ref="tree"
            node-key="Id"
            show-checkbox
            default-expand-all
            check-strictly
            :filter-node-method="filterNode"
            :default-checked-keys="defaultKeys"
            @check="onMenuClick"></el-tree>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAll as getAllMenus } from "@/api/menu";
import { addRoleMenus,removeRoleMenus,getRoleMenus } from "@/api/role";
import { getAll as getAllApps } from "@/api/application";
export default {
  components: {},
  props: {
    roleId: 0
  },
  data() {
    return {
      filterText: "",
      appData: [],
      treeData: [],
      defaultProps: {
        children: "Children",
        label: "Title"
      },
      defaultKeys:[

      ]
    };
  },
  created() {
    this.fetchAllApps();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    roleId(){
        this.clearMenus();
    }   
  },
  methods: {
    fetchMenuData(appid) {
      getAllMenus({ appid: appid }).then(response => {
        this.treeData = response.rows;
        this.fetchRoleMenus();
      });
    },
    fetchAllApps() {
      getAllApps().then(response => {
        this.appData = response.rows;
      });
    },
    fetchRoleMenus(){
        getRoleMenus(this.roleId).then(res=>{
            var roles=[];
            res&&res.map((item)=>{
                roles.push(item.MenuId);
            });
            this.defaultKeys=roles;
        })
    },
    clearMenus(){   
        this.fetchAllApps();
        this.treeData=[];
        this.defaultKeys=[];
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.Title.indexOf(value) !== -1;
    },
    onNodeCheck(row,data){
        console.log(row,data)
    },
    /** todo 默认选中时也会执行 需要优化 */
    onNodeCheckChange(row, selected, cd) {
      var data={ RoleId: this.roleId, MenuId: row.Id };
      if (selected) {
        addRoleMenus(data).then(res => {});
      } else {
        removeRoleMenus(data).then(
          res => {}
        );
      }
    },
    handleAppSelectionChange(sel) {
      sel&&this.fetchMenuData(sel.Id);
    },
    onMenuClick(data,node){
      let nodes=this.getChildrenIds(data);
      let isChecked = node.checkedKeys.filter((item)=>{ return item==data.Id }).length>0;
      //todo 循环提交单条改为一次性提交多条
      nodes.map((id)=>{
        var data={ RoleId: this.roleId, MenuId: id };
        if (isChecked) {
          addRoleMenus(data).then(res => {});
        } else {
          removeRoleMenus(data).then(
            res => {}
          );
        }
      })
    },
    getChildrenIds(row){
        var ids=[row.Id];
        if(row.Children){
            row.Children.map((item)=>{
                var childIds=this.getChildrenIds(item);
                childIds.map((v)=>{ ids.push(v) })
            })
        }
        return ids;
    }
  }
};
</script>

<style scoped>
.el-tree {
  height: 500px;
  overflow-y: auto;
}
.my-container {
  border-top: 1px solid #eee;
  margin-top: -20px;
  padding-top: 20px;
}
.menu-container {
  border-left: 1px solid #eee;
  padding-left: 20px;
}
</style>
<style>
.my-container .el-tree-node__label {
  margin-left: 10px !important;
}
</style>
<template>
  <div style="height:500px">
    <!--
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox> 
    <div style="margin: 20px 0;"></div>-->
    <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
      <el-checkbox class="role-cell" v-for="role in roles" border :label="role.Id" @change="checked=>onCheckChange(checked,role.Id)" :key="role.Id">{{role.Name}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import { getList as getRoleList } from "@/api/role";
import { addEmployeeRole,removeEmployeeRole,getEmployeeRoles } from "@/api/user";
export default {
  props: {
    userId: 0
  },
  data() {
    return {
      checkAll: false,
      checkedRoles: [],
      roles: [],
      isIndeterminate: false,
      roleids: []
    };
  },
  created() {
    this.fetchRoles();
    this.fetchEmployeeRoles();
  },
  watch: {
    userId(v){
      this.fetchEmployeeRoles();
    }   
  },
  methods: {
    fetchRoles() {
      getRoleList({ pageIndex: 0, pageSize: 100 }).then(res => {
        this.roles = res.rows;
        var ids = [];
        res.rows.map(item => {
          ids.push(item.Id);
        });
        this.roleids = ids;
      });
    },
    fetchEmployeeRoles(){
        this.checkedRoles= [];
        if(!this.userId) return;
        getEmployeeRoles({ userId:this.userId }).then(res=>{
           var ids = [];
            res.map(item => {
              ids.push(item.RoleId);
            });
          this.checkedRoles = ids;
        }); 
    },
    handleCheckAllChange(val) {
      this.checkedRoles = val ? this.roleids : [];
      this.isIndeterminate = false;
    },
    handleCheckedRolesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.roles.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.roles.length;
    },
    onCheckChange(checked,v){
      var data={ RoleId:v,UserId:this.userId }
      if(checked){
        addEmployeeRole(data);
      }else{
        removeEmployeeRole(data);
      }
    }
  }
};
</script>
<style scoped>
.role-cell{
  margin-top:10px;
  width:25%;
  margin-left:10px
}
</style>
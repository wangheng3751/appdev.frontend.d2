<template>
  <d2-container>
    <el-form
      slot="header"
      :inline="true"
      :model="searchForm"
      ref="searchForm"
      size="mini"
      style="margin-bottom: -18px;"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="searchForm.name" placeholder="姓名" style="width: 100px;" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="searchForm.phone" placeholder="电话" style="width: 120px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearchFormSubmit">
          <d2-icon name="search" /> 查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearchFormReset">
          <d2-icon name="refresh" /> 重置
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      v-loading="loading"
      size="mini"
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="头像" width="100">
        <template slot-scope="scope">
          <el-avatar size="small" :src="scope.row.HeadImg"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="120" :show-overflow-tooltip="true" prop="UserName"></el-table-column>
      <el-table-column label="电话" width="120" align="center" prop="Phone"></el-table-column>
      <el-table-column label="备用手机" width="120" align="center" prop="SparePhone"></el-table-column>
      <el-table-column label="身份证号" width="150" align="center" prop="IdCard"></el-table-column>
      <el-table-column label="所属部门" width="200" :show-overflow-tooltip="true" prop="Departments">
        <template slot-scope="scope">
          <el-tag v-for="(d,index) in scope.row.Departments" :key="d.Id">{{ d.Name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="职位" width="100" prop="Position"></el-table-column>
      <el-table-column label="修改时间" width="150" align="center" prop="UpdateTime"></el-table-column>
      <el-table-column label="操作" prop="id">
        <template slot-scope="scope">
          <el-button
            v-permission="['user.role.cfg']"
            size="mini"
            type="primary"
            title="设置角色"
            icon="el-icon-s-check"
            @click="onRoleEditClick(scope.row)"
            circle
          ></el-button>
          <el-button
            v-permission="['user.datapermission.cfg']"
            size="mini"
            title="权限设置"
            type="primary"
            icon="el-icon-key"
            @click="onPermissionEditClick(scope.row)"
            circle
          ></el-button>
          <el-button
            v-permission="['user.edit']"
            size="mini"
            type="primary"
            title="编辑"
            icon="el-icon-edit"
            @click="onEditUserClick(scope.row)"
            circle
          ></el-button>
          <!--<el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>-->
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
      @current-change="onPageSizeSelected"
    ></el-pagination>

    <!--角色设置modal-->
    <el-dialog
      center
      :title="userName+'-角色配置'"
      :visible.sync="roleDialogVisible"
      @close="handerRoleEditClose"
    >
      <role-config :userId="userId" />
    </el-dialog>

    <!--数据权限设置modal-->
    <el-dialog
      center
      :title="userName+'-数据权限配置'"
      :visible.sync="permissionDialogVisible"
      @close="handerPermissionEditClose"
    >
      <dm-dept-selector ref="deptselect" :checkPermission="false" v-on:onCheckedChange="onDeptCheckedChange" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePermissionDialog">取 消</el-button>
        <el-button type="primary" @click="onPermissionSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改用户信息modal-->
    <el-dialog
      center
      title="员工信息"
      :visible.sync="userinfoDialogVisible"
      @close="handerUserEditClose"
    >
      <user-detail
        v-on:onSuccess="onFormSubmitSuccess"
        :model="editModel"
        v-on:onCancel="onFormSubmitCancel"
      />
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  getList,
  addUserDeptDataPermission,
  removeUserDeptDataPermission,
  getUserDeptDataPermissions
} from "@/api/user";
import RoleConfig from "./components/role-config";
import UserDetail from "./components/detail";
import DmDeptSelector from "@/components/dm-dept-selector";
export default {
  components: {
    RoleConfig,
    DmDeptSelector,
    UserDetail
  },
  data() {
    return {
      loading: false,
      tableData: [],
      multipleSelection: [],
      searchForm: {
        name: "",
        phone: ""
      },
      pagination: {
        pageIndex: 0,
        pageSize: 20,
        total: 0
      },
      //用户ID
      userId: 0,
      userName: "",
      editModel: null,
      roleDialogVisible: false,
      permissionDialogVisible: false,
      userinfoDialogVisible: false
    };
  },
  created() {
    this.fetchList();
  },
  watch: {},
  methods: {
    //列表数据加载
    fetchList() {
      getList({
        ...this.searchForm,
        ...this.pagination
      }).then(response => {
        this.tableData = response.rows;
        this.$set(this.pagination, "total", response.total);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //搜索提交
    onSearchFormSubmit() {
      this.reloadList();
    },
    //搜索重置
    onSearchFormReset() {
      this.$refs.searchForm.resetFields();
      this.reloadList();
    },
    //分页数据长度变化
    onPageSizeChange(val) {
      this.$set(this.pagination,"pageSize",val);
      this.fetchList();
    },
    //页码选中
    onPageSizeSelected(val) {
      this.$set(this.pagination,"pageIndex",val-1);
      this.fetchList();
    },
    //重新加载列表数据
    reloadList() {
      this.tableData = [];
      this.$set(this.pagination, "pageIndex", 0);
      this.fetchList();
    },
    //点击角色编辑事件
    onRoleEditClick(user) {
      this.userId = user.UserId;
      this.userName = user.UserName;
      this.showRoleModal();
    },
    //角色编辑窗口关闭事件
    handerRoleEditClose() {
      this.userId = 0;
      this.userName = "";
      this.hideRoleModal();
    },
    //打开角色设置框
    showRoleModal() {
      this.roleDialogVisible = true;
    },
    //关闭角色设置框
    hideRoleModal() {
      this.roleDialogVisible = false;
    },
    //数据权限编辑
    onPermissionEditClick(user) {
      this.userId = user.UserId;
      this.userName = user.UserName;
      this.permissionDialogVisible = true;
    },
    handerPermissionEditClose() {},
    closePermissionDialog() {
      this.permissionDialogVisible = false;
    },
    onDeptCheckedChange(keys, isChecked) {
      keys.map(id => {
        let data = { userId: this.userId, deptId: id };
        if (isChecked) {
          addUserDeptDataPermission(data).then(res => {});
        } else {
          removeUserDeptDataPermission(data).then(res => {});
        }
      });
    },
    onPermissionSubmit() {
      //let nodes=this.$refs.deptselect.getSelections();
      this.permissionDialogVisible = false;
    },
    //编辑按钮点击
    onEditUserClick(user) {
      this.editModel = user;
      this.userinfoDialogVisible = true;
    },
    //关闭用户编辑窗
    handerUserEditClose() {
      this.editModel = null;
    },
    //编辑表单提交成功
    onFormSubmitSuccess() {
      this.userinfoDialogVisible = false;
      this.fetchList();
    },
    //编辑表单取消提交
    onFormSubmitCancel() {
      this.userinfoDialogVisible = false;
    }
  }
};
</script>

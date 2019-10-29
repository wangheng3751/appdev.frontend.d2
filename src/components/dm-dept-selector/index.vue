<template>
  <div>
    <el-tree
      :data="treeData"
      node-key="id"
      :props="defaultProps"
      ref="tree"
      :show-checkbox="multiple"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="onNodeClick"
      @check="onDeptClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
    <!--
    <div class="buttons">
      <el-button type="primary" size="small" @click="onSelectComplete">确定</el-button>
      <el-button size="small" @click="onCancel">取消</el-button>
    </div>-->
  </div>
</template>

<script>
import { getDeptTree,getAuthorizedDepts } from "@/api/department";
export default {
  name: "dm-dept-selector",
  props: {
    defaultCheckedkeys: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: true
    },
    checkPermission: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  created() {
    this.fetchTreeData();
  },
  watch: {
    defaultCheckedkeys(v) {
      this.$refs.tree.setCheckedKeys(v);
    }
  },
  methods: {
    fetchTreeData() {
      if (this.checkPermission) {
        getAuthorizedDepts().then(response => {
          this.treeData = response;
        });
      } else {
        getDeptTree().then(response => {
          this.treeData = response;
        });
      }
    },
    getSelections() {
      var nodes = this.$refs.tree.getCheckedNodes(true);
      return nodes;
    },
    //checkbox点击事件
    onDeptClick(data, node) {     
      //获取被点击的节点及下级节点
      let nodes = this.getChildrenIds(data);
      //判断是选中还是取消选中
      let isChecked =
        node.checkedKeys.filter(item => {
          return item == data.id;
        }).length > 0;
      //触发事件
      this.$emit("onCheckedChange", nodes, isChecked);
    },
    onNodeClick(data) {
      //权限检查
      if(this.checkPermission&&!data.hasPermission) return;
      //触发事件
      this.$emit("onNodeClick", data);
    },
    getChildrenIds(row) {
      var ids = [row.id];
      if (row.children) {
        row.children.map(item => {
          var childIds = this.getChildrenIds(item);
          childIds.map(v => {
            ids.push(v);
          });
        });
      }
      return ids;
    },
    onSelectComplete() {
      var nodes = this.$refs.tree.getCheckedNodes(true);
      this.$emit("onSuccess", nodes);
      this.clearSelections();
    },
    onCancel() {
      this.$emit("onCancel");
      this.clearSelections();
    },
    clearSelections() {
      this.$refs.tree.setCheckedNodes([0]);
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  margin-left: 10px;
}
.buttons {
  margin-top: 30px;
  text-align: center;
}
</style>
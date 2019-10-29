<template>
  <div>
    <!--<el-input v-model="filterText" placeholder style="width: 100px;" />-->
    <el-tree
      :data="treeData"
      node-key="id"
      :props="defaultProps"
      lazy
      :load="loadNode"
      ref="tree"
      show-checkbox
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
    <div class="buttons">
      <el-button type="primary" size="small" @click="onSelectComplete">确定</el-button>
      <el-button size="small" @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getDeptSubordinates } from "@/api/department";
export default {
  name: "dm-dept-userselector",
  props: {
    defaultCheckedkeys: {
      type: Array
    }
  },
  data() {
    return {
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "leaf"
      }
    };
  },
  created() {
    this.loadRoot();
  },
  watch: {
    defaultCheckedkeys(v) {
      this.$refs.tree.setCheckedKeys(v);
    }
  },
  methods: {
    loadRoot() {
      getDeptSubordinates(1).then(res => {
        this.treeData = res;
      });
    },
    loadNode(node, resolve) {
      node.data.id &&
        getDeptSubordinates(node.data.id).then(res => {
          resolve(res);
        });
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
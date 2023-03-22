<template>
  <div>
    <div style="text-align: right">
      <el-button icon="el-icon-refresh" circle @click="getList"></el-button>
      <el-button type="danger" icon="el-icon-delete" circle @click="clearSim"></el-button>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="ip" label="ip"></el-table-column>
      <el-table-column prop="time" label="time"></el-table-column>
      <el-table-column prop="userAgent" label="userAgent" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <div slot-scope="{ row }">
          <el-button type="primary" icon="el-icon-search" circle @click="lookIp(row.ip)"></el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await fetch('/sim/getData')
      const list = await res.json()
      list.reverse()
      this.tableData = list
    },
    async clearSim() {
      await this.$confirm('您确认清空所有信息？', '提示', { type: 'warning' })
      await fetch('/sim/clearData')
      this.getList()
      this.$message.success('操作成功')
    },
    lookIp(ip) {
      window.open(`https://www.ipshudi.com/${ip}.htm`)
    }
  }
}
</script>

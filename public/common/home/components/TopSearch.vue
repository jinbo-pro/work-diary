<template>
  <div class="search_max search_max_fixed">
    <input v-model="searchKey" @input="input" class="search" type="text" placeholder="输入关键字搜索" />
    <button @click="reset" class="reset">重置</button>
  </div>
</template>

<script>
export default {
  name: 'TopSearch',
  data() {
    return {
      searchKey: ''
    }
  },
  methods: {
    input() {
      this.$emit('input', this.searchKey)
    },
    reset() {
      this.searchKey = ''
      this.$emit('reset')
    }
  }
}
</script>

<style lang="less">
.search_max_fixed {
  top: 0;
  z-index: 100;
  position: sticky;
  background-color: #edeff4;
}

.search_max {
  width: 100%;
  padding: 8px;
  padding-left: 24px;
  box-sizing: border-box;
  .search {
    min-width: 60%;
    border: 1px solid #ccc;
    padding: 10px 0px;
    border-radius: 6px;
    padding-left: 5px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }

  .search:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  }

  .reset {
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;
    padding: 8px 14px;
    cursor: pointer;
    color: #fff;
    background-color: #297eff;
    border: 1px solid #ebedf0;
  }
}
</style>

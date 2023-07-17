<template>
  <div id="app">
    <!--  {{ msg }}
    <br />
    <input type="text" :value="text" @input="change" />
    {{ text }} -->

    <!-- <h1 v-if="level === 1">我是标题</h1>
    <h2 v-else-if="level === 2">我是标题</h2>
    <h3 v-else-if="level === 3">我是标题</h3>
    <h4 v-else-if="level === 4">我是标题</h4>
    <h5 v-else-if="level === 5">我是标题</h5>
    <h6 v-else>我是标题</h6> -->
    <TestDemo />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "你好世界",
      text: "",
      level: 6,
    };
  },
  methods: {
    change(ev) {
      this.text = ev.target.value;
    },
  },
  mounted() {
    setTimeout(() => {
      this.msg = "hello world";
    }, 1000);
  },
};
/*
 Vue2中，实现数据驱动视图渲染，是对数据进行了劫持  Object.defineProperty「get/set」
 Vue3中也是基于数据劫持实现数据驱动视图渲染的 Proxy

 Vue中，视图更改，让对应的数据更改，基于 v-model 实现的
 */
</script>

<style lang="less">
</style>
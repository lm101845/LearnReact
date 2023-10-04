<template functional>
  <div class="box">
    {{ num }}
    <br />
    <button>新增</button>
  </div>
</template>

<script>
// http://fivedodo.com/upload/html/vuejs3/guide/migration/functional-components.html
export default {
  name: "TestDemo",
  data() {
    return {
      num: 100,
    };
  },
  methods: {
    change() {
      this.num++;
    },
  },
};
</script>
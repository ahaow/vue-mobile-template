<template>
  <!-- <div class="other">
    <div class="item" v-for="i in data" :key="i.id">
      <img :src="i.img" alt />
      <span class="title">{{i.value}}</span>
    </div>
  </div>-->
  <div>
    <ul id="container"></ul>
  </div>
</template>

<script>
import data from "./../../assets/data/data.json";
export default {
  name: "other",
  data() {
    return {
      data,
    };
  },
  methods: {},
  mounted() {
    let now = Date.now();
    let ul = document.getElementById("container");
    let total = 10000;
    let once = 20;
    let page = total / once;
    let index = 0;

    function loop(curTotal, curIndex) {
      if (curTotal <= 0) {
        return false;
      }
      let pageCount = Math.min(curTotal, once);
      window.requestAnimationFrame(() => {
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < pageCount; i++) {
          let li = document.createElement("li");
          li.innerText = `${curIndex + i} - index`;
          fragment.appendChild(li);
        }
        ul.appendChild(fragment);
        loop(curTotal - pageCount, curIndex + pageCount);
      });
    }

    loop(total, index);
  },
};
</script>

<style lang="scss" scoped>
// multi-column
// .other {
//   /** 描述元素的列数 */
//   column-count: 3;
//   /** 描述元素的列与列之间的直线 */
//   column-rule: 1px inset blue;
//   /** 描述元素的列与列之间的间距 */
//   column-gap: 10px;
//   padding: 10px;
//   .item {
//     break-inside: avoid;
//     border: 1px solid #999;
//     margin-bottom: 10px;
//     img {
//       width: 100%;
//       vertical-align: middle;
//     }
//     .title {
//       display: block;
//       margin-left: 5px;
//     }
//   }
// }
</style>
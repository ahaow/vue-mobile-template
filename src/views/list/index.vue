     
<template>
  <div class="infinite-list-container" ref="list" @scroll="scrollEvent($event)">
    <div class="infinite-list-phantom" :style="{height: listHeight + 'px'}"></div>
    <div class="infinite-list" :style="{transform: getTransform}">
      <div
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{height: itemSize + 'px', lineHeight: itemSize + 'px'}"
      >{{item.value}}</div>
    </div>
  </div>
</template>

<script>
let d = [];
for (let i = 0; i < 10000; i++) {
  d.push({ id: i, value: i });
}
export default {
  name: "list",
  data() {
    return {
      listData: d,
      itemSize: 100,
      screenHeight: null,
      visibleCount: 0,
      start: 0,
      end: 0,
      startOffset: 0,
    };
  },
  computed: {
    listHeight() {
      return this.listData.length * this.itemSize;
    },
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    visibleData() {
        return this.listData.slice(this.start,Math.min(this.end,this.listData.length));
    }
  },
  methods: {
      scrollEvent(event) {
        let scrollTop = this.$refs.list.scrollTop;
        this.start = Math.floor(scrollTop / this.itemSize);
        this.end = this.start + this.visibleCount;
        this.startOffset = scrollTop - (scrollTop % this.itemSize)
      }
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight;
    this.visibleCount = Math.ceil(this.screenHeight / this.itemSize);
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
};
</script>

<style lang="scss" scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
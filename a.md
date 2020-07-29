# 长列表渲染

## 时间分片

### 使用setTimeout

> 使用异步方式,分批次渲染dom

```html
<ul id="container"></ul>

<script>
    let ul = document.getElementById("container");

    let total = 10000;
    let once = 20;
    let page = total /once;
    let index = 0;

    function loop(curTotal,curIndex) {
        if(curTotal <=0 ) {
            return false;
        }
        let pageCount = Math.min(curTotal,once);
        setTimeout(() => {
            for (let i = 0; i < pageCount; i++) {
                let li = document.createElement("li")
                li.innerText = `${i} - index`;
                ul.appendChild(li)
            }
            loop(curTotal-pageCount, curIndex + pageCount)
        });
    }
    loop(total,index)
</script>
```

**问题：下拉滑动会出现闪屏白屏现象**


**使用requestAnimationFrame()和documentFragment**

documentFragment是DOM节点, 但不是DOM数的一部分, 是可以存着内存中,当子元素插入到文档片段时, 是不会触发回流的

```js
window.requestAnimationFrame(() => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < pageCount; i++) {
        let li = document.createElement("li");
        li.innerText = `${i} --- index`
        fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    loop(curTotal-pageCount, curIndex + pageCount);
})

loop(total,index);
```

## 虚拟列表

> 虚拟列表其实是按需显示的一种实现，即只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染的技术，从而达到极高的渲染性能。

```vue
<template>
  <div class="infinite-list-container" ref="list" @scroll="scrollEvent">
    <div class="infinite-list-phantom" :style="{height: totalHeight + 'px'}"></div>
    <div class="infinite-list" :style="{transform: getTransform}">
      <div
        class="infinite-list-item"
        v-for="item in visiblelist"
        :key="item.id"
        :style="{height: itemSize + 'px', lineHeight: itemSize + 'px'}"
      >{{item.value}}</div>
    </div>
  </div>
</template>

<script>
let d = [];
for (let i = 1; i <= 100; i++) {
  d.push({
    id: i,
    value: `${i} - index`,
  });
}

export default {
  name: "cs",
  data() {
    return {
      listData: d,
      itemSize: 100,
      screenHeight: null,
      visibleCount: null,
      start: null,
      end: null,
      startOffset: 0,
    };
  },
  computed: {
    // 获取总数据的如果渲染dom的总长度
    totalHeight() {
      return this.listData.length * this.itemSize;
    },
    // 可视区域中的数据长度
    visiblelist() {
      return this.listData.slice(
        this.start,
        Math.min(this.end, this.listData.length)
      );
    },
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
  },
  methods: {
    scrollEvent() {
      let scrollTop = this.$refs.list.scrollTop;
      // 滚动下的时候, 获取可视区域中的显示的第一个列表的索引值
      this.start = Math.floor(scrollTop / this.itemSize);
      // 滚动下的时候, 获取可视区域中的显示的最后一个列表的索引值
      this.end = this.start + this.visibleCount;
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
    },
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight; // 获取列表盒子的可视区域高度
    this.visibleCount = Math.ceil(this.screenHeight / this.itemSize); // 根据列表区域的可视高度 / 每列所需的高度 = 获取可视区域显示多少条数据
    this.start = 0;
    this.end = this.visibleCount;
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
```

**问题：该方法只局限于每列设置固定宽高, 对于那些不确定高度的, 此方法有问题**

**第三方开源库: vue-virtual-scroll-list**
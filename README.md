### 基于vue的dom复制功能，可以将dom复制为png图片到剪贴板
+ import canvas2clipboard from 'canvas2clipboard'
+ Vue.use(canvas2clipboard)

demo:
```
<div class="png-wrap" ref="pngWrap">
   <img width="600px" :src="require('../assets/shuiku.jpg')" alt="">
</div>
<!-- <canvas ref="pngWrap"> ... </canvas> -->
<button v-canvas2clipboard="copypng()">复制图片</button>

copypng() {
    return {
        target: 'pngWrap',
        scale: 1,
        handler: (param) => {
            console.log(param);
        },
    }
}
```

简单实现，主要是提供思路，目前还存在较严重的兼容问题，以后会逐步替代execCommand

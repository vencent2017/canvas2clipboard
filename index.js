/**
 * js复制图片到剪贴板
 * 复制到剪贴板图片默认png
 * v-copy2clipboard
 */
// import html2canvas from 'html2canvas';
class copy2clipboard {
    constructor(el, binding, vnode) {
        const { target, scale=1, handler: callback, } = binding.value;
        this.scale = scale;
        // 绑定事件
        el.addEventListener('click', () => {
            if (typeof ClipboardItem !== 'function' || !navigator.clipboard) {
                callback({
                    success: false,
                    errorCode: '1',
                    info: '浏览器不支持navigator.clipboard，无法复制到剪贴板'
                })
                return;
            }
            // this.dom2Image(vnode.context.$refs[target], (canvas) => {
            //     this.canvas2blob(canvas, (blob) => {
            //         this.copy(blob, canvas, (result) => {
            //             callback(result)
            //         })
            //     })
            // })
            // npm 不允许发布外部依赖项，此处直接传入canvas
            this.canvas2blob(vnode.context.$refs[target], (blob) => {
                this.copy(blob, canvas, (result) => {
                    callback(result)
                })
            })
        })
    }
    // dom 转 canvas
    // dom2Image(dom, done) {
    //     html2canvas(dom, {
    //         useCORS: true,
    //         scale: this.scale || 1,
    //     }).then(canvas => {
    //         done(canvas);
    //     });
    // }
    // canvas 转 blob
    canvas2blob(canvas, done) {
        canvas.toBlob( blob => {
            done(blob)
        })
    }
    // 复制到剪贴板
    copy(blob, canvas, done) {
        navigator.clipboard.write([
            // eslint-disable-next-line no-undef
            new ClipboardItem({
                [blob.type]: blob
            })
        ]).then(() => {
            done({
                canvas,
                blob,
                success: true,
            })
        }).catch(() => {
            done({
                success: false,
                errorCode: '2',
                info: '浏览器未获取权限'
            })
        });
    }
}

export default {
    install: (Vue) => {
        Vue.directive('copy2clipboard', {
            bind: function (el, binding, vnode) {
                new copy2clipboard(el, binding, vnode)
            }
        });
    }
}
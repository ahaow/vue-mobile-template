# 自定义视频播放器

## 监听canplay 获取总时长

video中的canplay事件, 在浏览器可以播放时触发

通常在该事件里获取视频播放总时长

```js
this.video.addEventListener("canplay", () => {
    // 获取视频总时长 
    console.log(this.video.duration)
    // 简单格式化
    let hours = Math.floor(this.video.duration / 60)
    let minutes = Math.floor(this.video.duration % 60)
    hours < 10 ? (hours = "0" + hours) : (hours = hours)
    minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes)
    this.durationNum = this.video.duration
})
```

## 监听timeupdate 获取当前播放时间

```js
this.video.addEventListener("timeupdate", () => {
    // 获取当前播放时间
    console.log(Math.floor(this.video.currentTime))
    // 格式化
    let time = Math.floor(this.video.currentTime)
    let str
    if (time < 10) {
        str = "00:0" + time
    } else if (time >= 10 && time <= 59) {
        str = "00:" + time
    } else if (time >= 60) {
        let h = Math.floor(time / 60)
        let m = Math.floor(time % 60)
        h < 10 ? (h = "0" + h) : (h = h)
        m < 10 ? (m = "0" + m) : (m = m)
        str = h + ":" + m
    }
    this.currentTime = str
    let result = (time / this.durationNum) * 100
})
```

## 监听ended 视频播放结束

```js
this.video.addEventListener("ended", () => {})
```

## 监听play 视频播放
```js
this.video.addEventListener("play", () => {})
```

## 监听pause 视频暂停
```js
this.video.addEventListener("pause", () => {})
```

## 控制视频播放器全屏
```js
function videoFullScreen() {
    const videoDom = this.$refs.video;
    if (videoDom.requestFullscreen) {
        videoDom.requestFullscreen();
    } else if (videoDom.mozRequestFullScreen) {
        videoDom.mozRequestFullScreen();
    } else if (videoDom.webkitRequestFullScreen) {
        videoDom.webkitRequestFullScreen();
    }
}
```

## 控制视频播放器网页全屏
```js
function requestFullScreen() {
    let docEle = document.documentElement;
    if (docEle.requestFullscreen) {
        docEle.requestFullscreen();
    } else if (docEle.mozRequestFullScreen) {
        docEle.mozRequestFullScreen();
    } else if (docEle.webkitRequestFullScreen) {
        docEle.webkitRequestFullScreen();
    }
}
```

## 控制开启视频画中画

```js
async handleCanvas() {
    try {
        if (this.video !== document.pictureInPictureElement) {
        await this.video.requestPictureInPicture();
    } else {
        await document.exitPictureInPicture();
    }
    // 进入画中画模式时候执行
    this.video.addEventListener("enterpictureinpicture", (event) => {
        event.preventDefault();
    });
    // 退出画中画模式时候执行
    this.video.addEventListener("leavepictureinpicture", (event) => {});
    } catch (error) {
        log(`> Argh! ${error}`);
    }  
}
```

## 监听 volumechange 音量变化

```js
this.video.addEventListener("volumechange", () => {
    if (this.video.volume <= 0) {
        this.isVolume = false;
    } else {
        this.isVolume = true;
    }
})
```

## 设置视频播放倍速

playbackRate

    * 1.0 正常速度
    * 0.5 半速

```js
this.video.playbackRate = 2.0
```

## 点击设置进度条播放当前进度

```js
handleClickPlayerControls(e) {
    // 1. 获取点击时的视频偏移量
    let offsetX = e.offsetX
    // 2. 获取视频条的总长度
    let controls = this.$refs.playerControls.offsetWidth
    // 3. 获取百分比
    let val = offsetX / controls
    // 根据总时长 拿到对应百分比的 时长
    let result = val * this.durationNum
    // 设置当前时长,并播放
    this.video.currentTime = result
    this.handlePlay()
    this.handleSeeked()
}
```

## 监听 seeked 已移动/跳跃到中的新位置时触发

```js
this.video.addEventListener("seeked", () => {} )
```


# css 边框hover

```css
        #draw-border {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        button {
            border: 0;
            background: none;
            text-transform: uppercase;
            color: #4361ee;
            font-weight: bold;
            position: relative;
            outline: none;
            padding: 10px 20px;
            box-sizing: border-box;
        }

        button::before,
        button::after {
            box-sizing: inherit;
            position: absolute;
            content: '';
            border: 2px solid transparent;
            width: 0;
            height: 0;
        }

        button::after {
            bottom: 0;
            right: 0;
        }

        button::before {
            top: 0;
            left: 0;
        }

        button:hover::after,
        button:hover::before {
            width: 100%;
            height: 100%;
        }

        button:hover::before {
            border-top-color: #4361ee;
            border-right-color: #4361ee;
            transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
        }

        button:hover::after {
            border-bottom-color: #4361ee;
            border-left-color: #4361ee;
            transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
        }
```
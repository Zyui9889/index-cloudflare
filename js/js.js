var canvas = document.getElementById("cas");
var ctx = canvas.getContext("2d");

// ========== 颜色常量定义 ==========
// 线条颜色常量 (RGBA格式)
const LINE_COLOR_R = 59;     // 红色分量
const LINE_COLOR_G = 129;    // 绿色分量
const LINE_COLOR_B = 246;    // 蓝色分量
const LINE_ALPHA_BASE = 0.2; // 基础透明度
const LINE_ALPHA_RANGE = 1.0; // 透明度变化范围

// 粒子颜色常量
const PARTICLE_COLOR = `rgba(${LINE_COLOR_R}, ${LINE_COLOR_G}, ${LINE_COLOR_B}, 0.8)`; // 粒子颜色使用线条颜色的80%透明度

// ========== 其他常量 ==========
const PARTICLE_COUNT = 300;      // 粒子数量
const INITIAL_DELAY = 100;       // 初始化延迟(ms)
const MOUSE_MAX_DISTANCE = 20000; // 鼠标最大影响距离
const PARTICLE_MAX_DISTANCE = 6000; // 粒子间最大连线距离
const MOUSE_ATTRACTION_FACTOR = 0.03; // 鼠标吸引力系数

resize();
window.onresize = resize;

// 同时修改resize函数，确保canvas大小正确
function resize() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // 保持canvas的显示尺寸和绘图尺寸一致
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
}

var RAF = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

// 鼠标活动时，获取鼠标坐标
var warea = { x: null, y: null, max: MOUSE_MAX_DISTANCE };
window.onmousemove = function (e) {
    e = e || window.event;

    // 获取canvas在页面中的位置
    var rect = canvas.getBoundingClientRect();

    // 计算鼠标相对于canvas的位置（考虑滚动）
    warea.x = e.clientX - rect.left;
    warea.y = e.clientY - rect.top;
};

window.onmouseout = function (e) {
    warea.x = null;
    warea.y = null;
};

// 添加粒子
// x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
var dots = [];
for (var i = 0; i < PARTICLE_COUNT; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var xa = Math.random() * 2 - 1;
    var ya = Math.random() * 2 - 1;

    dots.push({
        x: x,
        y: y,
        xa: xa,
        ya: ya,
        max: PARTICLE_MAX_DISTANCE
    })
}

// 延迟INITIAL_DELAY毫秒开始执行动画，如果立即执行有时位置计算会出错
setTimeout(function () {
    animate();
}, INITIAL_DELAY);

// 每一帧循环的逻辑
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
    var ndots = [warea].concat(dots);

    dots.forEach(function (dot) {

        // 粒子位移
        dot.x += dot.xa;
        dot.y += dot.ya;

        // 遇到边界将加速度反向
        dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
        dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;

        // 绘制点 - 使用常量颜色
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

        // 循环比对粒子间的距离
        for (var i = 0; i < ndots.length; i++) {
            var d2 = ndots[i];

            if (dot === d2 || d2.x === null || d2.y === null) continue;

            var xc = dot.x - d2.x;
            var yc = dot.y - d2.y;

            // 两个粒子之间的距离
            var dis = xc * xc + yc * yc;

            // 距离比
            var ratio;

            // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
            if (dis < d2.max) {

                // 如果是鼠标，则让粒子向鼠标的位置移动
                if (d2 === warea && dis > (d2.max / 2)) {
                    dot.x -= xc * MOUSE_ATTRACTION_FACTOR;
                    dot.y -= yc * MOUSE_ATTRACTION_FACTOR;
                }

                // 计算距离比
                ratio = (d2.max - dis) / d2.max;

                // 画线
                var alpha = LINE_ALPHA_BASE + ratio * LINE_ALPHA_RANGE;
                ctx.beginPath();
                ctx.lineWidth = ratio / 2;
                ctx.strokeStyle = `rgba(${LINE_COLOR_R}, ${LINE_COLOR_G}, ${LINE_COLOR_B}, ${alpha})`;
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(d2.x, d2.y);
                ctx.stroke();
            }
        }

        // 将已经计算过的粒子从数组中删除
        ndots.splice(ndots.indexOf(dot), 1);
    });

    RAF(animate);
}
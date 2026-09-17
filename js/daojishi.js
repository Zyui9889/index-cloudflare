// 常量定义 - 可在此修改目标日期和开始日期
const TARGET_DATE = new Date('2026-06-05T23:59:59'); // 目标日期
const START_DATE = new Date('2024-01-01T00:00:00');   // 开始日期

// DOM元素引用
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const progressFill = document.getElementById('progress-fill');
const progressFillper = document.getElementById('progress-percent');

// 变量初始化
let updateInterval = 1000; // 默认更新间隔为1秒（精确到秒）
let countdownInterval;

// 计算并更新倒计时和进度条
function updateCountdownAndProgress() {
    const now = new Date();
    // updateCurrentTime();

    // 确保当前时间在开始日期之后
    const currentTime = Math.max(now.getTime(), START_DATE.getTime());

    // 计算总时长和已过时长
    const totalDuration = TARGET_DATE.getTime() - START_DATE.getTime();
    const elapsedDuration = currentTime - START_DATE.getTime();

    // 计算剩余时间
    let remainingTime = TARGET_DATE.getTime() - currentTime;

    // 如果目标日期已过，则剩余时间为0
    if (remainingTime < 0) {
        remainingTime = 0;
    }

    // 计算剩余天数、小时、分钟、秒
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // 更新倒计时显示
    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');

    // 计算进度百分比
    let progress = 0;
    if (totalDuration > 0) {
        progress = Math.min(100, (elapsedDuration / totalDuration) * 100);
    }

    // 更新进度条
    progressFillper.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;

    // 进度颜色
    progressFill.style.background = "#3a7bd5";
}

// 设置精度（更新间隔）
function setPrecision(milliseconds) {
    updateInterval = milliseconds;

    // 清除现有计时器
    clearInterval(countdownInterval);

    // 根据精度设置立即更新一次
    updateCountdownAndProgress();

    // 设置新的计时器
    countdownInterval = setInterval(updateCountdownAndProgress, updateInterval);
}

// 初始化页面
function initialize() {
    // 初始化日期显示
    // initializeDates();

    // 设置默认精度为秒
    setPrecision(1000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initialize);

// 页面可见性变化时优化性能
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // 页面隐藏时清除计时器以节省资源
        clearInterval(countdownInterval);
    } else {
        // 页面重新可见时重新启动计时器
        setPrecision(updateInterval);
    }
});
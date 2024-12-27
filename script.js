// 获取主题切换按钮和body元素
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 主题切换功能
themeToggle.addEventListener('click', () => {
    // 切换深色模式类
    body.classList.toggle('dark-mode');
    
    // 更新主题图标
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// 平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 北京时间显示功能
function updateBeijingTime() {
    // 获取时间显示元素
    const timeElement = document.querySelector('#beijing-time span');
    // 设置时间格式选项
    const options = {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    // 更新时间的函数
    function update() {
        const beijingTime = new Date().toLocaleString('zh-CN', options);
        timeElement.textContent = beijingTime;
    }

    // 立即更新一次时间
    update();
    // 每秒更新一次时间
    setInterval(update, 1000);
}

// 当页面加载完成后启动时钟
document.addEventListener('DOMContentLoaded', updateBeijingTime);

// 音乐控制功能
document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isInitialized = false;

    // 音乐控制函数
    function toggleMusic() {
        try {
            if (!isInitialized) {
                // 第一次点击时加载音频
                backgroundMusic.load();
                isInitialized = true;
            }

            if (backgroundMusic.paused) {
                // 播放音乐
                let playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // 播放成功
                        musicToggle.classList.add('playing');
                    })
                    .catch(error => {
                        // 播放失败
                        console.error('播放失败:', error);
                        alert('音乐播放失败，请检查音频文件是否存在');
                    });
                }
            } else {
                // 暂停音乐
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
            }
        } catch (error) {
            console.error('音乐控制错误:', error);
        }
    }

    // 添加点击事件监听器
    musicToggle.addEventListener('click', toggleMusic);

    // 处理音频加载错误
    backgroundMusic.addEventListener('error', function(e) {
        console.error('音频加载错误:', e);
        alert('音频文件加载失败，请检查文件路径是否正确');
        musicToggle.style.display = 'none';
    });
}); 
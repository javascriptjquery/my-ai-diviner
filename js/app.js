// ==================== 状态管理 ====================
let currentCards = [];
let isDivining = false;

// ==================== DOM 元素引用 ====================
const questionInput = document.getElementById('questionInput');
const btnDivine = document.getElementById('btnDivine');
const cardsContainer = document.getElementById('cardsContainer');
const loadingSection = document.getElementById('loadingSection');
const readingSection = document.getElementById('readingSection');
const readingContent = document.getElementById('readingContent');
const questionReview = document.getElementById('questionReview');
const errorMessage = document.getElementById('errorMessage');
const btnReset = document.getElementById('btnReset');

// ==================== 生成星空背景 ====================
function generateStars() {
  const starsContainer = document.querySelector('.stars');
  const starCount = 200;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    star.style.setProperty('--min-opacity', Math.random() * 0.3);
    star.style.setProperty('--max-opacity', Math.random() * 0.7 + 0.3);
    star.style.animationDelay = `${Math.random() * 5}s`;
    starsContainer.appendChild(star);
  }
}

// ==================== 创建塔罗牌 DOM ====================
function createCardElement(card, index) {
  const wrapper = document.createElement('div');
  wrapper.className = 'card-wrapper';
  wrapper.dataset.index = index;
  
  wrapper.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-back">
        <div class="card-back-pattern">✦</div>
        <div class="card-back-text">AI TAROT</div>
      </div>
      <div class="card-face card-front">
        <div class="card-number">${String(card.id).padStart(2, '0')}</div>
        <div class="card-symbol">${card.symbol}</div>
        <div class="card-name">${card.name}</div>
        <div class="card-name-en">${card.nameEn}</div>
        <div class="card-status ${card.reversed ? 'reversed' : 'upright'}">
          ${card.reversed ? '◀ 逆位' : '▶ 正位'}
        </div>
        <div class="card-meaning">${card.meaning}</div>
      </div>
    </div>
  `;
  
  return wrapper;
}

// ==================== 翻牌动画 ====================
function flipCards() {
  return new Promise((resolve) => {
    const wrappers = cardsContainer.querySelectorAll('.card-wrapper');
    let flippedCount = 0;
    
    wrappers.forEach((wrapper, index) => {
      setTimeout(() => {
        wrapper.classList.add('flipped');
        flippedCount++;
        
        // 添加轻微的放大效果
        wrapper.style.transition = 'transform 0.3s ease';
        wrapper.style.transform = 'scale(1.05)';
        setTimeout(() => {
          wrapper.style.transform = 'scale(1)';
        }, 300);
        
        if (flippedCount === wrappers.length) {
          setTimeout(resolve, 500);
        }
      }, 300 + index * 600); // 依次翻牌，每张间隔0.6秒
    });
  });
}

// ==================== 打字机效果 ====================
function typeWriter(element, text, speed = 30) {
  return new Promise((resolve) => {
    let index = 0;
    element.innerHTML = '';
    
    function type() {
      if (index < text.length) {
        const char = text.charAt(index);
        let displayChar = char;
        
        // 处理换行
        if (char === '\n') {
          displayChar = '<br>';
        }
        
        // 显示当前字符
        element.innerHTML = text.substring(0, index + 1)
          .replace(/\n/g, '<br>') + '<span class="typing-cursor">|</span>';
        
        index++;
        
        // 随机速度变化，更自然
        const variance = Math.random() * 20 - 10;
        setTimeout(type, speed + variance);
      } else {
        // 移除光标
        element.innerHTML = text.replace(/\n/g, '<br>');
        resolve();
      }
    }
    
    type();
  });
}

// ==================== 执行占卜 ====================
async function performDivination() {
  const question = questionInput.value.trim();
  
  if (!question) {
    showError('请输入你想占卜的问题 ✨');
    questionInput.focus();
    return;
  }
  
  if (question.length < 2) {
    showError('问题太短了，请详细描述你的困惑 ✨');
    return;
  }
  
  // 重置状态
  isDivining = true;
  btnDivine.disabled = true;
  btnDivine.innerHTML = '<span class="btn-icon">🔮</span> 占卜中...';
  errorMessage.classList.remove('active');
  readingSection.classList.remove('active');
  loadingSection.classList.remove('active');
  
  // 随机抽取3张牌
  currentCards = getRandomCards(3);
  
  // 清空并渲染牌
  cardsContainer.innerHTML = '';
  currentCards.forEach((card, index) => {
    const cardEl = createCardElement(card, index);
    cardsContainer.appendChild(cardEl);
  });
  
  // 等待一小段时间后开始翻牌
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 执行翻牌动画
  await flipCards();
  
  // 翻牌完成后显示加载，开始请求 AI 解读
  loadingSection.classList.add('active');
  
  try {
    // 调用后端 API 获取解读
    const reading = await getTarotReading(question, currentCards);
    
    // 隐藏加载
    loadingSection.classList.remove('active');
    
    // 显示解读区
    questionReview.textContent = `关于「${question}」`;
    readingSection.classList.add('active');
    
    // 打字机效果展示解读
    await typeWriter(readingContent, reading, 35);
    
  } catch (error) {
    loadingSection.classList.remove('active');
    showError('🔮 占卜解读暂时无法获取，请稍后再试...');
    console.error('占卜失败:', error);
  } finally {
    isDivining = false;
    btnDivine.disabled = false;
    btnDivine.innerHTML = '<span class="btn-icon">🔮</span> 开始占卜';
  }
}

// ==================== 显示错误 ====================
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('active');
  setTimeout(() => {
    errorMessage.classList.remove('active');
  }, 5000);
}

// ==================== 重置占卜 ====================
function resetDivination() {
  if (isDivining) return;
  
  // 重置所有状态
  readingSection.classList.remove('active');
  loadingSection.classList.remove('active');
  errorMessage.classList.remove('active');
  
  // 清空牌
  cardsContainer.innerHTML = '';
  
  // 清空输入
  questionInput.value = '';
  
  // 重置按钮
  btnDivine.disabled = false;
  btnDivine.innerHTML = '<span class="btn-icon">🔮</span> 开始占卜';
  
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== 事件绑定 ====================
btnDivine.addEventListener('click', performDivination);

btnReset.addEventListener('click', resetDivination);

// 回车键触发占卜
questionInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!isDivining) {
      performDivination();
    }
  }
});

// ==================== 初始化 ====================
generateStars();

// 添加一些初始占卜示例提示
const exampleQuestions = [
  '我最近事业运如何？',
  '我的感情运势怎么样？',
  '最近有什么需要注意的吗？',
  '我的财运走向如何？'
];

questionInput.placeholder = `试试输入：${exampleQuestions[Math.floor(Math.random() * exampleQuestions.length)]}`;

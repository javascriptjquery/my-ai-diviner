const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 提供前端静态文件
app.use(express.static(path.join(__dirname, '..')));

app.post('/api/reading', async (req, res) => {
  try {
    const { question, cards } = req.body;

    if (!question || !cards || !Array.isArray(cards) || cards.length !== 3) {
      return res.status(400).json({ error: '请提供问题与3张牌的信息' });
    }

    const cardsDescription = cards.map((card, index) => {
      const positionNames = ['第一张（现状）', '第二张（挑战）', '第三张（建议/未来）'];
      return `${positionNames[index]}: ${card.name}（${card.reversed ? '逆位' : '正位'}）—— ${card.meaning}`;
    }).join('\n');

    const systemPrompt = `你是一位精通塔罗牌的 mystical 占卜师，名叫「星语者」。你的解读风格神秘而富有洞察力，语言优美且充满诗意，同时给出切实的指引。请以中文回复，保持200-300字左右。`;

    const userPrompt = `用户的问题：${question}

用户抽到的三张塔罗牌（已洗牌随机抽取）：
${cardsDescription}

请根据这三张牌的组合，结合用户的问题，给出深刻的占卜解读。格式要求：
1. 简要分析牌阵的整体能量
2. 每张牌的单独解读
3. 综合建议

请以「🔮 星语者为你解读」开头。`;

    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 2000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        }
      }
    );

    const reading = response.data.choices[0].message.content;
    res.json({ reading });
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error.response?.data || error.message);
    res.status(500).json({ error: '占卜解读生成失败，请稍后再试' });
  }
});

app.listen(PORT, () => {
  console.log(`🔮 AI 塔罗占卜服务器运行在 http://localhost:${PORT}`);
});

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { question, cards } = await request.json();

    if (!question || !cards || !Array.isArray(cards) || cards.length !== 3) {
      return new Response(JSON.stringify({ error: '请提供问题与3张牌的信息' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const positionNames = ['第一张（现状）', '第二张（挑战）', '第三张（建议/未来）'];
    const cardsDescription = cards.map((card, index) => {
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

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    const reading = data.choices[0].message.content;

    return new Response(JSON.stringify({ reading }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '占卜解读生成失败，请稍后再试' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
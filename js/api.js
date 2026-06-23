const API_BASE = '';

async function getTarotReading(question, cards) {
  try {
    const response = await fetch(`${API_BASE}/api/reading`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, cards })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '占卜解读请求失败');
    }

    const data = await response.json();
    return data.reading;
  } catch (error) {
    console.error('获取占卜解读失败:', error);
    throw error;
  }
}

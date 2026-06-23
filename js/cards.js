// 22张大阿卡纳塔罗牌
const TAROT_CARDS = [
  {
    id: 0,
    name: '愚者',
    nameEn: 'The Fool',
    meaning: '新的开始、冒险、天真、无限可能',
    symbol: '☀️',
    upright: '勇敢追梦、新旅程、活在当下',
    reversed: '冒险冲动、愚蠢的决定、不切实际',
    element: '风'
  },
  {
    id: 1,
    name: '魔术师',
    nameEn: 'The Magician',
    meaning: '创造力、技艺、自信、资源整合',
    symbol: '🔮',
    upright: '能力展现、创造性突破、把握机会',
    reversed: '欺骗、浪费天赋、缺乏方向',
    element: '水'
  },
  {
    id: 2,
    name: '女祭司',
    nameEn: 'The High Priestess',
    meaning: '直觉、潜意识、内在智慧、神秘',
    symbol: '🌙',
    upright: '倾听内心、等待时机、灵性觉醒',
    reversed: '直觉受阻、隐藏真相、表面化的判断',
    element: '水'
  },
  {
    id: 3,
    name: '皇后',
    nameEn: 'The Empress',
    meaning: '丰收、母性、自然、丰饶、美丽',
    symbol: '🌿',
    upright: '收获满满、温暖关怀、创造力爆发',
    reversed: '依赖、失去自我、创造力枯竭',
    element: '土'
  },
  {
    id: 4,
    name: '皇帝',
    nameEn: 'The Emperor',
    meaning: '权威、稳定、领导力、保护',
    symbol: '👑',
    upright: '掌控局面、建立秩序、责任担当',
    reversed: '专制、缺乏纪律、权力滥用',
    element: '火'
  },
  {
    id: 5,
    name: '教皇',
    nameEn: 'The Hierophant',
    meaning: '传统、信仰、教导、精神指引',
    symbol: '⛪',
    upright: '寻求指导、遵从传统、知识传授',
    reversed: '教条主义、过度依赖权威、叛逆',
    element: '土'
  },
  {
    id: 6,
    name: '恋人',
    nameEn: 'The Lovers',
    meaning: '爱情、选择、结合、价值观',
    symbol: '💞',
    upright: '真爱到来、重要选择、和谐关系',
    reversed: '关系失衡、选择困难、价值观冲突',
    element: '风'
  },
  {
    id: 7,
    name: '战车',
    nameEn: 'The Chariot',
    meaning: '胜利、意志力、决心、征服',
    symbol: '⚔️',
    upright: '克服困难、坚定前行、获得胜利',
    reversed: '缺乏方向、意志薄弱、暴力冲突',
    element: '水'
  },
  {
    id: 8,
    name: '力量',
    nameEn: 'Strength',
    meaning: '内在力量、勇气、耐心、同情',
    symbol: '🦁',
    upright: '内心强大、温柔的力量、克服恐惧',
    reversed: '软弱、自我怀疑、情绪失控',
    element: '火'
  },
  {
    id: 9,
    name: '隐士',
    nameEn: 'The Hermit',
    meaning: '内省、智慧、独处、指引',
    symbol: '🏮',
    upright: '自我反省、寻求真理、内在指引',
    reversed: '孤独、固执、逃避现实',
    element: '土'
  },
  {
    id: 10,
    name: '命运之轮',
    nameEn: 'Wheel of Fortune',
    meaning: '变化、循环、命运、转机',
    symbol: '🎡',
    upright: '好运降临、命运转折、新的机遇',
    reversed: '厄运、计划外变化、失控的局面',
    element: '火'
  },
  {
    id: 11,
    name: '正义',
    nameEn: 'Justice',
    meaning: '公平、真理、因果、平衡',
    symbol: '⚖️',
    upright: '公平裁决、因果报应、诚实面对',
    reversed: '不公、偏袒、逃避责任',
    element: '风'
  },
  {
    id: 12,
    name: '倒吊人',
    nameEn: 'The Hanged Man',
    meaning: '牺牲、新的视角、暂停、觉悟',
    symbol: '🪢',
    upright: '换位思考、自愿牺牲、灵性成长',
    reversed: '拖延、抗拒改变、无谓牺牲',
    element: '水'
  },
  {
    id: 13,
    name: '死神',
    nameEn: 'Death',
    meaning: '终结、转变、新生、放下',
    symbol: '💀',
    upright: '结束旧篇章、深刻转变、重生前兆',
    reversed: '抗拒变化、停滞不前、恐惧改变',
    element: '水'
  },
  {
    id: 14,
    name: '节制',
    nameEn: 'Temperance',
    meaning: '平衡、适度、调和、耐心',
    symbol: '🕊️',
    upright: '调和矛盾、保持耐心、中庸之道',
    reversed: '失衡、急功近利、过度放纵',
    element: '火'
  },
  {
    id: 15,
    name: '恶魔',
    nameEn: 'The Devil',
    meaning: '束缚、执着、欲望、物质主义',
    symbol: '😈',
    upright: '面对欲望、打破束缚、看清真相',
    reversed: '摆脱控制、觉醒、重获自由',
    element: '土'
  },
  {
    id: 16,
    name: '高塔',
    nameEn: 'The Tower',
    meaning: '剧变、崩塌、觉醒、重建',
    symbol: '🗼',
    upright: '突如其来的改变、打破幻象、重塑',
    reversed: '避免灾难、抗拒改变、延迟的危机',
    element: '火'
  },
  {
    id: 17,
    name: '星星',
    nameEn: 'The Star',
    meaning: '希望、灵感、平静、指引',
    symbol: '⭐',
    upright: '充满希望、灵感涌现、内心平静',
    reversed: '失去希望、缺乏信心、灵感枯竭',
    element: '风'
  },
  {
    id: 18,
    name: '月亮',
    nameEn: 'The Moon',
    meaning: '幻觉、恐惧、潜意识、不确定',
    symbol: '🌕',
    upright: '面对恐惧、探索潜意识、直觉指引',
    reversed: '走出迷雾、释放恐惧、真相显现',
    element: '水'
  },
  {
    id: 19,
    name: '太阳',
    nameEn: 'The Sun',
    meaning: '快乐、成功、活力、真理',
    symbol: '☀️',
    upright: '巨大成功、充满活力、喜悦无比',
    reversed: '短暂快乐、骄傲自满、缺乏热情',
    element: '火'
  },
  {
    id: 20,
    name: '审判',
    nameEn: 'Judgement',
    meaning: '复活、觉醒、审视、新生',
    symbol: '📯',
    upright: '自我觉醒、接受召唤、重新开始',
    reversed: '自我怀疑、拒绝改变、悔恨过去',
    element: '火'
  },
  {
    id: 21,
    name: '世界',
    nameEn: 'The World',
    meaning: '完成、圆满、达成、整合',
    symbol: '🌍',
    upright: '圆满达成、目标实现、和谐统一',
    reversed: '未完成、延迟成功、缺乏整合',
    element: '土'
  }
];

// 根据问题关键词获取相关牌（增加随机元素）
function getRandomCards(count = 3) {
  const shuffled = [...TAROT_CARDS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count).map(card => ({
    ...card,
    reversed: Math.random() > 0.5 // 随机正位/逆位
  }));
}

import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL_NAME = 'deepseek/deepseek-r1-0528:free';

export const callAI = async (prompt: string): Promise<string> => {
  const apiKey = localStorage.getItem('openrouter_api_key');
  
  if (!apiKey) {
    throw new Error('请先在设置页面配置API Key');
  }

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: MODEL_NAME,
        messages: [
          {
            role: 'system',
            content: `你是一位经验丰富的语文教师和文学创作专家，具有深厚的教育背景和丰富的教学经验。你的任务是帮助教师创作高质量的示范作文，包括生成作文大纲、段落内容分析和全文润色。

你的专业能力包括：
1. 深入理解不同年龄段学生的认知特点和语言水平
2. 熟练掌握各种文体的写作技巧和结构特点
3. 具备敏锐的文学鉴赏能力和语言表达能力
4. 能够进行专业的文本分析和教学指导

请始终保持专业、准确、有教育价值的回答风格。`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Zhuzi - Teacher Essay Tool'
        }
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      let content = response.data.choices[0].message.content.trim();
      
      // 更强健地提取JSON内容
      // 首先尝试提取```json代码块中的内容
      const jsonBlockMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonBlockMatch) {
        content = jsonBlockMatch[1].trim();
      } else {
        // 如果没有找到```json块，尝试提取普通```块中的内容
        const codeBlockMatch = content.match(/```\s*([\s\S]*?)\s*```/);
        if (codeBlockMatch) {
          content = codeBlockMatch[1].trim();
        }
      }
      
      return content.trim();
    } else {
      throw new Error('AI响应格式错误');
    }
  } catch (error: any) {
    console.error('AI调用错误:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error?.message || '未知错误';
      
      switch (status) {
        case 401:
          throw new Error('API Key无效，请检查设置');
        case 402:
          throw new Error('账户余额不足，请充值');
        case 429:
          throw new Error('请求过于频繁，请稍后重试');
        case 500:
          throw new Error('服务器错误，请稍后重试');
        default:
          throw new Error(`API调用失败: ${message}`);
      }
    } else if (error.request) {
      throw new Error('网络连接失败，请检查网络设置');
    } else {
      throw new Error('请求配置错误');
    }
  }
};

// 检查API Key是否已配置
export const isApiKeyConfigured = (): boolean => {
  const apiKey = localStorage.getItem('openrouter_api_key');
  return !!(apiKey && apiKey.trim());
};

// 验证API Key格式
export const validateApiKey = (apiKey: string): boolean => {
  return apiKey.trim().startsWith('sk-or-') && apiKey.trim().length > 20;
};
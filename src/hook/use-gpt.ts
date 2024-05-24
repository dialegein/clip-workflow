import { useEffect, useMemo, useState } from "react";
import { getGPT, isApiResponseSuccess } from "../api";
import { TemplateType } from "../util/const";

// 生成主题文案
export function useGPTTitle() {
  const [loading, setLoading] = useState(false);
  const [ans, setAns] = useState("");
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    if (ans !== "") {
      setTitles(ans.split("；"));
    }
  }, [ans, setTitles]);

  function mutate(info: string) {
    const prompt = `${info}
# 输出内容
结合上面的资料， 生成10个标题文案， 可以适当参考下面几种起名模式和示例
颠覆认知
示例： 丑闻才是对成功者的奖励
菜鸟逆袭
示例： 效率暴增900%，快速提升每日执行力！
技能速成
示例：1分钟就学会的小技巧，让你的PPT更高级，学不会你来打我
与钱相关
示例：又是帮国蜜省钱的一天，花了30帮她做了一个月球灯，直接省了1000块
借势名人
示例：欧阳娜娜干金妆保姆级教程
行业内幕：
示例： 美容行业的水到底有多深？
强烈反差：
示例：沉浸式体验已婚男人带娃的一天
情绪共鸣
示例：人很奇怪，不喜欢别人骗自己，却喜欢自己骗自己 
猎奇心理
示例：花8888元的猪景房
#输出格式
1. 不要有序号
2. 简洁精炼，标题不包含参考的模式名称
3. 不要出现引号，冒号，破折号等特殊字符
4. 每个标题用；分割， 不要有多余的输出`;

    setLoading(true);
    return getGPT(prompt)
      .then((res) => {
        if (isApiResponseSuccess(res)) {
          setAns(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return {
    mutate,
    loading,
    titles,
    resetTitles: () => setTitles([]),
    setTitles: setTitles,
  };
}

// 通过主题和结构生成对应每个片段的文案
export function useGPTEffect() {
  const [loading, setLoading] = useState(false);
  const [ans, setAns] = useState("{}");

  const effects = useMemo(() => {
    try {
      return JSON.parse(ans);
    } catch (e) {
      return [];
    }
  }, [ans]);

  function mutate(info: string, theme: string, template: TemplateType) {
    const prompt = `# 角色
你是一个短视频后期制作师，给你一个固定的脚本，请你为脚本补充效果，效果分为口播和文字
${info}
# 脚本结构
${template.block.map((b, i) => `${i + 1}.${b.description}`).join("\n")}
# 示例
1 显示文字并口播：准备好挖掘笑声的秘密了吗
2. 无
3. 显示文字：五段相声 
4. 显示文字：五段相声 
5. 显示文字：两个小时的快乐
6. 显示文字：坐在前排
7. 显示文字：笑声最响
8. 显示文字：票价仅100至200元
# 输出要求
1. 请随机生成口播或文字，简洁精炼，诙谐风趣， 少于15个字
2. 请结合主题：${theme}
3 一共${template.block.length}行，效果的描述方式参考示例

    `;
    setLoading(true);
    return getGPT(prompt)
      .then(async (res) => {
        if (isApiResponseSuccess(res)) {
          await effectToJson(res.data).then((_res) => {
            console.log("_res====", _res);
            setAns(_res ?? "");
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return {
    mutate,
    loading,
    effects,
  };
}

export function effectToJson(effect: string) {
  const prompt = `# 目标
将语义化的数据转化为json

# 输入
1. 显示文字并口播：准备好挖掘笑声的秘密了吗
2. 无
3. 显示文字：五段相声 
4. 显示文字：五段相声 
5. 显示文字：两个小时的快乐
6. 显示文字：坐在前排
7. 显示文字：笑声最响
8. 显示文字：票价仅100至200元

# 输出格式
一个序列化后的json字符串，不要有其他多余的输出, 不要用md格式包裹

# 输出
[{"text":"准备好挖掘笑声的秘密了吗","voice":"准备好挖掘笑声的秘密了吗"},{"text":"","voice":""},{"text":"五段相声","voice":""},{"text":"五段相声","voice":""},{"text":"两个小时的快乐","vocie":""},{"text":"坐在前排","voice":""},{"text":"笑声最响","voice":""},{"text":"票价仅100至200元","voice":""}]
# 输入
${effect}

# 输出`;
  return getGPT(prompt).then((res) => {
    if (isApiResponseSuccess(res)) {
      return res.data;
    }
  });
}

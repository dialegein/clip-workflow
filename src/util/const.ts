export const templateDemo: TemplateType = {
  id: 1,
  name: "嘻哈包袱铺模板v1",
  theme: "颠覆认知", // 9个
  block: [
    {
      target: {
        source: ["sign"],
        keyword: ["招牌", "门头"],
      },
      duration: 3,
      text: {
        required: true,
        prompt: "场景是外面的招牌特写，围绕主题，生成开场语",
      },
      description: "外部场馆的招牌特写",
    },
    {
      target: {
        source: ["inner"],
        keyword: ["内部场景"],
      },
      duration: 3,
      text: {
        required: true,
        prompt: "场景是场馆内部",
      },
      description: "进入场馆内部",
    },
    {
      target: {
        source: ["perf1"],
        keyword: ["相声精彩片段"],
      },
      duration: 3,
      text: {
        required: true,
        prompt: "场景是第一段相声的精彩片段",
      },
      description: "第一段相声的精彩片段",
    },
    {
      target: {
        source: ["perf2"],
        keyword: ["相声精彩片段"],
      },
      duration: 5,
      text: {
        required: true,
        prompt: "场景是第二段相声的精彩片段",
      },
      description: "第二段相声的精彩片段",
    },
    {
      target: {
        source: ["perf3"],
        keyword: ["相声精彩片段"],
      },
      duration: 5,
      text: {
        required: true,
        prompt: "场景是第三段相声的精彩片段",
      },
      description: "第三段相声的精彩片段",
    },
    {
      target: {
        source: ["perf4"],
        keyword: ["相声精彩片段"],
      },
      duration: 5,
      text: {
        required: true,
        prompt: "场景是第四段相声的精彩片段",
      },
      description: "第四段相声的精彩片段",
    },
    {
      target: {
        source: ["perf5"],
        keyword: ["相声精彩片段"],
      },
      duration: 5,
      text: {
        required: true,
        prompt: "场景是第五段相声的精彩片段",
      },
      description: "第五段相声的精彩片段",
    },
    {
      target: {
        source: ["ticket"],
        keyword: ["门票"],
      },
      duration: 4,
      text: {
        required: true,
        prompt: "场景是门票的特写, 生成一段文案，目的是宣传票务",
      },
      description: "门票的特写",
    },
  ],
};

export const testData = {
  info: `# 背景
嘻哈包袱铺，成立于2008年5月16日，在经营嘻哈包袱铺和弘扬中国传统相声的同时，兼顾曲艺、话剧等多方面文化经营活动，弘扬中国传统相声的同时，兼顾曲艺、话剧等多方面文化经营活动；拥有近百名相声演员和专业化营运团队。从单一相声演出转变为相声剧、喜剧小品、话剧、网剧、电影等多种表演形式共存。
# 票务信息资料：
《嘻哈包袱铺》
# 地点
五棵松华熙live
# 平台
点击下方链接购买，现场自助取票机扫码取票，也可现场买
票价:100-220元，有些日期有折扣
# 布局
每一排有4到5张桌子，一张桌子周围坐6个人，前两排宽敞，椅子有扶手有靠垫，更舒服。从第三排开始就是每排5张桌子，椅子也没有扶手。带娃强烈建议坐第一排，看得清楚，而且还容易和演员互动。
# 内容
一场5段相声，2个多小时，表演结束后所有演员返场，各自表演一下绝活，也是笑声不断。感觉第一个出场的演员真的挺不容易，要热场很久。`,
  titleOptions: [
    "相声新体验：一票畅游嘻哈包袱铺",
    "笑翻五棵松华熙live，嘻哈包袱铺独家幕后",
    "想省钱看相声？100元起的幸福",
    "独家揭秘：嘻哈包袱铺的幕后故事",
    "感受相声的魅力，带娃更要坐前排",
    "与演员零距离，前排观众的特权体验",
    "开怀大笑两小时，嘻哈包袱铺精彩不停",
    "舒适与欢笑，体验前排VIP般享受",
    "第一排的秘密：与相声演员互动的最佳位置",
    "节省下来的钱去哪了？看相声更聪明的选择",
  ],
  title: "翻转嘻哈笑剧——五棵松华熙LIVE带您进入相声新纪元",
  text: [
    "五棵松华熙LIVE的招牌门头熠熠生辉",
    "内部场景打造专为翻转嘻哈笑剧",
    "相声精彩片段带您笑翻天",
    "相声精彩片段又一个笑点来袭",
    "相声精彩片段，笑声不停歇",
    "相声精彩片段，高潮迭起保证笑点",
    "相声精彩片段，层出不穷的幽默",
    "门票火热抢购中，不容错过",
  ],
  bgm: "/Users/howie/Desktop/xiha/test/bgm/bgm1.mp3",
  material: "/Users/howie/Desktop/xiha/test",
};

export type AIRuleType = {
  desc?: string;
};

export type BlockType = {
  target: {
    source: string[];
    keyword: string[];
  };
  duration: number;
  text:
    | {
        required: true;
        prompt: string;
      }
    | {
        required: false;
      };

  description?: string;
};

export type TemplateType = {
  id: number;
  name: string;
  theme: string;
  block: Array<BlockType>;
  bgm?: {
    source: string;
    duration: number;
  };
};

export type VideoType = {
  path: string;
  keywords?: string[];
  description?: string;
  duration: number;
};
export const allResource: VideoType[] = [
  {
    path: "/xxxx/",
    keywords: ["门头", "招牌", "店铺", "店面", "门面"],
    description: "外景门头",
    duration: 3,
  },
  {
    path: "/yyyyy",
    keywords: ["门头", "招牌", "店铺", "店面", "门面"],
    description: "外景门头",
    duration: 3,
  },
];

export type ClipDataType = {
  source: string;
  duration: number;
  subtitle?: string;
  "voice-text"?: string;
};

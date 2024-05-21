export const templateDemo: TemplateType = {
  id: 1,
  name: "嘻哈包袱铺模板v1",
  theme: "颠覆认知", // 9个
  block: [
    {
      target: {
        source: ["sign"],
        keyword: [],
      },
      duration: 3,
      text: {
        required: false,
      },
      length: {
        min: 1,
        max: 1,
      },
    },
    {
      target: {
        source: ["inner"],
        keyword: [],
      },
      duration: 3,
      text: {
        required: false,
      },
      length: {
        min: 1,
        max: 1,
      },
    },
    {
      target: {
        source: ["perf1"],
        keyword: [],
      },
      duration: {
        min: 3,
        max: 5,
      },
      text: {
        required: false,
      },
      length: {
        min: 1,
        max: 1,
      },
    },
    {
      target: {
        source: ["perf2"],
        keyword: [],
      },
      duration: {
        min: 3,
        max: 5,
      },
      text: {
        required: false,
      },
      length: {
        min: 1,
        max: 1,
      },
    },
    {
      target: {
        source: ["perf3"],
        keyword: [],
      },
      duration: {
        min: 3,
        max: 5,
      },
      text: {
        required: false,
      },
      length: {
        min: 1,
        max: 1,
      },
    },
    {
      target: {
        source: ["perf4"],
        keyword: [],
      },
      duration: {
        min: 3,
        max: 5,
      },
      text: {
        required: false,
      },
      length: {
        min: 1,
        max: 1,
      },
    },
    {
      target: {
        source: ["perf5"],
        keyword: [],
      },
      duration: {
        min: 3,
        max: 5,
      },
      text: {
        required: false,
      },
      length: {
        min: 1,
        max: 1,
      },
    },
    {
      target: {
        source: ["ticket"],
        keyword: [],
      },
      duration: {
        min: 3,
        max: 5,
      },
      text: {
        required: false,
      },
      length: {
        min: 1,
        max: 1,
      },
    },
  ],
};

export type AIRuleType = {
  desc?: string;
};

export type BlockType = {
  target: {
    source: string[];
    keyword: string[];
  };
  duration:
    | number
    | {
        min: number;
        max: number;
      };
  text:
    | {
        required: true;
        prompt: string;
      }
    | {
        required: false;
      };
  length:
    | {
        min: number;
        max: number;
      }
    | number;
};

export type TemplateType = {
  id: number;
  name: string;
  theme: string;
  block: Array<BlockType>;
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
};

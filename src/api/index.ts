import ky from "ky";
import {
  ClipDataType,
  TemplateType,
  VideoType,
  templateDemo,
} from "../util/const";

// 定义响应的基本结构
interface ApiResponseBase {
  code: number;
}

// 定义当 code 为 0 时的结构
interface ApiResponseSuccess<T> extends ApiResponseBase {
  code: 0;
  data: T;
}

// 定义当 code 不为 0 时的结构
interface ApiResponseError extends ApiResponseBase {
  code: number; // 具体的错误代码
  message: string;
}

// 使用联合类型定义完整的响应类型
type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

// 类型守卫函数
export function isApiResponseSuccess<T>(
  response: ApiResponse<T>
): response is ApiResponseSuccess<T> {
  return response.code === 0;
}

export function getSourceMeta(options: { refresh: boolean; path: string }) {
  return ky
    .get("http://localhost:8000/material/structure", {
      searchParams: options,
    })
    .then((res) => res.json<ApiResponse<VideoType[]>>());
}

export function generateVideo(clips: ClipDataType[]) {
  return ky.post("http://localhost:8000/video/clip", {
    timeout: 1000 * 60 * 10,
    json: clips,
  });
}

export function getTemplate() {
  return Promise.resolve({
    code: 0,
    data: [templateDemo],
  }) as Promise<ApiResponseSuccess<TemplateType[]>>;
}

export function getGPT(text: string) {
  return ky.post("http://localhost:8000/gpt/text", {
    timeout: 1000 * 60 * 10,
    json: {
      system: "",
      user: text,
    },
  }).then(res => res.json<ApiResponse<string>>())
}

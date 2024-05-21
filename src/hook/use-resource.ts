import { atom, useAtom } from "jotai";
import { VideoType } from "../util/const";
import { getSourceMeta, isApiResponseSuccess } from "../api";
import { useState } from "react";

const resourceAtom = atom<VideoType[]>([]);

export function useResource() {
  const [resource, setResource] = useAtom(resourceAtom);
  const [loading, setLoading] = useState(false);
  const mutate = (path: string) => {
    setLoading(true);
    setResource([]);
    getSourceMeta({
      path: path,
      refresh: false,
    }).then((res) => {
      if (isApiResponseSuccess(res)) {
        setResource(res.data);
        setLoading(false);
      } else {
        // 路径没有解析过，需要重新解析
        getSourceMeta({
          path,
          refresh: true,
        }).then((res) => {
          if (isApiResponseSuccess(res)) {
            setResource(res.data);
            setLoading(false);
          }
        });
      }
    });
  };
  return {
    resource,
    mutate,
    loading,
  };
}

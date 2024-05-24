import { atom, useAtom } from "jotai";
import { VideoType } from "../util/const";
import { getSourceMeta, isApiResponseSuccess } from "../api";
import { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash-es";
import { buildFileTree } from "../util/path";

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

  // 默认初始化
  useEffect(() => {
    if (isEmpty(resource)) {
      const saved = localStorage.getItem("resource");
      if (saved) {
        mutate(saved);
      }
    }
  }, []);

  const treeResource = useMemo(() => {
    return [
      buildFileTree(
        resource.map((v) => `${v.path}(${Math.round(v.duration)}s)`)
      ),
    ];
  }, [resource]);

  return {
    resource,
    treeResource,
    mutate,
    loading,
  };
}

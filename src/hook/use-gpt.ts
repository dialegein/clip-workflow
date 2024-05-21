import { useMemo, useState } from "react";
import { getGPT, isApiResponseSuccess } from "../api";

export function useGPTTitle() {
  const [loading, setLoading] = useState(false);
  const [ans, setAns] = useState("");

  const propmt =
    "#输出内容\n根据上面的资料， 出一些标题文案， 希望文案具有颠覆性#输出格式\n标题不要出现引号等特殊字符，不要有序号，每个标题用分号分割";
  const titles = useMemo(() => {
    return ans.split("；");
  }, [ans]);

  function mutate(text: string) {
    setLoading(true);
    getGPT(text + propmt)
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
  };
}

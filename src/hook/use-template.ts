import { atom, useAtom } from "jotai";
import { TemplateType } from "../util/const";
import { getTemplate, isApiResponseSuccess } from "../api";
import { useCallback, useEffect, useState } from "react";

const templateAtom = atom<TemplateType[]>([]);

export function useTemplate() {
  const [template, setTemplate] = useAtom(templateAtom);
  const [loading, setLoading] = useState(false);

  const mutate = useCallback(() => {
    setLoading(true);
    setTemplate([]);
    getTemplate()
      .then((res) => {
        if (isApiResponseSuccess(res)) {
          setTemplate(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setTemplate]);

  
  useEffect(() => {
    mutate()
  }, [mutate])
  
  
  return {
    allTemplates: template,
    mutate,
    loading,
  };
}

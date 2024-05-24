import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useGenerate } from "../hook/use-generate";
import { Button, List, Space, Table, Select, Divider, Affix } from "antd";
import { LoadingOutlined, CheckOutlined } from "@ant-design/icons";
import { useTemplate } from "../hook/use-template";
import { useGPTEffect, useGPTTitle } from "../hook/use-gpt";
import { useForm } from "antd/es/form/Form";
import { useEffect, useMemo, useState } from "react";
import { ClipDataType, testData } from "../util/const";
import { getVideo } from "../util/video";
import { useResource } from "../hook/use-resource";
import _ from "lodash-es";

type FormType = {
  info: string;
  title: string;
  texts: string;
  template: number;
  bgm: string;
};

const Video = () => {
  // 所有模板
  const { allTemplates } = useTemplate();
  // 所有素材
  const { resource: allResource } = useResource();
  // 生成的所有主题文案
  const {
    mutate: askTitle,
    loading: askTitleLoading,
    titles,
    resetTitles,
    setTitles,
  } = useGPTTitle();
  // 生成的所有效果
  const {
    mutate: askEffects,
    loading: askEffectsLoading,
    effects,
  } = useGPTEffect();

  // 选择好的所有素材
  const [files, setFiles] = useState<string[]>([]);

  const {
    mutate: generate,
    loading: generateLoading,
    currentIndex,
  } = useGenerate();

  const [form] = useForm<FormType>();

  // 当前选择的模板
  const [templateId, setTemplateId] = useState<number>(1);
  const template = useMemo(() => {
    const template = allTemplates.find((item) => item.id === templateId);
    return template;
  }, [allTemplates, templateId]);

  // 待剪辑的数据
  const dataSource: ClipDataType[] = useMemo(() => {
    if (template) {
      return template.block.map((b, i) => {
        return {
          source: _.get(files, i),
          duration: b.duration,
          subtitle: _.get(effects, `${i}.text`),
          audio_text: _.get(effects, `${i}.voice`),
        };
      });
    }
    return [];
  }, [template, files, effects]);

  useEffect(() => {
    console.log("dataSource=====", dataSource);
  }, [dataSource]);

  // 使用测试数据
  const handleUseTestData = () => {
    setTitles(testData.titleOptions);
    form.setFieldsValue(testData);
  };

  // 重置表格数据
  const hanldeReset = () => {
    form.resetFields();
    resetTitles();
  };

  // 生成主题
  const hanldeCreateTheme = () => {
    const info = form.getFieldValue("info");
    askTitle(info);
  };

  // 生成片段包装
  const handleCreateEffects = async () => {
    const theme = form.getFieldValue("title");
    const info = form.getFieldValue("info");
    if (template) {
      await askEffects(info, theme, template);
    }
  };

  // 选择素材
  const handleSelect = () => {
    const files = template?.block.map((b) => getVideo(allResource, b)) ?? [];
    setFiles(files);
  };

  // 生成视频
  const handleGenerate = (v: FormType) => {
    if (template) {
      generate(1, dataSource, v.bgm);
    }
  };

  return (
    <div>
      <div>
        <Space>
          <Space>
            <span>脚本模板</span>
            <Select
              value={templateId}
              onChange={setTemplateId}
              options={allTemplates.map((v) => {
                return {
                  label: v.name,
                  value: v.id,
                };
              })}
            />
          </Space>

          <Button onClick={handleUseTestData}>使用测试数据</Button>
          <Button onClick={hanldeReset}>重置表格数据</Button>
        </Space>
      </div>
      <Divider />

      <Affix offsetTop={10}>
        <Space>
          <Button onClick={hanldeCreateTheme} loading={askTitleLoading}>
            1.根据项目资料生成主题文案
          </Button>
          <Button onClick={handleCreateEffects} loading={askEffectsLoading}>
            2.根据主题生成分镜包装文案
          </Button>

          <Button onClick={handleSelect}>3.根据模板选择片段</Button>

          <Button
            onClick={() => {
              form.submit();
            }}
            loading={generateLoading}
            type="primary"
          >
            4.视频剪辑
          </Button>
          {/* <Checkbox
            onChange={(e) => {
              setAllowGenerate(e.target.checked);
            }}
            value={allowGenerate}
          >
            发送请求
          </Checkbox> */}
        </Space>
      </Affix>

      <Divider />

      <ProForm form={form} onFinish={handleGenerate} submitter={false}>
        <ProFormTextArea
          label="项目资料"
          name="info"
          fieldProps={{
            rows: 10,
          }}
        />

        <ProFormSelect
          label="主题文案"
          name="title"
          options={titles.map((o) => {
            return {
              label: o,
              value: o,
            };
          })}
        />

        <ProFormTextArea name="text" hidden />
        <Table
          columns={[
            {
              title: "序号",
              dataIndex: "index",
              key: "index",
              render: (_, __, i) => i + 1,
              width: 70,
            },
            {
              title: "时长",
              dataIndex: "duration",
              key: "duration",
              render: (v) => v + "秒",
              width: 70,
            },
            {
              title: "素材",
              dataIndex: "source",
              key: "source",
            },

            {
              title: "口播",
              dataIndex: "audio_text",
              key: "audio_text",
            },
            {
              title: "花字",
              dataIndex: "subtitle",
              key: "subtitle",
            },
          ]}
          dataSource={dataSource}
          pagination={false}
        />

        <ProFormText label="BGM文件夹" name="bgm" />
      </ProForm>

      {currentIndex !== -1 && (
        <List
          itemLayout="horizontal"
          dataSource={[...Array(currentIndex)].map((_, i) => i + 1)}
          style={{
            overflow: "scroll",
          }}
          renderItem={(v) => (
            <List.Item>
              {v === currentIndex && generateLoading === true ? (
                <div>
                  <LoadingOutlined />第{v}个视频
                </div>
              ) : (
                <div>
                  <CheckOutlined />第{v}个视频
                </div>
              )}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Video;

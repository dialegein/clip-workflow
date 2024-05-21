import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useGenerate } from "../hook/use-generate";
import { Button, List } from "antd";
import { LoadingOutlined, CheckOutlined } from "@ant-design/icons";
import { useTemplate } from "../hook/use-template";
import { useGPTTitle } from "../hook/use-gpt";
import { useForm } from "antd/es/form/Form";

const Video = () => {
  const { mutate: generate, loading, currentIndex } = useGenerate();
  const { allTemplates } = useTemplate();
  const { mutate: askTitle, loading: askTitleLoading, titles } = useGPTTitle();

  const [form] = useForm();

  return (
    <div>
      <ProForm<{
        template: number;
        bgm: string;
      }>
        form={form}
        onFinish={async (v) => {
          const template = allTemplates.find((item) => item.id === v.template);
          if (template) {
            generate(1, template);
          }
        }}
        loading={loading}
      >
        <ProFormSelect
          label="脚本模板"
          name="template"
          options={allTemplates.map((v) => {
            return {
              label: v.name,
              value: v.id,
            };
          })}
        />
        <ProFormTextArea label="项目资料" name="info" />
        <Button
          onClick={() => {
            const info = form.getFieldValue("info");
            console.log(info);
            askTitle(info);
          }}
          loading={askTitleLoading}
        >
          生成内容主题
        </Button>
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
              {v === currentIndex && loading === true ? (
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

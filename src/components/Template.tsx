import {
  ActionType,
  ModalForm,
  ProFormDigit,
  ProFormGroup,
  ProFormList,
  ProFormText,
  ProTable,
} from "@ant-design/pro-components";
import { getTemplate } from "../api";
import { Button, Form, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { TemplateType } from "../util/const";
import { useDisclosure } from "@mantine/hooks";
import { useTemplate } from "../hook/use-template";

const Template = () => {
  const [data, setData] = useState<TemplateType | null>(null);
  const [opened, { toggle, open }] = useDisclosure(false);
  const ref = useRef<ActionType>();
  return (
    <>
      <ProTable
        search={false}
        options={false}
        actionRef={ref}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "模板名称",
            dataIndex: "name",
          },
          {
            title: "创建时间",
            dataIndex: "createdAt",
          },
          {
            title: "更新时间",
            dataIndex: "updatedAt",
          },
          {
            title: "操作",
            dataIndex: "option",
            valueType: "option",
            render: (_, v) => {
              return (
                <Space>
                  <Button
                    type="link"
                    onClick={() => {
                      setData(v);
                      open();
                    }}
                  >
                    编辑
                  </Button>
                  <Button type="link" disabled>
                    删除
                  </Button>
                </Space>
              );
            },
          },
        ]}
        request={async () => {
          const res = await getTemplate();
          return {
            data: res.data,
            success: true,
          };
        }}
      />
      <EditeModal
        data={data}
        opened={opened}
        toggle={toggle}
        reload={ref.current?.reload}
      />
    </>
  );
};

const EditeModal = (props: {
  opened: boolean;
  toggle: () => void;
  data: TemplateType | null;
  reload?: () => void;
}) => {
  const [form] = Form.useForm<TemplateType | null>();

  const { mutate } = useTemplate();

  useEffect(() => {
    form.setFieldsValue(props.data);
  }, [form, props.data]);

  return (
    <ModalForm
      form={form}
      open={props.opened}
      onOpenChange={props.toggle}
      grid={true}
      onFinish={(v) => {
        console.log(v);
        localStorage.setItem("template", JSON.stringify(v));
        props.toggle();
        props.reload?.();
        mutate();

        return Promise.resolve();
      }}
    >
      <ProFormText name="id" label="ID" colProps={{ span: 24 }} hidden />
      <ProFormText name="name" label="模板名" colProps={{ span: 24 }} />
      <ProFormList name="block" label="片段列表">
        <ProFormGroup>
          <ProFormText
            name={["target", "source"]}
            label="来源文件夹"
            colProps={{ span: 4 }}
            tooltip="素材路径模糊匹配"
          />
          <ProFormText
            name={["target", "keyword"]}
            label="命中关键字"
            tooltip="素材暂无关键词"
            disabled
            colProps={{ span: 6 }}
          />
          <ProFormDigit
            name={"duration"}
            fieldProps={{ precision: 0 }}
            label="时长"
            colProps={{ span: 3 }}
          />
          <ProFormText
            label="描述"
            tooltip="会被用来参考生成口播或花字的文案"
            name="description"
            colProps={{ span: 11 }}
          />

          {/* <ProFormCheckbox
            name={["text", "required"]}
            labelAlign="right"
            colProps={{ span: 3 }}
          >
            字幕
          </ProFormCheckbox>
          <ProFormText
            name={["text", "prompt"]}
            colProps={{ span: 8 }}
            label="字幕生成提示词"
          /> */}
        </ProFormGroup>
      </ProFormList>
    </ModalForm>
  );
};

export default Template;

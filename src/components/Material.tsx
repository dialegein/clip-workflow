import { Button, Input, List, Space } from "antd";
import { useState } from "react";
import { useResource } from "../hook/use-resource";

const Material = () => {
  const [path, setPath] = useState("");
  const { resource, mutate, loading } = useResource();

  return (
    <div>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          addonBefore="素材库地址"
          defaultValue="Combine input and button"
          placeholder="请输入素材库地址"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => {
            mutate(path);
          }}
          loading={loading}
        >
          保存
        </Button>
      </Space.Compact>

      <List
        itemLayout="horizontal"
        dataSource={resource}
        style={{
          overflow: "scroll",
        }}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.path} description={item.duration} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Material;

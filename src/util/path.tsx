import { VideoCameraFilled } from "@ant-design/icons";
import { TreeDataNode } from "antd";

export function buildFileTree(paths: string[]) {
  // 找到所有路径的共同父路径
  const commonPath = findCommonPath(paths);
  const commonPathParts = commonPath.split("/").filter(Boolean);

  // 初始化根节点，以共同父路径为基础
  const root = {
    title: commonPathParts.join("/") || "/",
    key: commonPath,
    children: [],
  };

  paths.forEach((path: string) => {
    const relativePath = path
      .slice(commonPath.length)
      .split("/")
      .filter(Boolean);
    addPathToTree(root, relativePath, commonPath);
  });

  return root;
}

function findCommonPath(paths: string[]) {
  if (paths.length === 0) return "";
  const splitPaths = paths.map((path) => path.split("/"));
  const minLength = Math.min(...splitPaths.map((parts) => parts.length));

  const commonParts = [];
  for (let i = 0; i < minLength; i++) {
    const part = splitPaths[0][i];
    if (splitPaths.every((parts) => parts[i] === part)) {
      commonParts.push(part);
    } else {
      break;
    }
  }

  return commonParts.join("/") + "/";
}

function addPathToTree(
  node: TreeDataNode,
  relativePath: string[],
  parentKey: string
) {
  if (relativePath.length === 0) return;

  const [currentPart, ...restParts] = relativePath;
  let childNode = node.children?.find((child) => child.title === currentPart);

  if (!childNode) {
    const key = parentKey + currentPart + (restParts.length > 0 ? "/" : "");
    childNode = {
      title: currentPart,
      key: key,
      children: [],
      isLeaf: true,
      icon: <VideoCameraFilled />
    };
    node.children?.push(childNode);
    if ("isLeaf" in node) {
      delete node.isLeaf;
      delete node.icon;
    }
  }

  addPathToTree(
    childNode,
    restParts,
    childNode.key + (restParts.length > 0 ? "/" : "")
  );
}

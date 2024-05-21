import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FolderUpload = () => {
  const handleFolderChange = (event) => {
    console.log(event.target);
    const files = event.target.files;
    const folderFiles = [];
    for (let i = 0; i < files.length; i++) {
      folderFiles.push(files[i]);
    }
    console.log("Selected folder files:", folderFiles);
  };

  return (
    <div>
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        style={{ display: "none" }}
        id="folderInput"
        onChange={handleFolderChange}
      />
      <Button
        icon={<UploadOutlined />}
        onClick={() => document.getElementById("folderInput").click()}
      >
        Select Folder
      </Button>
    </div>
  );
};

export default FolderUpload;

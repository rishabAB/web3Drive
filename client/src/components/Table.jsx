import { useEffect, useState } from "react";
import {  Table } from "antd";
import {trimMediaUrl} from "../utils/helpers";
import { CopyIcon } from "../images/svgIcons";
const TableComponent = ({ dataArray }) => {
  console.log(dataArray);

  const [data, setData] = useState();

  const columns = [
    {
      key: "media_link",
      dataIndex: "media_link",
      title: "Media Links",
    },
   
  ];

  useEffect(() => {
    if (!dataArray) return;
    let arr = [];
    let count = 0;
    for (let unit of dataArray) {
      arr.push({ key: count++, media_link: <span className="media_link"><a href={unit} target="_blank" rel="noreferrer">{trimMediaUrl(unit)}</a> <CopyIcon toCopy={unit}/></span> });
    }
    setData(arr);
  }, [dataArray]);

  return (
    <Table columns={columns} dataSource={data}  pagination={{ pageSize: 4 }} />
  );
};

export default TableComponent;

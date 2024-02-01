import { AssetTransfersWithMetadataResult } from "alchemy-sdk/dist/src/types/types";
import React, { useEffect, useState } from "react";

type TableRowProps = Partial<AssetTransfersWithMetadataResult>;

const TableRow: React.FC<TableRowProps> = ({ asset, to, value }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial value

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <tr className="border-b transition-all">
      {!isMobile && (
        <td className="py-2 px-4 md:w-1/2 lg:w-1/3 xl:w-1/4 whitespace-nowrap overflow-ellipsis overflow-hidden">
          {to}
        </td>
      )}
      <td className="py-2 px-4 whitespace-nowrap overflow-ellipsis overflow-hidden">
        {asset}
      </td>
      <td className="py-2 px-4 whitespace-nowrap overflow-ellipsis overflow-hidden">
        {value?.toFixed(2)}
      </td>
    </tr>
  );
};

interface TableProps {
  data: TableRowProps[];
}

const TxTable: React.FC<TableProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial value

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="overflow-x-auto text-slate-200">
      <table className="min-w-full bg-white border border-stone-300 rounded-md">
        <thead>
          <tr className="bg-gray-300 text-black text-lg">
            {!isMobile && <th className="py-2 px-4 text-left w-1/3">To</th>}
            <th className="py-2 px-4 text-left">Asset</th>
            <th className="py-2 px-4 text-left">Value</th>
          </tr>
        </thead>
        <tbody className="bg-slate-900 text-slate-200">
          {data.map((rowData, index) => (
            <TableRow key={index} {...rowData} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TxTable;

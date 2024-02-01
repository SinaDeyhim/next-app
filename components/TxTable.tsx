import { AssetTransfersWithMetadataResult } from "alchemy-sdk/dist/src/types/types";
import React from "react";

type TableRowProps = Partial<AssetTransfersWithMetadataResult>;

const TableRow: React.FC<TableRowProps> = ({ asset, to, value }) => {
  return (
    <tr className="border-b">
      <td className="py-2 px-4">{to}</td>
      <td className="py-2 px-4">{asset}</td>
      <td className="py-2 px-4">{value}</td>
    </tr>
  );
};

interface TableProps {
  data: TableRowProps[];
}

const TxTable: React.FC<TableProps> = ({ data }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 text-left">To</th>
          <th className="py-2 px-4 text-left">Asset</th>
          <th className="py-2 px-4 text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, index) => (
          <TableRow key={index} {...rowData} />
        ))}
      </tbody>
    </table>
  );
};

export default TxTable;

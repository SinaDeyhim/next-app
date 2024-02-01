import { AssetTransfersWithMetadataResult } from "alchemy-sdk/dist/src/types/types";
import React, { useCallback, useEffect, useState } from "react";

type TableRowProps = Partial<AssetTransfersWithMetadataResult>;

const TableRow: React.FC<TableRowProps> = ({ asset, to, value }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <tr className="border-b transition-all">
      {!isMobile && (
        <td className="py-2 px-4 md:w-1/4 lg:w-1/5 xl:w-1/5 whitespace-nowrap overflow-ellipsis overflow-hidden">
          {to}
        </td>
      )}
      <td className="py-2 px-4 w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5 whitespace-nowrap overflow-ellipsis overflow-hidden">
        {asset}
      </td>
      <td className="py-2 px-4 w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5 whitespace-nowrap overflow-ellipsis overflow-hidden">
        {value?.toFixed(2) || (1).toFixed(2)}
      </td>
    </tr>
  );
};

interface TableProps {
  data: TableRowProps[];
}

interface SortOption {
  column?: "asset" | "value";
  direction?: "asc" | "desc";
}

const TxTable: React.FC<TableProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sort, setSort] = useState<SortOption>({});
  const [txs, setTxs] = useState(data);

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

  const handleSort = useCallback(
    (column: "asset" | "value") => () => {
      setSort((prevSort) => {
        if (prevSort.column === column) {
          // If clicking on the same column, reverse the direction
          return {
            ...prevSort,
            direction: prevSort.direction === "asc" ? "desc" : "asc",
          };
        } else {
          // If clicking on a different column, set column and direction
          return {
            column,
            direction: "asc",
          };
        }
      });
    },
    [sort]
  );

  const getSortIcon = useCallback(
    (column: "to" | "asset" | "value") => {
      if (sort.column === column) {
        return sort.direction === "asc" ? "↑" : "↓";
      }
      return <span className="text-gray-400">↓↑</span>;
    },
    [sort]
  );

  useEffect(() => {
    // Apply sorting logic to txs array when sort changes
    if (sort.column && sort.direction) {
      const sortedTxs = [...data].sort((a, b) => {
        if (sort.direction === "asc") {
          return a[sort.column] > b[sort.column] ? 1 : -1;
        } else {
          return a[sort.column] < b[sort.column] ? 1 : -1;
        }
      });
      setTxs(sortedTxs);
    }
  }, [sort, data]);

  return (
    <div className="overflow-x-auto text-slate-200">
      <table className="min-w-full bg-white border border-stone-300 rounded-md">
        <thead>
          <tr className="bg-gray-300 text-black text-lg">
            {!isMobile && <th className="py-2 px-4 text-left w-1/3">To</th>}
            <th className="py-2 px-4 text-left" onClick={handleSort("asset")}>
              Asset
              <span className="ml-1 hover:cursor-pointer">
                {getSortIcon("asset")}
              </span>
            </th>
            <th className="py-2 px-4 text-left" onClick={handleSort("value")}>
              Value
              <span className="ml-1 hover:cursor-pointer">
                {getSortIcon("value")}
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-slate-900 text-slate-200">
          {txs.map((rowData, index) => (
            <TableRow key={index} {...rowData} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TxTable;

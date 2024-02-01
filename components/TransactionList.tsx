import React, { useState, useEffect } from "react";
import { getTxs } from "../utils/tx-history";
import { AssetTransfersWithMetadataResponse } from "alchemy-sdk/dist/src/types/types";
import TxTable from "./TxTable";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import { useAccount } from "wagmi";

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] =
    useState<AssetTransfersWithMetadataResponse>();
  const [isEmpty, setIsEmpty] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch transaction history for the address
        if (address) {
          const txHistory = await getTxs(address);
          setTransactions(txHistory);
        }

        if (!transactions?.transfers?.length) {
          setIsEmpty(true);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [address]);

  return (
    <div className="bg-slate-slate-900 text-slate-200">
      <h2 className="bg-slate-900 text-slate-200  p-4 text-2xl">
        Transaction List
      </h2>
      <ul>
        {transactions?.transfers?.length ? (
          <TxTable data={transactions.transfers} />
        ) : isEmpty ? (
          <EmptyState />
        ) : (
          <LoadingState />
        )}
      </ul>
    </div>
  );
};

export default TransactionList;

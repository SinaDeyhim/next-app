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
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);

        // Fetch transaction history for the address
        if (address) {
          const txHistory = await getTxs(address);
          setTransactions(txHistory);

          // Check if there are no transactions
          if (!txHistory?.transfers?.length) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [address]);

  useEffect(() => {
    // Update isEmpty state based on wallet connection status
    setIsEmpty(!isConnected);
  }, [isConnected]);

  return (
    <div className="bg-slate-slate-900 text-slate-200">
      <h2 className="bg-slate-900 text-slate-200 p-4 text-2xl">
        Transaction List
      </h2>
      <ul>
        {isLoading ? (
          <LoadingState />
        ) : isEmpty ? (
          <EmptyState address={address} />
        ) : (
          <TxTable data={transactions?.transfers || []} />
        )}
      </ul>
    </div>
  );
};

export default TransactionList;

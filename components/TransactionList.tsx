import React, { useState, useEffect } from "react";
import { getTxs } from "../utils/tx-history";
import { AssetTransfersWithMetadataResponse } from "alchemy-sdk/dist/src/types/types";
import TxTable from "./TxTable";

const network = "mainnet";
const address = "0x3578486e00e2129f6ffc8595b70a9efb3592b50c";

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] =
    useState<AssetTransfersWithMetadataResponse>();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch transaction history for the address
        const txHistory = await getTxs(address);

        // Update the state with the fetched transactions
        setTransactions(txHistory);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);
  console.log(">>>> tran", transactions);
  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions?.transfers?.length ? (
          <TxTable data={transactions.transfers} />
        ) : (
          "No transactions found"
        )}
      </ul>
    </div>
  );
};

export default TransactionList;

import React, { useState, useEffect, useCallback } from "react";
import { getTxs } from "../utils/tx-history";
import { AssetTransfersWithMetadataResponse } from "alchemy-sdk/dist/src/types/types";
import TxTable from "./TxTable";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import { useAccount } from "wagmi";
import {
  RiskLevel,
  calculateRiskCounts,
  filterTransactionsByRisk,
} from "../utils/risk";
import RiskIndicator from "./RiskIndicator";

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] =
    useState<AssetTransfersWithMetadataResponse>();

  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const { address, isConnected } = useAccount();
  const [riskDist, setRiskDist] = useState<number[]>([0, 0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  useState<AssetTransfersWithMetadataResponse>();

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

          // Calculate risk levels after setting transactions
          const risks = calculateRiskCounts(txHistory?.transfers);
          setRiskDist(risks);
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
    if (!isConnected) {
      setRiskDist([0, 0, 0]);
    }
  }, [isConnected]);

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

  const filterRisk = useCallback((risk: RiskLevel) => {
    if (transactions) {
      const txs = filterTransactionsByRisk(transactions.transfers, risk);
    }
  }, []);

  return (
    <div className="bg-slate-900 text-slate-200">
      <div className="flex justify-between">
        <h2 className="bg-slate-900 text-slate-200 p-4 text-2xl">
          Transaction List
        </h2>
        {!isMobile && (
          <RiskIndicator riskCounts={riskDist} callback={filterRisk} />
        )}
      </div>
      {isMobile && (
        <RiskIndicator riskCounts={riskDist} callback={filterRisk} />
      )}
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

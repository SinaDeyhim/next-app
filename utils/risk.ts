import { AssetTransfersWithMetadataResult } from "alchemy-sdk/dist/src/types/types";


 export function calculateRiskCounts(transactions?: AssetTransfersWithMetadataResult[]): number[] {
    const riskCounts = [0, 0, 0]; // [Low Risk, Medium Risk, High Risk]
    if(!transactions) return riskCounts;
  
    transactions.forEach((transaction) => {

      const { value } = transaction;

      if (!value || value < 10) {
        riskCounts[0]++; // Low Risk
      } else if (value <= 100) {
        riskCounts[1]++; // Medium Risk
      } else {
        riskCounts[2]++; // High Risk
      }
    });
  
    return riskCounts;
  }


  const calculateRisk = (transaction: AssetTransfersWithMetadataResult): RiskLevel => {
    const value = transaction.value;
  
    if (!value) {
      return "low";
    }
  
    if (value < 10) {
      return "low"; // Low Risk
    } else if (value <= 100) {
      return "med"; // Medium Risk
    } else {
      return "high"; // High Risk
    }
  };



export type RiskLevel = "low" | "med" | "high";

export const filterTransactionsByRisk = (
  transactions: AssetTransfersWithMetadataResult[] | undefined,
  riskLevel: RiskLevel
): AssetTransfersWithMetadataResult[] => {
  if (!transactions) {
    return [];
  }

  return transactions.filter((transaction) => {
    const transactionRisk = calculateRisk(transaction); 
    return transactionRisk.toLowerCase() === riskLevel.toLowerCase();
  });
};



import { AssetTransfersWithMetadataResult } from "alchemy-sdk/dist/src/types/types";


 export function calculateRiskCounts(transactions?: AssetTransfersWithMetadataResult[]): number[] {
    const riskCounts = [0, 0, 0]; // [Low Risk, Medium Risk, High Risk]
    if(!transactions) return riskCounts;
  
    transactions.forEach((transaction) => {

      const { value } = transaction;
      if(!value) return;
      if (value < 10) {
        riskCounts[0]++; // Low Risk
      } else if (value <= 100) {
        riskCounts[1]++; // Medium Risk
      } else {
        riskCounts[2]++; // High Risk
      }
    });
  
    return riskCounts;
  }



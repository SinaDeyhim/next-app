import React, { useCallback, useEffect, useState } from "react";
import { RiskLevel } from "../utils/risk";

interface RiskIndicatorProps {
  riskCounts: number[];
  callback: (risk: RiskLevel) => void;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  riskCounts,
  callback,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const total = riskCounts.reduce((acc, count) => acc + count, 0);
  const calculatePercentage = (count: number) => {
    return (count / total) * 100;
  };

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

  const handleClick = useCallback(
    (risk: RiskLevel) => () => {
      callback(risk);
    },
    []
  );

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center" onClick={handleClick("low")}>
        <div
          className="w-6 h-6 bg-transparent rounded-full border border-green-500 mr-2 ml-4"
          style={{
            background: `conic-gradient(green 0% ${calculatePercentage(
              riskCounts[0]
            )}%, transparent ${calculatePercentage(riskCounts[0])}% 100%)`,
          }}
        ></div>
        {!isMobile && <span>{`Low Risk: ${riskCounts[0]}`}</span>}
        {isMobile && <span>{`${riskCounts[0]}`}</span>}
      </div>
      <div className="flex items-center" onClick={handleClick("med")}>
        <div
          className="w-6 h-6 bg-transparent rounded-full border border-yellow-500 mr-2 ml-4"
          style={{
            background: `conic-gradient(yellow 0% ${calculatePercentage(
              riskCounts[1]
            )}%, transparent ${calculatePercentage(riskCounts[1])}% 100%)`,
          }}
        ></div>
        {!isMobile && <span>{`Medium Risk: ${riskCounts[1]}`}</span>}
        {isMobile && <span>{`${riskCounts[1]}`}</span>}
      </div>
      <div className="flex items-center" onClick={handleClick("high")}>
        <div
          className="w-6 h-6 bg-transparent rounded-full border border-red-500 mr-2 ml-4"
          style={{
            background: `conic-gradient(red 0% ${calculatePercentage(
              riskCounts[2]
            )}%, transparent ${calculatePercentage(riskCounts[2])}% 100%)`,
          }}
        ></div>
        {!isMobile && <span>{`High Risk: ${riskCounts[2]}`}</span>}
        {isMobile && <span>{`${riskCounts[2]}`}</span>}
      </div>
    </div>
  );
};

export default RiskIndicator;

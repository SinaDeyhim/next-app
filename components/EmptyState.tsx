import React from "react";

interface EmptyStateProps {
  address?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ address }) => {
  return (
    <div className="loading-state bg-slate-900 h-100">
      {address ? (
        <>
          <div className="mb-4">No transactions found </div>
          <div className="mr-4"> &#128546;</div>
        </>
      ) : (
        <div className="mb-4">Please connect your wallet to continue </div>
      )}
    </div>
  );
};

export default EmptyState;

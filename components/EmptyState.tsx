import React from "react";

const EmptyState: React.FC = () => {
  return (
    <div className="loading-state bg-slate-900 h-100">
      <div className="mb-4">No transactions found </div>
      <div className="mr-4"> &#128546;</div>
    </div>
  );
};

export default EmptyState;

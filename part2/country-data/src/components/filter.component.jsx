import React from "react";

const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div>
      <label>find countries</label>
      <input type="text" value={filterValue} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;

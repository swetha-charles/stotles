import { Input, Select } from "antd";
import React from "react";

export type SearchFilters = {
  query: string;
  buyerId?: string; // optional as buyer does not need to defined for search to work
};

export type BuyerOptions = {
  value: string;
  label: string;
};

type Props = {
  filters: SearchFilters;
  buyers: BuyerOptions[];
  onChange: (newFilters: SearchFilters) => void;
};

function RecordSearchFilters(props: Props) {
  const { filters, buyers, onChange } = props;

  const handleSearchTextChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        query: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  const handleBuyerSelectChange = React.useCallback(
    (buyerId: string) => {
      onChange({
        ...filters,
        buyerId
      });
    },
    [onChange, filters]
  );


  return (
    <div>
      <Input
        placeholder="Search text..."
        value={filters.query}
        onChange={handleSearchTextChange}
      />
      <Select
        style={{ width: "100%" }}
        options={buyers}
        placeholder="Select a buyer"
        onChange={handleBuyerSelectChange}
      />
    </div>
  );
}

export default RecordSearchFilters;

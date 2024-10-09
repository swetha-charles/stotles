import { Input, Select } from "antd";
import React from "react";
import { Buyer } from "./Api";

export type SearchFilters = {
  query: string;
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

  const handleQueryChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        query: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  return (
    <div>
      <Input
        placeholder="Search text..."
        value={filters.query}
        onChange={handleQueryChange}
      />
      <Select
        style={{ width: "100%" }}
        options={buyers}
        placeholder="Select a buyer"
      />
    </div>
  );
}

export default RecordSearchFilters;

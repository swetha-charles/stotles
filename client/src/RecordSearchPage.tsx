import { Button } from "antd";
import React from "react";
import Api, { Buyer, ProcurementRecord } from "./Api";
import RecordSearchFilters, {
  BuyerOptions,
  SearchFilters,
} from "./RecordSearchFilters";
import RecordsTable from "./RecordsTable";

/**
 * This component implements very basic pagination.
 * We fetch `PAGE_SIZE` records using the search endpoint which also returns
 * a flag indicating whether there are more results available or we reached the end.
 *
 * If there are more we show a "Load more" button which fetches the next page and
 * appends the new results to the old ones.
 *
 * Any change to filters resets the pagination state.
 *
 */

const PAGE_SIZE = 10;

function RecordSearchPage() {
  const [page, setPage] = React.useState<number>(1);
  const [searchFilters, setSearchFilters] = React.useState<SearchFilters>({
    query: "",
  });
  const [buyerOptions, setBuyerOptions] = React.useState<BuyerOptions[]>([]);

  const [records, setRecords] = React.useState<
    ProcurementRecord[] | undefined
  >();

  const [reachedEndOfSearch, setReachedEndOfSearch] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      const api = new Api();
      const response = await api.searchRecords({
        textSearch: searchFilters.query,
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * (page - 1),
      });

      if (page === 1) {
        setRecords(response.records);
      } else {
        // append new results to the existing records
        setRecords((oldRecords) => [...oldRecords, ...response.records]);
      }
      setReachedEndOfSearch(response.endOfResults);
    })();
  }, [searchFilters, page]);

  React.useEffect(() => {
    const getAllBuyers = async () => {
      const api = new Api();

      const response = await api.getAllBuyers();
      const options: BuyerOptions[] = response.buyers.map((buyer) => ({
        value: buyer.id,
        label: buyer.name,
      }));

      setBuyerOptions(options);
    };

    getAllBuyers();
  }, []);

  const handleChangeFilters = React.useCallback((newFilters: SearchFilters) => {
    setSearchFilters(newFilters);
    setPage(1); // reset pagination state
  }, []);

  const handleLoadMore = React.useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  return (
    <>
      <RecordSearchFilters
        filters={searchFilters}
        buyers={buyerOptions}
        onChange={handleChangeFilters}
      />
      {records && (
        <>
          <RecordsTable records={records} />
          {!reachedEndOfSearch && (
            <Button onClick={handleLoadMore}>Load more</Button>
          )}
        </>
      )}
    </>
  );
}

export default RecordSearchPage;

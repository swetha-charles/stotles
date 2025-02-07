import { Table } from "antd";
import { ColumnType } from "antd/lib/table";
import React from "react";
import { ProcurementRecord } from "./Api";
import ProcurementRecordPreviewModal from "./ProcurementRecordPreview";

type Props = {
  records: ProcurementRecord[];
};

function RecordsTable(props: Props) {
  const { records } = props;
  const [previewedRecord, setPreviewedRecord] = React.useState<
    ProcurementRecord | undefined
  >();

  const columns = React.useMemo<ColumnType<ProcurementRecord>[]>(() => {
    return [
      {
        title: "Published",
        render: (record: ProcurementRecord) =>
          new Date(record.publishDate).toLocaleDateString(),
      },
      {
        title: "Title",
        render: (record: ProcurementRecord) => {
          const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            setPreviewedRecord(record);
          };
          return (
            <a href="#" onClick={handleClick}>
              {record.title}
            </a>
          );
        },
      },
      {
        title: "Buyer name",
        render: (record: ProcurementRecord) => record.buyer.name,
      },
      {
        title: "Amount",
        render: (record: ProcurementRecord) => {
          if (!!record.amount.currency && !!record.amount.value) {
            const formatter = new Intl.NumberFormat("en-UK", {
              style: "currency",
              currency: record.amount.currency.slice(0, 3),
            });

            return (
              formatter.format(record.amount.value) +
              record.amount.currency.slice(3)
            );
          } else return "-";
        },
      },
      {
        title: "Stage",
        render: (record: ProcurementRecord) => {
          if (record.stage === "TENDER") {
            const closeDate = new Date(record.closeDate);
            const now = new Date();

            if (closeDate === null || closeDate > now) {
              //“ Open until {close_date}” if close date is null or close date is in the future
              // “Closed” otherwise
              return `Open until ${closeDate.toLocaleDateString()}`;
            } else {
              return "Closed";
            }
          } else if (record.stage === "CONTRACT") {
            const awardDate = new Date();
            return `Awarded on ${awardDate.toLocaleDateString()}`
          } else return "Contract stage unknown"
        },
      },
    ];
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={records} pagination={false} />
      <ProcurementRecordPreviewModal
        record={previewedRecord}
        onClose={() => setPreviewedRecord(undefined)}
      />
    </>
  );
}

export default RecordsTable;

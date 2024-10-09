export type RecordSearchRequest = {
  textSearch?: string;
  buyerId?: string,
  offset: number;
  limit: number;
};

export type BuyerDto = {
  id: string;
  name: string;
};

export type AmountDto = {
  value?: number;
  currency?: string
}

export type ProcurementRecordDto = {
  id: string;
  title: string;
  description: string;
  buyer: BuyerDto;
  publishDate: string;
  amount: AmountDto;
  stage: "TENDER" | "CONTRACT", 
  closeDate: string | null,
  awardDate: string | null
};

export type RecordSearchResponse = {
  records: ProcurementRecordDto[];
  endOfResults: boolean; // this is true when there are no more results to search
};

export type GetBuyersResponse = {
  buyers: BuyerDto[]
}
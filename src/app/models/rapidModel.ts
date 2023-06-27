export interface rapidModel {
  data: Datum[];
  metadata: Metadata;
}

interface Metadata {
  currentOffset: number;
  totalCount: number;
}

export interface Datum {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}

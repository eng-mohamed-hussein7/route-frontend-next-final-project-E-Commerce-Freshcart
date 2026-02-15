export interface Address {
  _id: string;
  name: string;
  phone: string;
  city: string;
  details: string;
}

export interface AddressResponse {
  results: number;
  data: Address[];
  status: string;
}

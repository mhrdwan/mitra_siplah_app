export type ApiZustand = {
  data1: any[];
  dataDetailProduct: any;
  fetchProductList: (params: {
    page?: number;
    limit?: number;
    keyword?: string;
    status?: string;
  }) => Promise<void>;
  detailProduct: (params: { id: number }) => Promise<void>;
  login: (params: { email: string; password: string }) => Promise<void>;
  kirimID: ({ id_expo }: { id_expo: string }) => Promise<void>;
  approveProduct: ({ id }: { id: number }) => Promise<void>
  blockProduct: ({ id }: { id: number }) => Promise<void>
};

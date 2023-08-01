declare interface Response<Data> {
  status: number;
  message: string;
  data: {
    data: Data;
  };
}

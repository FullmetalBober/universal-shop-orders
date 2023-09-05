declare interface Response<Data> {
  status: string;
  data: {
    [key: string]: Data;
  };
}

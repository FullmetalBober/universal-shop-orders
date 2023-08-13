declare interface Category {
  _id: string;
  name: string;
  menuType: string;
  characteristics: {
    _id: string;
    name: string;
    parameters: string[];
  }[];
  slug: string;
}

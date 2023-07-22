declare interface Category {
  _id: string;
  name: string;
  menuType: string;
  characteristics: {
    name: string;
    parameters: string[];
  }[];
  slug: string;
}

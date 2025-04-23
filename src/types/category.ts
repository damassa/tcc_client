export class CategoryResponse {
  constructor(
    public id: number,
    public name: string,
  ) {
    this.id = id;
    this.name = name;
  }
}

// export type CategoryResponse = {
//   name: string;
// };

// export type Category = {
//   name: string;
// };

// export type CategoryEntry = {
//   category: Category;
//   url: string;
// };

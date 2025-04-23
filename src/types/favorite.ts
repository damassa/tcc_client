export class FavoriteResponse {
  constructor(
    public serie_id: number,
    public user_id: number,
  ) {
    this.serie_id = serie_id;
    this.user_id = user_id;
  }
}

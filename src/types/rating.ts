export interface RatingPayload {
  idUser: number;
  idSerie: number;
  comment: string;
  stars: number;
}

export interface RatingResponse {
  id: number;
  userName: string;
  idSerie: number;
  comment: string;
  stars: number;
}

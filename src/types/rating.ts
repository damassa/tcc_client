export interface RatingPayload {
  idUser: number;
  idSerie: number;
  stars: number;
}

export interface RatingResponse {
  id: number;
  idUser: number;
  userImage: string;
  userName: string;
  idSerie: number;
  stars: number;
}

export interface RatingStats {
  average: number;
  totalVotes: number;
}

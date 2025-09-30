export class HistoryResponse {
  constructor(
    public id: number,
    public idUser: number,
    public idEpisode: number,
    public pausedAt: number,
  ) {
    this.idUser = idUser;
    this.idEpisode = idEpisode;
    this.pausedAt = pausedAt;
  }
}

export interface HistoryRequest {
  idUser: number;
  idEpisode: number;
  pausedAt: number;
}

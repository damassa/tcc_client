export class EpisodeResponse {
  constructor(
    public id: number,
    public name: string,
    public duration: number,
    public link: string,
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.link = link;
  }
}

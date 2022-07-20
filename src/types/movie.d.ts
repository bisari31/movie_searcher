interface ISearch {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface IData {
  Response: string;
  Search: ISearch[];
  totalResults: string;
}

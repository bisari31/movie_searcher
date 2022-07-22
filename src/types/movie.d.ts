interface ISearch {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  favorite?: boolean;
}

export interface IData {
  Response: string;
  Search: ISearch[];
  totalResults: string;
}

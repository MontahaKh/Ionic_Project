export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterPath?: string;
  releaseDate?: string;
  voteAverage?: number;
  genres?: string[];
}

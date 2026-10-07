import { Movie } from './movie.model';

export interface Favorite extends Movie {
  addedAt?: string;
}

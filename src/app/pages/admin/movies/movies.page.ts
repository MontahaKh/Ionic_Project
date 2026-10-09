import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonText, IonTitle, IonToolbar } from '@ionic/angular';
import { Movie } from '../../../services/movie';
import { Movie as MovieModel } from '../../../models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  imports: [IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonText, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MoviesPage implements OnInit {
  private readonly movieService = inject(Movie);
  movies: MovieModel[] = [];
  title = '';
  overview = '';
  releaseDate = '';
  posterPath = '';
  genresText = '';
  isLoading = true;
  isSaving = false;
  errorMessage = '';

  async ngOnInit(): Promise<void> {
    try {
      this.movies = await this.movieService.list();
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Impossible de charger les films.';
    } finally {
      this.isLoading = false;
    }
  }

  async addMovie(): Promise<void> {
    if (!this.title.trim() || !this.overview.trim()) {
      this.errorMessage = 'Le titre et le synopsis sont obligatoires.';
      return;
    }
    this.isSaving = true;
    this.errorMessage = '';
    try {
      const movie = await this.movieService.create({
        title: this.title.trim(),
        overview: this.overview.trim(),
        releaseDate: this.releaseDate || undefined,
        posterPath: this.posterPath.trim() || undefined,
        genres: this.genresText.split(',').map((genre) => genre.trim()).filter(Boolean),
      });
      this.movies = [movie, ...this.movies];
      this.title = '';
      this.overview = '';
      this.releaseDate = '';
      this.posterPath = '';
      this.genresText = '';
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Impossible d’ajouter le film.';
    } finally {
      this.isSaving = false;
    }
  }

  async deleteMovie(movie: MovieModel): Promise<void> {
    try {
      await this.movieService.delete(movie.id);
      this.movies = this.movies.filter((item) => item.id !== movie.id);
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Impossible de supprimer le film.';
    }
  }
}

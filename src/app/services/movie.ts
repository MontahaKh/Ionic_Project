import { Injectable, inject } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { Movie as MovieModel } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class Movie {
  private readonly firebase = inject(FirebaseService);

  async list(): Promise<MovieModel[]> {
    const snapshot = await getDocs(collection(this.firebase.firestore, 'movies'));
    return snapshot.docs.map((movieDoc) => ({
      id: movieDoc.id,
      ...movieDoc.data(),
    } as MovieModel));
  }

  async create(movie: Omit<MovieModel, 'id'>): Promise<MovieModel> {
    const reference = await addDoc(collection(this.firebase.firestore, 'movies'), {
      ...movie,
      createdAt: serverTimestamp(),
    });
    return { id: reference.id, ...movie };
  }

  async update(id: string, movie: Partial<Omit<MovieModel, 'id'>>): Promise<void> {
    await updateDoc(doc(this.firebase.firestore, 'movies', id), movie);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.firebase.firestore, 'movies', id));
  }
}

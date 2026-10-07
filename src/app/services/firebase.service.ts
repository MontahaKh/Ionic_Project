import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  readonly app = initializeApp(environment.firebase);
  readonly auth = getAuth(this.app);
  readonly firestore = getFirestore(this.app);
  readonly storage = getStorage(this.app);
}
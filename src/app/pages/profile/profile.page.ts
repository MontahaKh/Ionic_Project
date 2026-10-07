import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { Auth } from '../../services/auth';
import { UserProfile } from '../../models/user.model';

const PROFILE_LOAD_TIMEOUT_MS = 12000;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    RouterLink,
    CommonModule,
  ]
})
export class ProfilePage implements OnInit {
  profile: UserProfile | null = null;
  isLoading = true;
  isLoggingOut = false;
  errorMessage = '';

  constructor(
    private readonly auth: Auth,
    private readonly router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    let timeoutId: number | undefined;
    try {
      const profileRequest = this.auth.getCurrentProfile();
      const timeout = new Promise<never>((_, reject) => {
        timeoutId = window.setTimeout(() => {
          reject(new Error('Le chargement du profil a dépassé le délai. Vérifiez votre connexion et réessayez.'));
        }, PROFILE_LOAD_TIMEOUT_MS);
      });

      this.profile = await Promise.race([profileRequest, timeout]);
      if (!this.profile) {
        this.errorMessage = 'Profil utilisateur introuvable.';
      }
    } catch (error) {
      this.errorMessage = error instanceof Error
        ? error.message
        : 'Impossible de charger le profil.';
    } finally {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      this.isLoading = false;
    }
  }

  async logout(): Promise<void> {
    this.isLoggingOut = true;
    try {
      await this.auth.logout();
      await this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (error) {
      this.errorMessage = error instanceof Error
        ? error.message
        : 'La déconnexion a échoué.';
      this.isLoggingOut = false;
    }
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class LoginPage {
  email = '';
  password = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private readonly auth: Auth,
    private readonly router: Router,
  ) {}

  async submit(): Promise<void> {
    this.errorMessage = '';

    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Veuillez renseigner votre e-mail et votre mot de passe.';
      return;
    }

    this.isSubmitting = true;
    try {
      await this.auth.login(this.email, this.password);
      await this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private getErrorMessage(error: unknown): string {
    const code = error instanceof Error && 'code' in error
      ? String((error as Error & { code?: string }).code)
      : '';

    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'E-mail ou mot de passe incorrect.';
      case 'auth/invalid-email':
        return 'L’adresse e-mail est invalide.';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Réessayez plus tard.';
      default:
        return error instanceof Error ? error.message : 'La connexion a échoué.';
    }
  }
}

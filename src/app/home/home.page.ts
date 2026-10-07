import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonButton, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
})
export class HomePage {
  isLoggingOut = false;

  constructor(
    private readonly auth: Auth,
    private readonly router: Router,
  ) {}

  async logout(): Promise<void> {
    this.isLoggingOut = true;
    await this.auth.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}

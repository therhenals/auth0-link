import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as Auth0 } from '@auth0/auth0-angular';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { first } from 'rxjs/operators'
import { auth0RedirectUri } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  native = Capacitor.isNativePlatform();

  constructor(
    private auth0: Auth0,
    private ngZone: NgZone,
    private authService: AuthService,
    private router: Router,
  ) { }

  async ngOnInit() {
    if (this.native) {
      App.addListener('appUrlOpen', ({ url }) => {
        this.ngZone.run(async () => {
          if (url?.startsWith(auth0RedirectUri('callback'))) {
            if (
              url.includes('state=') &&
              (url.includes('error=') || url.includes('code='))
            ) {
              await this.auth0.handleRedirectCallback(url).pipe(first()).toPromise();
              await this.router.navigateByUrl('');
              await this.router.navigateByUrl('');
              console.log('Paso')
            } else {
              Browser.close();
            }
          } else if (url?.startsWith(auth0RedirectUri('tigomoney'))) {
            if (
              url.includes('state=') &&
              (url.includes('error=') || url.includes('code='))
            ) {
              const client = this.authService.clientTigoMoney();
              await client.handleRedirectCallback(url);
              const { __raw: claims } = await client.getIdTokenClaims();
              await this.authService.linkTigoMoney(claims);
              await this.router.navigateByUrl('')
            } else {
              Browser.close();
            }
          }
        });
      });
    } else {
    }

  }
}

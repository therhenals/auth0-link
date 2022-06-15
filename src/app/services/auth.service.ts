import { Injectable } from '@angular/core';
import { AuthService as Auth0 } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { first, switchMap } from 'rxjs/operators'
import { Auth0Client } from '@auth0/auth0-spa-js';
import { environment, auth0RedirectUri } from 'src/environments/environment';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  native = Capacitor.isNativePlatform()

  constructor(
    private auth0: Auth0,
  ) { }

  async logOut() {
    this.auth0.logout({ localOnly: true });
  }

  async loginTigoMoney() {
    const client = this.clientTigoMoney();
    const url = await client.buildAuthorizeUrl();
    Browser.open({ url, windowName: '_self' });

    // if (this.native) {
    //   const url = await client.buildAuthorizeUrl();
    //   Browser.open({ url, windowName: '_self' });
    // } else {
    //   await client.loginWithPopup();
    //   const { __raw: claims } = await client.getIdTokenClaims();
    //   await this.linkTigoMoney(claims);
    // }
  }

  async linkTigoMoney(claims: string) {
    const { sub } = await this.auth0.user$.pipe(first()).toPromise();
    const accessToken = await this.auth0.getAccessTokenSilently().toPromise();
    await fetch(`https://tigoapps.us.auth0.com/api/v2/users/${sub}/identities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        link_with: claims,
      }),
    });
  }

  user() {
    return this.auth0.isAuthenticated$.pipe(switchMap(() => this.auth0.user$));
  }

  clientTigoMoney() {
    const auth0 = new Auth0Client({
      client_id: environment.auth.clientId,
      domain: environment.auth.domain,
      redirect_uri: auth0RedirectUri('tigomoney'),
      connection: 'TigoMoney',
      max_age: 0,
    });
    return auth0;
  }

  async profile() {
    const { sub } = await this.auth0.getUser({
      scope: 'read:current_user',
      audience: 'https://tigoapps.us.auth0.com/api/v2/'
    }).pipe(first()).toPromise();

    const token = await this.auth0.getAccessTokenSilently().pipe(first()).toPromise();

    const response = await fetch(
      `https://tigoapps.us.auth0.com/api/v2/users/${sub}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  }

  async checkTigoMoney(): Promise<boolean> {
    const profile: ProfileModel = await this.profile();
    return profile.identities.some((identity) => identity.connection == 'TigoMoney');
  }
}

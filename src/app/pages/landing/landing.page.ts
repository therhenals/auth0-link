import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { auth0RedirectUri } from 'src/environments/environment';
import { AuthService as Auth0 } from '@auth0/auth0-angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private auth0: Auth0,
  ) { }

  async ngOnInit() {
    this.login();
  }

  async login() {
    const url = await this.auth0.buildAuthorizeUrl({
      redirect_uri: auth0RedirectUri('callback'),
    }).pipe(first()).toPromise();
    Browser.open({ url, windowName: '_self' });
  }

}

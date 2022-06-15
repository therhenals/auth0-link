import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user$ = this.authService.user()

  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit() {
    console.log(await this.authService.profile())
  }

  async logOut() {
    await this.authService.logOut();
  }

  loginTigoMoney() {
    this.authService.loginTigoMoney()
  }

}

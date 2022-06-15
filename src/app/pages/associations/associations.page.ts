import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.page.html',
  styleUrls: ['./associations.page.scss'],
})
export class AssociationsPage implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.tigoMoney();
  }

  async tigoMoney() {
    await this.authService.loginTigoMoney();
  }

  async logOut() {
    await this.authService.logOut();
  }

}

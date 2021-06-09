import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navigation = this.config.navigation;
  loginStatus:boolean = false;
  user: User | null = null;
  userSub: Subscription | null = null;

  constructor(private config: ConfigService, private auth: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.auth.currentUserSubject.subscribe(
      (user: User | null) => this.user = user 
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onLogout():void {
    this.auth.logout();
  }

}

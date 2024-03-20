import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { User } from '../../../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from '../../../../model/user-dto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  user: User | null = null;
  userDto!: UserDto;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.checkLocalStorage();
  }

  checkAdmin(): boolean {
    this.user = this.authService.checkStatus();
    return this.user !== null && this.user.role === 'ADMIN';
  }

  checkUser(): boolean {
    this.user = this.authService.checkStatus();
    return this.user !== null;
  }

  logout() {
    this.authService.logout();
  }

  navigateToUserPanel() {
    if (this.user && this.user.id) {
      this.router.navigate(['/user', this.user?.id]);
    }
  }
  

}

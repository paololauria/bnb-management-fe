import { Component, OnInit } from '@angular/core';
import { User } from '../../../../model/user';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserDto } from '../../../../model/user-dto';
import { UserService } from '../../../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css',
})
export class UserPanelComponent implements OnInit {
  userDto!: UserDto;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = +params['userId'];
      this.loadUserDetails(userId);
      this.authService.checkLocalStorage();
    });

  }


  loadUserDetails(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (u) => {
        this.userDto = u;
      },
      error: (err) => console.log(err),
    });
  }


  checkUserId() {
    let user: User | null;
    user = JSON.parse(localStorage.getItem('userData')!);
    if (user?.id == this.userDto.id) {
      if (user.role == 'ADMIN') {
        return true;
      }
      console.log('3:');
      return true;
    }
    return false;
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bnb';
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.checkLocalStorage();
  }
}

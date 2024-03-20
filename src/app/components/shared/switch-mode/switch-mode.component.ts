import { Component } from '@angular/core';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-switch-mode',
  templateUrl: './switch-mode.component.html',
  styleUrl: './switch-mode.component.css'
})
export class SwitchModeComponent {
  isDarkMode: boolean = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}

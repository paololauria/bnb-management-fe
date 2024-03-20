import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode: boolean = false;

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  isDarkTheme(): boolean {
    return this.isDarkMode;
  }

  getTextColor(): string {
   return this.isDarkMode ? 'var(--text-color-dark)' : 'var(--text-color-light)';
 }
}

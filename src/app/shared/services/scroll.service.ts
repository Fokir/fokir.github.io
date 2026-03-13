import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  activeSection = signal('hero');
  scrollY = signal(0);
  isScrolled = signal(false);

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  }

  updateScroll(): void {
    this.scrollY.set(window.scrollY);
    this.isScrolled.set(window.scrollY > 50);

    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
    for (const section of sections.reverse()) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          this.activeSection.set(section);
          break;
        }
      }
    }
  }
}

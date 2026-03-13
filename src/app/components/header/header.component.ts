import { Component, ChangeDetectionStrategy, inject, signal, HostListener } from '@angular/core';
import { ScrollService } from '../../shared/services/scroll.service';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header" [class.header--scrolled]="scrollService.isScrolled()">
      <div class="header__container">
        <a class="header__logo mono" (click)="scrollService.scrollTo('hero')">
          <span class="accent">&lt;</span>AS<span class="accent">/&gt;</span>
        </a>

        <nav class="header__nav" [class.header__nav--open]="menuOpen()">
          @for (item of navItems; track item.id; let idx = $index) {
            <a
              class="header__link mono"
              [class.header__link--active]="scrollService.activeSection() === item.id"
              (click)="navigateTo(item.id)"
            >
              <span class="accent">0{{ idx + 1 }}.</span> {{ i18n.translations().nav[item.id] }}
            </a>
          }
          <button class="header__lang-btn mono" (click)="switchLanguage()">
            {{ i18n.oppositeLocaleLabel() }}
          </button>
        </nav>

        <button
          class="header__burger"
          [class.header__burger--open]="menuOpen()"
          (click)="menuOpen.set(!menuOpen())"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `,
  styles: `
    @use '../../../../src/styles/mixins' as *;

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: var(--header-height);
      display: flex;
      align-items: center;
      transition: all var(--transition-base);

      &--scrolled {
        background: rgba(10, 10, 15, 0.85);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-color);
        box-shadow: var(--shadow-sm);
      }

      &__container {
        @include container;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      &__logo {
        font-size: 1.4rem;
        font-weight: 700;
        cursor: pointer;
        letter-spacing: 2px;
        transition: color var(--transition-fast);

        &:hover {
          color: var(--accent);
        }
      }

      &__nav {
        display: flex;
        align-items: center;
        gap: 28px;

        @include responsive(md) {
          position: fixed;
          top: 0;
          right: 0;
          width: 70%;
          max-width: 320px;
          height: 100vh;
          flex-direction: column;
          justify-content: center;
          background: var(--bg-secondary);
          border-left: 1px solid var(--border-color);
          transform: translateX(100%);
          transition: transform var(--transition-base);

          &--open {
            transform: translateX(0);
          }
        }
      }

      &__link {
        font-size: 0.85rem;
        color: var(--text-secondary);
        cursor: pointer;
        transition: color var(--transition-fast);
        position: relative;

        .accent {
          margin-right: 4px;
          font-size: 0.8rem;
        }

        &:hover,
        &--active {
          color: var(--accent);
        }

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent);
          transition: width var(--transition-base);
        }

        &:hover::after,
        &--active::after {
          width: 100%;
        }
      }

      &__lang-btn {
        padding: 8px 20px;
        border: 1px solid var(--accent);
        border-radius: var(--border-radius-sm);
        color: var(--accent);
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 1px;
        transition: all var(--transition-fast);
        cursor: pointer;

        &:hover {
          background: rgba(var(--accent-rgb), 0.1);
          box-shadow: var(--shadow-glow);
        }
      }

      &__burger {
        display: none;
        flex-direction: column;
        gap: 5px;
        padding: 4px;
        z-index: 1001;

        @include responsive(md) {
          display: flex;
        }

        span {
          width: 28px;
          height: 2px;
          background: var(--text-primary);
          transition: all var(--transition-base);
          transform-origin: center;
        }

        &--open {
          span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
          span:nth-child(2) { opacity: 0; }
          span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        }
      }
    }
  `,
})
export class HeaderComponent {
  scrollService = inject(ScrollService);
  i18n = inject(I18nService);
  menuOpen = signal(false);

  navItems: { id: 'about' | 'skills' | 'experience' | 'projects' | 'contact' }[] = [
    { id: 'about' },
    { id: 'skills' },
    { id: 'experience' },
    { id: 'projects' },
    { id: 'contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollService.updateScroll();
  }

  navigateTo(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);
    this.menuOpen.set(false);
  }

  switchLanguage(): void {
    this.i18n.switchLanguage();
  }
}

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="contact" id="contact">
      <div class="contact__container">
        <div class="contact__header" appScrollAnimation>
          <span class="section-label mono">{{ i18n.translations().contact.label }}</span>
          <h2>{{ i18n.translations().contact.title }}</h2>
          <div class="section-line"></div>
        </div>

        <div class="contact__content" appScrollAnimation [animationDelay]="0.15">
          <p class="contact__text">
            {{ i18n.translations().contact.description }}
          </p>

          <div class="contact__links">
            <a
              class="contact__link"
              [href]="'mailto:' + i18n.translations().personal.email"
              appScrollAnimation
              [animationDelay]="0.2"
            >
              <div class="contact__link-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <span class="contact__link-label mono">{{ i18n.translations().contact.emailLabel }}</span>
                <span class="contact__link-value">{{ i18n.translations().personal.email }}</span>
              </div>
            </a>

            <a
              class="contact__link"
              [href]="i18n.translations().personal.telegramLink"
              target="_blank"
              rel="noopener"
              appScrollAnimation
              [animationDelay]="0.3"
            >
              <div class="contact__link-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div>
                <span class="contact__link-label mono">{{ i18n.translations().contact.telegramLabel }}</span>
                <span class="contact__link-value">{{ i18n.translations().personal.telegram }}</span>
              </div>
            </a>

            <a
              class="contact__link"
              [href]="i18n.translations().personal.github"
              target="_blank"
              rel="noopener"
              appScrollAnimation
              [animationDelay]="0.4"
            >
              <div class="contact__link-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <span class="contact__link-label mono">{{ i18n.translations().contact.githubLabel }}</span>
                <span class="contact__link-value">Fokir</span>
              </div>
            </a>
          </div>

          <button
            class="contact__cta mono"
            (click)="openEmail()"
            appScrollAnimation
            [animationDelay]="0.5"
          >
            {{ i18n.translations().contact.sayHello }}
          </button>
        </div>
      </div>
    </section>
  `,
  styles: `
    @use '../../../../src/styles/mixins' as *;

    .contact {
      @include section;

      &__container {
        @include container;
        max-width: 700px;
      }

      &__header {
        @include section-title;
      }

      &__content {
        text-align: center;
      }

      &__text {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 48px;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
      }

      &__links {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 48px;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }

      &__link {
        @include glass-card;
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px 24px;
        color: var(--text-primary);
        text-align: left;
      }

      &__link-icon {
        color: var(--accent);
        flex-shrink: 0;
        width: 44px;
        height: 44px;
        @include flex-center;
        background: rgba(var(--accent-rgb), 0.08);
        border-radius: 10px;
      }

      &__link-label {
        display: block;
        font-size: 0.75rem;
        color: var(--accent);
        margin-bottom: 4px;
      }

      &__link-value {
        display: block;
        font-size: 0.95rem;
        color: var(--text-secondary);
      }

      &__cta {
        padding: 16px 48px;
        border: 1px solid var(--accent);
        color: var(--accent);
        border-radius: var(--border-radius-sm);
        font-size: 1rem;
        transition: all var(--transition-base);
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(var(--accent-rgb), 0.1);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform var(--transition-base);
        }

        &:hover {
          box-shadow: var(--shadow-glow);
          transform: translateY(-2px);

          &::before {
            transform: scaleX(1);
          }
        }
      }
    }
  `,
})
export class ContactComponent {
  i18n = inject(I18nService);

  openEmail(): void {
    window.location.href = `mailto:${this.i18n.translations().personal.email}`;
  }
}

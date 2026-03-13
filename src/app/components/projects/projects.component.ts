import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="projects" id="projects">
      <div class="projects__container">
        <div class="projects__header" appScrollAnimation>
          <span class="section-label mono">{{ i18n.translations().projects.label }}</span>
          <h2>{{ i18n.translations().projects.title }}</h2>
          <div class="section-line"></div>
        </div>

        <div class="projects__grid">
          @for (project of i18n.translations().projects.items; track project.title; let i = $index) {
            <div
              class="project-card"
              [class.project-card--featured]="project.featured"
              appScrollAnimation
              [animationDelay]="i * 0.1"
            >
              <div class="project-card__top">
                <div class="project-card__icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                @if (project.link) {
                  <a [href]="project.link" target="_blank" rel="noopener" class="project-card__link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                }
              </div>

              <div class="project-card__body">
                <span class="project-card__category mono accent">{{ project.category }}</span>
                <h3 class="project-card__title">{{ project.title }}</h3>
                <p class="project-card__description">{{ project.description }}</p>
                <p class="project-card__long-description">{{ project.longDescription }}</p>
              </div>

              <div class="project-card__footer">
                @for (tech of project.technologies; track tech) {
                  <span class="project-card__tech mono">{{ tech }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    @use '../../../../src/styles/mixins' as *;

    .projects {
      @include section;
      background: var(--bg-secondary);

      &__container {
        @include container;
      }

      &__header {
        @include section-title;
      }

      &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 24px;

        @include responsive(sm) {
          grid-template-columns: 1fr;
        }
      }
    }

    .project-card {
      @include glass-card;
      padding: 32px;
      display: flex;
      flex-direction: column;
      min-height: 340px;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--gradient-accent);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform var(--transition-base);
      }

      &:hover::before {
        transform: scaleX(1);
      }

      &--featured {
        &::before {
          background: var(--gradient-mixed);
        }
      }

      &__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }

      &__icon {
        color: var(--accent);
      }

      &__link {
        color: var(--text-secondary);
        transition: color var(--transition-fast);

        &:hover {
          color: var(--accent);
        }
      }

      &__body {
        flex: 1;
      }

      &__category {
        font-size: 0.8rem;
        display: block;
        margin-bottom: 8px;
      }

      &__title {
        font-size: 1.3rem;
        margin-bottom: 12px;
        transition: color var(--transition-fast);

        .project-card:hover & {
          color: var(--accent);
        }
      }

      &__description {
        font-size: 0.95rem;
        margin-bottom: 12px;
        color: var(--text-secondary);
      }

      &__long-description {
        font-size: 0.85rem;
        color: var(--text-muted);
        line-height: 1.7;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      &__footer {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid var(--border-color);
      }

      &__tech {
        font-size: 0.75rem;
        color: var(--text-muted);
      }
    }
  `,
})
export class ProjectsComponent {
  i18n = inject(I18nService);
}

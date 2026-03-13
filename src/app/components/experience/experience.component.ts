import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { I18nService } from '../../i18n/i18n.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="experience" id="experience">
      <div class="experience__container">
        <div class="experience__header" appScrollAnimation>
          <span class="section-label mono">{{ i18n.translations().experience.label }}</span>
          <h2>{{ i18n.translations().experience.title }}</h2>
          <div class="section-line"></div>
        </div>

        <div class="timeline">
          <div class="timeline__line"></div>

          @for (exp of i18n.translations().experience.items; track exp.company; let idx = $index; let odd = $odd) {
            <div
              class="timeline__item"
              [class.timeline__item--right]="odd"
              appScrollAnimation
              [animationType]="odd ? 'fadeRight' : 'fadeLeft'"
              [animationDelay]="idx * 0.2"
            >
              <div class="timeline__dot">
                <div class="timeline__dot-inner"></div>
              </div>

              <div class="timeline__card">
                <div class="timeline__card-header">
                  <span class="timeline__duration mono accent">{{ exp.duration }}</span>
                  <span class="timeline__period mono">{{ exp.period }}</span>
                </div>
                <h3 class="timeline__role">{{ exp.role }}</h3>
                <h4 class="timeline__company accent">{{ exp.company }}</h4>
                <p class="timeline__description">{{ exp.description }}</p>

                <ul class="timeline__highlights">
                  @for (highlight of exp.highlights; track highlight) {
                    <li>
                      <span class="accent mono">▹</span>
                      {{ highlight }}
                    </li>
                  }
                </ul>

                <div class="timeline__tech">
                  @for (tech of exp.technologies; track tech) {
                    <span class="timeline__tag mono">{{ tech }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    @use '../../../../src/styles/mixins' as *;

    .experience {
      @include section;

      &__container {
        @include container;
      }

      &__header {
        @include section-title;
      }
    }

    .timeline {
      position: relative;
      max-width: 900px;
      margin: 0 auto;

      &__line {
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(
          180deg,
          transparent,
          var(--accent) 10%,
          var(--accent) 90%,
          transparent
        );
        transform: translateX(-50%);
        opacity: 0.3;

        @include responsive(md) {
          left: 20px;
        }
      }

      &__item {
        display: flex;
        justify-content: flex-start;
        padding: 0 0 60px;
        position: relative;

        &--right {
          justify-content: flex-end;

          @include responsive(md) {
            justify-content: flex-start;
          }
        }

        @include responsive(md) {
          padding-left: 50px;
        }
      }

      &__dot {
        position: absolute;
        left: 50%;
        top: 30px;
        transform: translateX(-50%);
        width: 18px;
        height: 18px;
        background: var(--bg-primary);
        border: 2px solid var(--accent);
        border-radius: 50%;
        z-index: 2;
        @include flex-center;

        @include responsive(md) {
          left: 20px;
        }
      }

      &__dot-inner {
        width: 8px;
        height: 8px;
        background: var(--accent);
        border-radius: 50%;
        animation: pulse-glow 2s ease-in-out infinite;
      }

      &__card {
        @include glass-card;
        padding: 28px;
        width: 42%;
        position: relative;

        @include responsive(md) {
          width: 100%;
        }
      }

      &__card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      &__duration {
        font-size: 0.85rem;
        font-weight: 600;
      }

      &__period {
        font-size: 0.8rem;
        color: var(--text-muted);
      }

      &__role {
        font-size: 1.2rem;
        margin-bottom: 4px;
      }

      &__company {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 16px;
      }

      &__description {
        font-size: 0.95rem;
        margin-bottom: 16px;
      }

      &__highlights {
        margin-bottom: 16px;

        li {
          font-size: 0.9rem;
          color: var(--text-secondary);
          padding: 4px 0;
          display: flex;
          gap: 10px;
          line-height: 1.5;

          .accent {
            flex-shrink: 0;
            font-size: 0.7rem;
            margin-top: 5px;
          }
        }
      }

      &__tech {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      &__tag {
        font-size: 0.75rem;
        padding: 4px 10px;
        background: rgba(var(--accent-rgb), 0.08);
        color: var(--accent);
        border-radius: 4px;
        border: 1px solid rgba(var(--accent-rgb), 0.15);
      }
    }
  `,
})
export class ExperienceComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  i18n = inject(I18nService);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const line = this.el.nativeElement.querySelector('.timeline__line');
    if (line) {
      gsap.from(line, {
        scaleY: 0,
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: line,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });
    }
  }
}

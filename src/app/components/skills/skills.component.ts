import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { I18nService } from '../../i18n/i18n.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="skills" id="skills">
      <div class="skills__container">
        <div class="skills__header" appScrollAnimation>
          <span class="section-label mono">{{ i18n.translations().skills.label }}</span>
          <h2>{{ i18n.translations().skills.title }}</h2>
          <div class="section-line"></div>
        </div>

        <div class="skills__grid">
          @for (category of i18n.translations().skills.categories; track category.title; let idx = $index) {
            <div
              class="skills__category"
              appScrollAnimation
              [animationDelay]="idx * 0.15"
            >
              <div class="skills__category-header">
                <span class="skills__category-icon">{{ category.icon }}</span>
                <h3>{{ category.title }}</h3>
              </div>

              <div class="skills__list">
                @for (skill of category.skills; track skill.name) {
                  <div class="skill">
                    <div class="skill__header">
                      <span class="skill__name mono">{{ skill.name }}</span>
                      <span class="skill__percent mono accent">
                        {{ animated() ? skill.level : 0 }}%
                      </span>
                    </div>
                    <div class="skill__bar">
                      <div
                        class="skill__fill"
                        [style.width.%]="animated() ? skill.level : 0"
                      >
                        <div class="skill__glow"></div>
                      </div>
                    </div>
                  </div>
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

    .skills {
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
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;

        @include responsive(lg) {
          grid-template-columns: repeat(2, 1fr);
        }

        @include responsive(md) {
          grid-template-columns: 1fr;
        }
      }

      &__category {
        @include glass-card;
        padding: 32px;
      }

      &__category-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 28px;
      }

      &__category-icon {
        font-size: 1.5rem;
      }

      &__list {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }

    .skill {
      &__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      &__name {
        font-size: 0.85rem;
        color: var(--text-secondary);
      }

      &__percent {
        font-size: 0.8rem;
      }

      &__bar {
        height: 6px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 3px;
        overflow: hidden;
        position: relative;
      }

      &__fill {
        height: 100%;
        background: var(--gradient-accent);
        border-radius: 3px;
        transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
      }

      &__glow {
        position: absolute;
        right: 0;
        top: -2px;
        width: 10px;
        height: 10px;
        background: var(--accent);
        border-radius: 50%;
        filter: blur(4px);
        opacity: 0.6;
      }
    }
  `,
})
export class SkillsComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  i18n = inject(I18nService);

  animated = signal(false);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    ScrollTrigger.create({
      trigger: this.el.nativeElement,
      start: 'top 70%',
      once: true,
      onEnter: () => this.animated.set(true),
    });
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  inject,
  PLATFORM_ID,
  signal,
  computed,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { I18nService } from '../../i18n/i18n.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  current: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="about" id="about">
      <div class="about__container">
        <div class="about__header" appScrollAnimation>
          <span class="section-label mono">{{ i18n.translations().about.label }}</span>
          <h2>{{ i18n.translations().about.title }}</h2>
          <div class="section-line"></div>
        </div>

        <div class="about__grid">
          <div class="about__text" appScrollAnimation [animationDelay]="0.1">
            @for (paragraph of i18n.translations().about.paragraphs; track $index) {
              <p [innerHTML]="paragraph"></p>
            }

            <div class="about__tech-list">
              <span class="mono">{{ i18n.translations().about.techTitle }}</span>
              <ul>
                @for (tech of i18n.translations().about.technologies; track tech) {
                  <li class="mono">
                    <span class="accent">▹</span> {{ tech }}
                  </li>
                }
              </ul>
            </div>
          </div>

          <div class="about__stats" appScrollAnimation animationType="fadeRight" [animationDelay]="0.2">
            @for (stat of stats(); track stat.label) {
              <div class="about__stat-card">
                <div class="about__stat-value mono">
                  {{ stat.current }}<span class="accent">{{ stat.suffix }}</span>
                </div>
                <div class="about__stat-label">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    @use '../../../../src/styles/mixins' as *;

    .about {
      @include section;

      &__container {
        @include container;
      }

      &__header {
        @include section-title;
      }

      &__grid {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 60px;
        align-items: start;

        @include responsive(lg) {
          grid-template-columns: 1fr;
          gap: 40px;
        }
      }

      &__text {
        p {
          margin-bottom: 20px;
          font-size: 1.05rem;
        }
      }

      &__tech-list {
        margin-top: 24px;

        > span {
          display: block;
          color: var(--text-primary);
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        ul {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        li {
          font-size: 0.85rem;
          color: var(--text-secondary);
          padding: 4px 0;

          .accent {
            margin-right: 8px;
            font-size: 0.75rem;
          }
        }
      }

      &__stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      &__stat-card {
        @include glass-card;
        padding: 28px 20px;
        text-align: center;
      }

      &__stat-value {
        font-size: 2.4rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 8px;

        .accent {
          font-size: 1.4rem;
        }
      }

      &__stat-label {
        font-size: 0.85rem;
        color: var(--text-secondary);
      }
    }
  `,
})
export class AboutComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  i18n = inject(I18nService);

  private translatedStats = computed(() =>
    this.i18n.translations().about.stats.map(stat => ({
      ...stat,
      current: 0,
    }))
  );

  stats = signal<StatItem[]>(this.translatedStats());
  private countersAnimated = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    ScrollTrigger.create({
      trigger: this.el.nativeElement.querySelector('.about__stats'),
      start: 'top 80%',
      once: true,
      onEnter: () => {
        this.countersAnimated = true;
        this.animateCounters();
      },
    });

    // Update stats labels when locale changes (but keep counter values)
    setInterval(() => {
      const translated = this.translatedStats();
      const current = this.stats();
      const needsUpdate = translated.some((stat, idx) => stat.label !== current[idx]?.label);
      if (needsUpdate) {
        this.stats.set(
          translated.map((stat, idx) => ({
            ...stat,
            current: this.countersAnimated ? stat.value : 0,
          }))
        );
      }
    }, 200);
  }

  private animateCounters(): void {
    const currentStats = this.translatedStats();
    currentStats.forEach((stat, idx) => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        delay: idx * 0.15,
        ease: 'power2.out',
        onUpdate: () => {
          this.stats.update(prev => {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], current: Math.round(obj.val) };
            return updated;
          });
        },
      });
    });
  }
}

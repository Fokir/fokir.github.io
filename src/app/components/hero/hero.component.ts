import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  viewChild,
  inject,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CodeBackgroundComponent } from '../../shared/components/code-background/code-background.component';
import { I18nService } from '../../i18n/i18n.service';
import { ScrollService } from '../../shared/services/scroll.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CodeBackgroundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" id="hero">
      <app-code-background />

      <div class="hero__particles">
        @for (particle of particles; track $index) {
          <div
            class="hero__particle"
            [style.left.%]="particle.x"
            [style.top.%]="particle.y"
            [style.animation-delay.s]="particle.delay"
            [style.width.px]="particle.size"
            [style.height.px]="particle.size"
          ></div>
        }
      </div>

      <div class="hero__content" #heroContent>
        <p class="hero__greeting mono animate-item">{{ i18n.translations().hero.greeting }}</p>
        <h1 class="hero__name animate-item">{{ i18n.translations().hero.name }}</h1>
        <h2 class="hero__title animate-item">
          <span #prefixEl></span><span class="gradient-text" #typedEl></span><span class="hero__caret">|</span>
        </h2>
        <p class="hero__description animate-item">
          {{ i18n.translations().hero.bio }}
        </p>
        <div class="hero__cta animate-item">
          <button class="hero__btn hero__btn--primary" (click)="scrollTo('projects')">
            {{ i18n.translations().hero.viewWork }}
          </button>
          <button class="hero__btn hero__btn--secondary" (click)="scrollTo('contact')">
            {{ i18n.translations().hero.getInTouch }}
          </button>
        </div>
      </div>

      <div class="hero__scroll-indicator">
        <div class="hero__scroll-mouse">
          <div class="hero__scroll-wheel"></div>
        </div>
        <span class="mono">{{ i18n.translations().hero.scrollDown }}</span>
      </div>
    </section>
  `,
  styles: `
    @use '../../../../src/styles/mixins' as *;

    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;

      &__particles {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      &__particle {
        position: absolute;
        background: var(--accent);
        border-radius: 50%;
        opacity: 0;
        animation: particle-float 8s ease-in-out infinite;
      }

      &__content {
        @include container;
        position: relative;
        z-index: 1;
        max-width: 800px;
        padding-top: var(--header-height);

        .animate-item {
          opacity: 0;
          transform: translateY(20px);
        }
      }

      &__greeting {
        font-size: 1rem;
        color: var(--accent);
        margin-bottom: 16px;
        display: block;
      }

      &__name {
        font-size: clamp(2.8rem, 6vw, 5rem);
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 8px;
        letter-spacing: -1px;
      }

      &__title {
        font-size: clamp(1.8rem, 4vw, 3.2rem);
        font-weight: 700;
        color: var(--text-secondary);
        margin-bottom: 24px;

        .gradient-text {
          display: inline;
        }
      }

      &__caret {
        display: inline-block;
        color: var(--accent);
        animation: blink 1s step-end infinite;
        font-weight: 300;
        margin-left: 2px;
      }

      &__description {
        max-width: 540px;
        font-size: 1.05rem;
        line-height: 1.8;
        margin-bottom: 40px;
      }

      &__cta {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }

      &__btn {
        padding: 14px 32px;
        font-family: var(--font-mono);
        font-size: 0.9rem;
        border-radius: var(--border-radius-sm);
        transition: all var(--transition-base);
        position: relative;
        overflow: hidden;

        &--primary {
          background: transparent;
          border: 1px solid var(--accent);
          color: var(--accent);

          &:hover {
            background: rgba(var(--accent-rgb), 0.1);
            box-shadow: var(--shadow-glow);
            transform: translateY(-2px);
          }
        }

        &--secondary {
          background: transparent;
          border: 1px solid var(--text-muted);
          color: var(--text-secondary);

          &:hover {
            border-color: var(--accent);
            color: var(--accent);
            transform: translateY(-2px);
          }
        }
      }

      &__scroll-indicator {
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
        width: fit-content;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        z-index: 1;
        animation: float 3s ease-in-out infinite;

        @media (max-width: 768px) {
          display: none;
        }

        span {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 2px;
          text-transform: uppercase;
        }
      }

      &__scroll-mouse {
        width: 24px;
        height: 38px;
        border: 2px solid var(--text-muted);
        border-radius: 12px;
        display: flex;
        justify-content: center;
        padding-top: 8px;
      }

      &__scroll-wheel {
        width: 3px;
        height: 8px;
        background: var(--accent);
        border-radius: 2px;
        animation: float 2s ease-in-out infinite;
      }
    }
  `,
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private scrollService = inject(ScrollService);
  i18n = inject(I18nService);
  private heroContent = viewChild<ElementRef>('heroContent');
  private prefixEl = viewChild<ElementRef>('prefixEl');
  private typedEl = viewChild<ElementRef>('typedEl');

  private typedTimeout?: ReturnType<typeof setTimeout>;
  private currentStringIndex = 0;

  particles = Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    size: Math.random() * 4 + 1,
  }));

  constructor() {
    effect(() => {
      const strings = this.i18n.translations().hero.typedStrings;
      if (strings && isPlatformBrowser(this.platformId)) {
        this.currentStringIndex = 0;
        this.restartTypedEffect();
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const content = this.heroContent()?.nativeElement;
    if (content) {
      const items = content.querySelectorAll('.animate-item');
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      });
    }
  }

  ngOnDestroy(): void {
    if (this.typedTimeout) clearTimeout(this.typedTimeout);
  }

  scrollTo(section: string): void {
    this.scrollService.scrollTo(section);
  }

  private restartTypedEffect(): void {
    if (this.typedTimeout) clearTimeout(this.typedTimeout);
    const prefixNative = this.prefixEl()?.nativeElement;
    const typedNative = this.typedEl()?.nativeElement;
    if (prefixNative) prefixNative.textContent = '';
    if (typedNative) typedNative.textContent = '';
    this.startTypedEffect();
  }

  private startTypedEffect(): void {
    const prefixNative = this.prefixEl()?.nativeElement;
    const typedNative = this.typedEl()?.nativeElement;
    if (!prefixNative || !typedNative) return;

    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const strings = this.i18n.translations().hero.typedStrings;
      const item = strings[this.currentStringIndex];
      const prefixPart = item.prefix;
      const textPart = item.text;
      // Full string: "prefix text" (with space separator)
      const fullText = prefixPart + ' ' + textPart;
      const prefixLen = prefixPart.length;

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      // Split rendering: prefix in normal span, text in gradient span
      // prefixLen+1 accounts for the space separator between prefix and text
      if (charIndex <= prefixLen) {
        prefixNative.textContent = fullText.substring(0, charIndex);
        typedNative.textContent = '';
      } else if (charIndex === prefixLen + 1) {
        // Space character — show it as trailing space on prefix
        prefixNative.textContent = prefixPart + ' ';
        typedNative.textContent = '';
      } else {
        prefixNative.textContent = prefixPart + ' ';
        typedNative.textContent = fullText.substring(prefixLen + 1, charIndex);
      }

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === fullText.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        this.currentStringIndex = (this.currentStringIndex + 1) % strings.length;
        delay = 400;
      }

      this.typedTimeout = setTimeout(type, delay);
    };

    this.typedTimeout = setTimeout(type, 1500);
  }
}

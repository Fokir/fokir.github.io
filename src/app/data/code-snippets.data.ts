export const CODE_SNIPPETS: string[] = [
  `@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <section class="hero">
      <div class="hero__content">
        <span class="hero__greeting mono">
          Hello, my name is
        </span>
        <h1 class="hero__name">
          Andrew Sokolov
        </h1>
        <h2 class="hero__title gradient-text">
          {{ currentTitle }}
        </h2>
      </div>
    </section>
  \`
})
export class HeroComponent {
  private typed = inject(TypedService);
  currentTitle = signal('Senior Angular Developer');
}`,

  `export class ScrollAnimationDirective {
  private el = inject(ElementRef);

  ngOnInit() {
    gsap.from(this.el.nativeElement, {
      scrollTrigger: {
        trigger: this.el.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }
}`,

  `@Injectable({ providedIn: 'root' })
export class ScrollService {
  private scrollDispatcher = inject(ScrollDispatcher);

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  getScrollPosition(): Observable<number> {
    return this.scrollDispatcher
      .scrolled()
      .pipe(map(() => window.scrollY));
  }
}`,

  `interface SkillBar {
  name: string;
  level: number;
  animated: boolean;
}

@Component({
  selector: 'app-skills',
  template: \`
    @for (category of categories; track category.title) {
      <div class="skills__category">
        <h3>{{ category.title }}</h3>
        @for (skill of category.skills; track skill.name) {
          <div class="skill-bar">
            <div class="skill-bar__fill"
                 [style.width.%]="skill.level">
            </div>
          </div>
        }
      </div>
    }
  \`
})`,

  `const timelineAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: '.experience',
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
  }
});

timelineAnimation
  .from('.timeline__item', {
    opacity: 0,
    x: -50,
    stagger: 0.3,
    duration: 1,
    ease: 'power2.out',
  })
  .from('.timeline__line', {
    scaleY: 0,
    transformOrigin: 'top',
    duration: 2,
  }, '<');`,

  `@Component({
  selector: 'app-project-card',
  host: {
    'class': 'project-card',
    '[class.featured]': 'featured()',
    '(mouseenter)': 'onHover(true)',
    '(mouseleave)': 'onHover(false)',
  },
})
export class ProjectCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  technologies = input<string[]>([]);
  featured = input(false);

  isHovered = signal(false);

  onHover(state: boolean) {
    this.isHovered.set(state);
  }
}`,
];

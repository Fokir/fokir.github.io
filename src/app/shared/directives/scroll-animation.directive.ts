import { Directive, ElementRef, inject, input, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private trigger?: ScrollTrigger;

  animationType = input<'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'fadeIn'>('fadeUp');
  animationDelay = input(0);
  animationDuration = input(0.8);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const props: gsap.TweenVars = {
      opacity: 0,
      duration: this.animationDuration(),
      delay: this.animationDelay(),
      ease: 'power3.out',
    };

    switch (this.animationType()) {
      case 'fadeUp': props['y'] = 50; break;
      case 'fadeLeft': props['x'] = -50; break;
      case 'fadeRight': props['x'] = 50; break;
      case 'scaleIn': props['scale'] = 0.8; break;
      case 'fadeIn': break;
    }

    props['scrollTrigger'] = {
      trigger: this.el.nativeElement,
      start: 'top 85%',
      toggleActions: 'play none none none',
    };

    gsap.from(this.el.nativeElement, props);
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}

import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EN } from './en';
import { RU } from './ru';
import { Translations } from './types';

export type Locale = 'en' | 'ru';

const STORAGE_KEY = 'portfolio-locale';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private platformId = inject(PLATFORM_ID);

  locale = signal<Locale>(this.detectLocale());

  translations = computed<Translations>(() =>
    this.locale() === 'ru' ? RU : EN
  );

  oppositeLocaleLabel = computed(() =>
    this.locale() === 'ru' ? 'EN' : 'RU'
  );

  switchLanguage(): void {
    const next: Locale = this.locale() === 'en' ? 'ru' : 'en';
    this.locale.set(next);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }

  get(key: string): string {
    const keys = key.split('.');
    let result: unknown = this.translations();

    for (const segment of keys) {
      if (result && typeof result === 'object' && segment in result) {
        result = (result as Record<string, unknown>)[segment];
      } else {
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  }

  getArray(key: string): string[] {
    const keys = key.split('.');
    let result: unknown = this.translations();

    for (const segment of keys) {
      if (result && typeof result === 'object' && segment in result) {
        result = (result as Record<string, unknown>)[segment];
      } else {
        return [];
      }
    }

    return Array.isArray(result) ? result : [];
  }

  private detectLocale(): Locale {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === 'en' || stored === 'ru') {
        return stored;
      }

      const browserLang = navigator.language || '';
      if (browserLang.startsWith('ru')) {
        return 'ru';
      }
    }

    return 'en';
  }
}

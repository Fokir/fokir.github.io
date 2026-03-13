import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CODE_SNIPPETS } from '../../../data/code-snippets.data';

@Component({
  selector: 'app-code-background',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="code-bg">
      <div class="code-bg__scroll">
        <pre class="code-bg__content">{{ codeContent }}</pre>
        <pre class="code-bg__content">{{ codeContent }}</pre>
      </div>
      <div class="code-bg__overlay"></div>
    </div>
  `,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    }

    .code-bg {
      position: relative;
      width: 100%;
      height: 100%;

      &__scroll {
        animation: scroll-code 60s linear infinite;
      }

      &__content {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        line-height: 1.6;
        color: rgba(100, 255, 218, 0.06);
        white-space: pre-wrap;
        word-break: break-all;
        padding: 20px;
        user-select: none;
      }

      &__overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          180deg,
          var(--bg-primary) 0%,
          transparent 15%,
          transparent 85%,
          var(--bg-primary) 100%
        );
      }
    }
  `,
})
export class CodeBackgroundComponent {
  opacity = input(0.06);

  codeContent = CODE_SNIPPETS.join('\n\n// ─────────────────────────────\n\n');
}

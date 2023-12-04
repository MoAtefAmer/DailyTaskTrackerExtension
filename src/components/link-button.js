import { LitElement, html, css } from 'lit';
import { externalLinkIcon } from '../icons.js';
import { ThemeMixin } from '../mixins/themeMixin.js';
export class LinkButton extends ThemeMixin(LitElement) {
  static styles = [css``];

  static get properties() {
    return {
      link: { type: String },
      isCompleted: { type: Boolean },
     
    };
  }

  constructor() {
    super();
    this.link = '';
  }

  connectedCallback() {
    super.connectedCallback();

  }
  render() {
    return html` <div
    class="${this.theme}"
      style="${this.isCompleted
        ? ' text-decoration: line-through; color: #b3b3b3;'
        : ''}"
      @click="${() => {
        if (this.link) window.open(this.link, '_blank');
      }}"
    >
      ${this.isCompleted
        ? externalLinkIcon('currentColor')
        : externalLinkIcon(this.theme === 'dark' ? '#fff' : 'blue')}
    </div>`;
  }
}

customElements.define('link-button', LinkButton);

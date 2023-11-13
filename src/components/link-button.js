import { LitElement, html, css } from 'lit';
import { externalLinkIcon } from '../icons.js';
export class LinkButton extends LitElement {
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

  render() {
    return html` <div
      style="${this.isCompleted
        ? ' text-decoration: line-through; color: #b3b3b3;'
        : ''}"
      @click="${() => {
        if (this.link) window.open(this.link, '_blank');
      }}"
    >
      ${this.isCompleted
        ? externalLinkIcon('currentColor')
        : externalLinkIcon('blue')}
    </div>`;
  }
}

customElements.define('link-button', LinkButton);

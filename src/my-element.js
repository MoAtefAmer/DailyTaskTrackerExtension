import { html, css, LitElement } from 'lit';

class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      color: var(--my-element-text-color, black);
    }
  `;

  render() {
    return html`
      <p>Hello, from my Lit element! Nibbbbba hahahha yollleo</p>
    `;
  }
}

customElements.define('my-element', MyElement);
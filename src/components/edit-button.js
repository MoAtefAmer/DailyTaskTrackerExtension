import { LitElement, html, css } from 'lit';
import { editIcon } from '../icons.js';
export class EditButton extends LitElement {
  static styles = [
    css`
      .change-color-onhover:hover {
        color: blue;
      }
    `,
  ];

  editTask() {
    this.dispatchEvent(
      new CustomEvent('edit-task', { bubbles: true, composed: true })
    );
  }

  static get properties() {
    return {
      isCompleted: { type: Boolean },
    };
  }

  render() {
    return html` <div
      class="change-color-onhover"
      @click=${this.editTask}
      style="${this.isCompleted
        ? ' text-decoration: line-through; color: #b3b3b3;'
        : ''}"
    >
      ${editIcon}
    </div>`;
  }
}

customElements.define('edit-button', EditButton);

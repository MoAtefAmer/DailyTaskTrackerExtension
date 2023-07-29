import { LitElement, html, css } from 'lit';
import { trashIcon } from '../../icons.js';

export class DeleteButton extends LitElement {
  static styles = [
    css`
      .change-color-onhover:hover {
        color: red;
      }
    `,
  ];

  deleteTask() {
    this.dispatchEvent(new CustomEvent('delete-task'));
  }

  static get properties(){
    return {
        isCompleted: { type: Boolean },
    }
  }


  render() {
    return html` <div
      class="change-color-onhover"
      @click=${this.deleteTask}
      style="${this.isCompleted
        ? ' text-decoration: line-through; color: #b3b3b3;'
        : ''}"
    >
      ${trashIcon}
    </div>`;
  }
}
customElements.define('delete-button', DeleteButton);

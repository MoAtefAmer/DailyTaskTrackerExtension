import { LitElement, html, css } from 'lit';

export const emptyCircle = (css) => html` <svg
  class="${css}"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  class="bi bi-circle"
  viewBox="0 0 16 16"
>
  <path
    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
  />
</svg>`;

export const checkCircle = (css) => html`
  <svg
    class="${css}"
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    fill="currentColor"
    class="bi bi-check-circle"
    viewBox="0 0 16 16"
  >
    <path
      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
    />
    <path
      d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
    />
  </svg>
`;

export class CompleteTaskButton extends LitElement {
  static styles = [
    css`
      .icon-container {
        position: relative;
      }

      .icon,
      .icon-container .default-icon,
      .icon-container .hover-icon {
        position: absolute;
        top: 0; /* Adjust as needed */
        right: 1px; /* Adjust as needed */
        transition: opacity 0.5s, visibility 0.5s;
        opacity: 0;
        visibility: hidden;
      }

      .icon-container .default-icon {
        opacity: 1;
        visibility: visible;
      }

      .icon-container:hover .default-icon {
        opacity: 0;
        visibility: hidden;
      }

      .icon-container:hover .hover-icon {
        opacity: 1;
        visibility: visible;
        color: #b3b3b3;
      }
    `,
  ];

  static get properties() {
    return {
      isCompleted: { type: Boolean },
    };
  }

  toggleComplete() {
    this.dispatchEvent(
      new CustomEvent('toggle-complete', { bubbles: true, composed: true })
    );
  }

  render() {
    return html` ${this.isCompleted
      ? html`
          <div
            class="change-color-onhover"
            @click=${this.toggleComplete}
            style="text-decoration: line-through; color: #b3b3b3"
          >
            ${checkCircle('')}
          </div>
        `
      : html` <div class="icon-container" @click=${this.toggleComplete}>
          ${emptyCircle(' default-icon')} ${checkCircle('icon hover-icon')}
        </div>`}`;
  }
}
customElements.define('complete-task-button', CompleteTaskButton);

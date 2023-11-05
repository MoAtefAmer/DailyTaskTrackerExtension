import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../../styles';
import { SignalWatcher } from '@lit-labs/preact-signals';
import './delete-button.js';
import './edit-button.js';
import './complete-task-button.js';

import './link-button.js';
import { cardBeingEditedId } from '../state/signals.js';
import { setCardBeingEditedId } from '../state/setters.js';

export class TaskCard extends SignalWatcher(LitElement) {
  static styles = [
    sharedStyles,
    css`
      .edit-button {
        border: none;
        border-radius: 5px;
        padding: 15px;
        background-color: green;
        color: white;
      }

      .color-animation {
        color: red;
        transition: color 0.5s;
      }
    `,
  ];

  // State variables
  static get properties() {
    return {
      task: { type: Object },
      title: { type: String },
      date: { type: String },
      link: { type: String },
      isInfinite: { type: Boolean },
      maxLengthCharInput: { type: Number },
      createNewTask: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.task = {};
    this.title = '';
    this.date = '';
    this.link = '';
    this.isInfinite = false;
  }

  // Lifecycle functions
  connectedCallback() {
    super.connectedCallback();
    this.title = this.task?.title;
    this.date = this.task?.date;
    this.isInfinite = this.task?.date === 'infinite' ? true : false;
    this.setLink();
  }

  setLink() {
    this.link = this.extractUrl(this.task?.title);
  }

  extractUrl(text) {
    const urlRegex = /\s?(https?:\/\/[^\s]+)\s?/g;
    const match = text.match(urlRegex);
    return match ? match[0] : '';
  }

  // Events
  openEditingMode() {
    this.dispatchEvent(
      new CustomEvent('open-editing-mode', { bubbles: true, composed: true })
    );
  }

  editTask() {
    this.dispatchEvent(
      new CustomEvent('edit-task', { bubbles: true, composed: true })
    );
  }
  editTaskSubmit(title, isInfinite) {
    this.dispatchEvent(
      new CustomEvent('edit-task-submit', { detail: { title, isInfinite } })
    );
    this.setLink();
  }

  deleteTask() {
    this.dispatchEvent(
      new CustomEvent('delete-task', { bubbles: true, composed: true })
    );
  }

  completeTask() {
    this.dispatchEvent(new CustomEvent('complete-task'), {
      bubbles: true,
      composed: true,
    });
  }

  // Functions
  toggleInfinite() {
    this.isInfinite = !this.isInfinite;
  }

  isEditingModeOpen() {
    return cardBeingEditedId.value === this.task?.id;
  }

  removeUrl(text) {
    const urlRegex = /\s?(https?:\/\/[^\s]+)\s?/g;
    console.log('text :>> ', text);
    const result = text.replace(urlRegex, '');
    console.log('result :>> ', result);
    return result;
  }


  render() {
    return html`<div class="quest-card" style="max-width:300px;">
      <div class="flex-between">
        <div
          class="task-title"
          style="${this.task?.isCompleted
            ? ' text-decoration: line-through; color: #b3b3b3;'
            : ''}"
        >
          ${this.isEditingModeOpen()
            ? html`
                <input
                  id="task-edit-input"
                  style=" border: none;background: transparent;outline: none;box-shadow: none;"
                  .value=${this.task.title}
                  @input=${(e) => {
                    this.title = e.target.value;
                    // Remove the URL from the input box after processing it
                    // this.title = this.extractUrl(this.title);
                  }}
                  type="text"
                  minlength="1"
                  maxlength="${this.maxLengthCharInput}"
                />

                <input
                  type="checkbox"
                  @click=${this.toggleInfinite}
                  .checked=${this.isInfinite}
                />
                <button
                  @click=${(e) => {
                    console.log('this.title :>> ', this.title);
                    this.editTaskSubmit(this.title, this.isInfinite);
                    // this.title = this.removeUrl(this.title);

                    setCardBeingEditedId('');
                  }}
                  class="edit-button"
                  style="background:green;;z-index:100;"
                >
                  edit
                </button>
              `
            : html`<span
                  style="word-break: break-all; overflow-wrap: break-word; max-width:250px;"
                  >${this.removeUrl(this.task?.title)}</span
                >
                ${this.link
                  ? html`<div style="padding-left:5px;"><link-button .isCompleted='${this.task?.isCompleted}' link="${this.link}"></link-button></div>`
                  : ''} `}
        </div>

        ${!this.isEditingModeOpen()
          ? html` <complete-task-button
              .isCompleted="${this.task?.isCompleted}"
              @toggle-complete="${this.completeTask}"
            ></complete-task-button>`
          : ''}
      </div>

      <div id="divider"></div>
      <div class="flex-between">
        <div class="timestamp">
          ${this.task?.date !== 'infinite' ? this.task?.date : 'Daily Quest'}
        </div>

        <div
          style="display: flex;justify-content: center;align-items: center; gap: 5px;"
        >
          <edit-button
            .isCompleted="${this.task?.isCompleted}"
            @click=${() => {
              this.title = ''; // dont know if this is useful or not
              if (this.isEditingModeOpen()) {
                setCardBeingEditedId('');
              } else {
                setCardBeingEditedId(this.task?.id);
              }
            }}
          ></edit-button>

          <delete-button
            .isCompleted="${this.task?.isCompleted}"
            @delete-task="${this.deleteTask}"
          >
          </delete-button>
        </div>
      </div>
    </div>`;
  }
}
customElements.define('task-card', TaskCard);

import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles.js';
import './delete-button.js';
import './edit-button.js';
import './complete-task-button.js';
import './link-button.js';
import { state } from '../state/state.js';

export class TaskCard extends LitElement {
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
      isEditingModeOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.task = {};
    this.title = '';
    this.date = '';
    this.link = '';
    this.isInfinite = false;
    this.isEditingModeOpen = false;
  }

  // Lifecycle functions
  connectedCallback() {
    super.connectedCallback();
    this.title = this.task?.title;
    this.date = this.task?.date;
    this.isInfinite = this.task?.date === 'infinite' ? true : false;
    this.setLink();
    this.stateListener();
  }

  isThereALink() {
    return this.extractUrl(this.task?.title);
  }

  setLink() {
    this.link = this.extractUrl(this.task?.title);
  }

  extractUrl(text) {
    const urlRegex = /\s?(https?:\/\/[^\s]+)\s?/g;
    const fileRegex = /\s?(file:\/\/\/[^\s]+)\s?/g;
    let match = text.match(urlRegex);

    if (!match) {
      match = text.match(fileRegex);
    }

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

  isThisInfinite(task) {
    return task.date === 'infinite' ? true : false;
  }

  stateListener() {
    state.addEventListener('CardBeingEditedId', (e) => {
      if (e.detail.value === this.task?.id) {
        this.isEditingModeOpen = true;
      } else {
        this.isEditingModeOpen = false;
      }
    });
  }

  removeUrl(text) {
    const urlRegex = /\s?(https?:\/\/[^\s]+)\s?/g;
    const fileRegex = /\s?(file:\/\/\/[^\s]+)\s?/g;
    let result = text.replace(urlRegex, '');
    result = result.replace(fileRegex, '');

    return result;
  }

  handleChange(event) {
    this.title = event.target.value;
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
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
          ${this.isEditingModeOpen
            ? html`
                <textarea
                  id="task-edit-input"
                  style=" border: none;background: transparent;outline: none;box-shadow: none; max-width:250px; resize: none"
                  .value=${this.task.title}
                  @input=${(e) => {
                    this.handleChange(e);
                  }}
                  type="text"
                  minlength="1"
                  maxlength="${this.maxLengthCharInput}"
                >
                </textarea>

                <div>
                  <input
                    type="checkbox"
                    @click=${this.toggleInfinite}
                    .checked=${this.isThisInfinite(this.task)}
                  />
                  <button
                    @click=${(e) => {
                      this.editTaskSubmit(this.title, this.isInfinite);

                      state.set('CardBeingEditedId', '');
                    }}
                    class="edit-button"
                    style="background:green;z-index:100;"
                  >
                    edit
                  </button>
                </div>
              `
            : html`<span
                  style="word-break: break-all; overflow-wrap: break-word; max-width:250px;"
                  >${this.removeUrl(this.task?.title)}</span
                >
                ${this.isThereALink()
                  ? html`<div style="padding-left:5px;">
                      <link-button
                        .isCompleted="${this.task?.isCompleted}"
                        link="${this.link}"
                      ></link-button>
                    </div>`
                  : ''} `}
        </div>

        ${!this.isEditingModeOpen
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
              if (this.isEditingModeOpen) {
                state.set('CardBeingEditedId', '');
              } else {
                state.set('CardBeingEditedId', this.task?.id);
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

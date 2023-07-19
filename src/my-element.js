import { html, css, LitElement } from 'lit';
import { map } from 'lit/directives/map.js';
import { sharedStyles } from '../styles.js';
import { checkmark, editIcon, trashIcon } from '../icons.js';

class MyElement extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
    `,
  ];

  static get properties() {
    return {
      task: { type: String },
      tasks: { type: Object },
    };
  }

  constructor() {
    super();
    this.task = '';
    this.tasks = [];
  }

  async saveTask2() {
    const { tasks } = await chrome.storage.sync.get('tasks');
    console.log('tasks :>> ', tasks);

    if (tasks === undefined || null){
      await chrome.storage.sync.set({
        tasks: []
      });
    }
    await chrome.storage.sync.set({
      tasks: [...tasks,{
        id: this.generateId(),
        title: this.task,
        date: new Date().toISOString(),
      }],
    });
    // await chrome.storage.sync.set({ tasks: null });
    this.task = '';
    this.loadTasks();
  }

  firstUpdated() {
    this.loadTasks();
  }

  generateId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  async loadTasks() {
    const { tasks } = await chrome.storage.sync.get('tasks');
    this.tasks = tasks;
    console.log('this.tasks :>> ', this.tasks);
  }

  render() {
    return html`
      <section class="main">
        <form
          @submit=${(e) => {
            e.preventDefault();
            // console.log('this.task :>> ', this.task);
            // console.log('e.target.value :>> ', e.target.value);
            // this.saveTask()
            this.saveTask2();
            console.log('this.tasks :>> ', this.tasks);
            // this.task = '';
            // this.requestUpdate()
          }}
        >
          <input
            id="task-input"
            .value=${this.task}
            @input=${(e) => {
              this.task = e.target.value;
            }}
            type="text"
          />
          <button type="submit">click</button>
        </form>
        ${
        map(
          this.tasks,
          (task) => html` <div class="quest-card">
            <div class="flex-between">
              <div class="task-title">${task.title}</div>

              <div style="display: flex">${checkmark}</div>
            </div>

            <div id="divider"></div>
            <div class="flex-between">
              <div class="timestamp">${task.date}</div>

              <div
                style="
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 5px;
            "
              >
                <div>${editIcon}</div>

                <div>${trashIcon}</div>
              </div>
            </div>
          </div>`
        )}
      </section>
    `;
  }
}

customElements.define('my-element', MyElement);

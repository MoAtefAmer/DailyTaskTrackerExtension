import { html, css, LitElement } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { sharedStyles } from '../styles.js';
import { state } from './state/state.js';


import './components/task-card.js';

class App extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
      #task-input {
        border: none;
        border-radius: 5px;
        /* background: #f5f5f5; */
        outline: none;
        box-shadow: none;
        padding: 0.5rem;
      }
      #create-task-form {
        display: flex;
        margin: 1rem;
        background-color: white;
        border-radius: 5px;
        padding: 1rem;
      }

      .submit-button {
        border: none;
        border-radius: 5px;
        padding: 15px;
        background-color: #2563eb;
        color: white;
      }
    `,
  ];

  static get properties() {
    return {
      task: { type: String },
      tasks: { type: Object },
      isInfinite: { type: Boolean },
      cardBeingEditedId: { type: String },
      createNewTask: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.task = '';
    this.tasks = [];
    this.isInfinite = false;
    this.cardBeingEditedId = '';
    this.createNewTask = false;
    this.maxLengthCharInput = 200; // max length for character input
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadTasks();
    this.calculateDailyQuests();
  }

  updated() {
    this.shadowRoot.getElementById('task-edit-input')?.focus();
    this.shadowRoot.getElementById('task-input')?.focus();
  }

  async loadTasks() {
    // Always use this for global reload of tasks
    const { tasks } = await chrome.storage.sync.get('tasks');
    this.tasks = this.sortTasks(tasks);
  }

  sortTasks(tasks) {
    tasks.sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      if (a.date !== b.date) {
        return a.date === 'infinite' ? -1 : 1;
      }
      return 0;
    });

    return tasks;
  }

  async calculateDailyQuests() {
    let storedTime = await chrome.storage.local.get('currentDate');
    const storedDateString = storedTime.currentDate;
    // init
    if (storedTime.currentDate === undefined) {
      chrome.storage.local.set({ currentDate: this.getNextDayDate() });
      storedTime = await chrome.storage.local.get('currentDate');
    }

    const todaysDate = new Date().toLocaleDateString('en-US');

    if (storedDateString <= todaysDate) {
      if (this.tasks.length !== 0) {
        this.tasks = this.tasks.filter((task) => {
          if (task.isCompleted) {
            if (task.date === 'infinite') {
              task.isCompleted = false;
              return true; // keep in the array
            }
            // else clause, task is completed and date is not 'infinite'
            return false; // remove from the array
          }
          return true; // keep in the array
        });
        this.setTasks(this.tasks);

        chrome.storage.local.set({ currentDate: this.getNextDayDate() });
      }
    }
  }

  getNextDayDate() {
    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1); // Set the date to tomorrow
    return nextDay.toLocaleDateString('en-US');
  }

  toggleInfinite() {
    this.isInfinite = !this.isInfinite;
  }

  generateId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  async deleteAllTasks() {
    await chrome.storage.sync.set({ tasks: [] });
    this.loadTasks();
  }

  async setTasks(tasks) {


    if (tasks !== undefined || null || [] || tasks.length !== 0) {
      await chrome.storage.sync.set({ tasks });
    } else {
      await chrome.storage.sync.set({ tasks: [] });
    }

    await this.loadTasks();
  }

  async deleteTask(id) {
   
    let newTasks = this.tasks.filter((task) => task.id !== id);

    this.setTasks(newTasks);
    // this.tasks = newTasks.length === 0 ? [] : newTasks;
  }

  async completeTask(id) {
    this.tasks.forEach((task) => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
        // return;
      }
    });


    // this.setTasks(this.sortTasks(this.tasks));
    this.setTasks(this.tasks);
  }

  async editTask(taskId, title, isInfinite) {
    if (this.tasks && this.tasks.length > 0) {
      this.tasks.forEach((task) => {
        if (task.id === taskId) {
          let date = new Date().toLocaleString('en-GB');
          if (!isInfinite) {
            task.date = date;
          }
          if (isInfinite) task.date = 'infinite';

          if (title !== '') task.title = title;
        }
      });


      this.setTasks((this.tasks));
    }
  }

  async saveTask2() {
    const { tasks } = await chrome.storage.sync.get('tasks');

    if (tasks === undefined || null || tasks.length === 0) {
      await chrome.storage.sync.set({ tasks: [] });
    }
    let date = new Date().toLocaleString('en-GB');
    if (this.isInfinite) {
      date = 'infinite';
    }

    if (tasks) {
      await chrome.storage.sync.set({
        tasks: [
          ...tasks,
          {
            id: this.generateId(),
            title: this.task,
            date: date,
            isCompleted: false,
            isEditMode: false,
          },
        ],
      });
    } else {
      // Init first time
      await chrome.storage.sync.set({
        tasks: [
          {
            id: this.generateId(),
            title: this.task,
            date: date,
            isCompleted: false,
            isEditMode: false,
          },
        ],
      });
    }

    // await chrome.storage.sync.set({ tasks: null });
    this.task = '';
    this.loadTasks();
  }



  handleChange(event) {
    this.task = event.target.value;
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }

  render() {
    return html`
      <section class="main">
        ${this.createNewTask
          ? html` <div>
                ${this.createNewTask
                  ? html`<button
                      style="background:red;cursor:pointer;"
                      class="submit-button"
                      @click="${() => (this.createNewTask = false)}"
                    >
                      Close
                    </button>`
                  : ''}
              </div>
              <form
                id="create-task-form"
                @submit=${(e) => {
                  e.preventDefault();

                  this.saveTask2();
                  this.createNewTask = false;
                }}
              >
                <div
                  style="display:flex;align-items:center;justify-content:center;"
                >
                  <textarea
                  style="resize:none;"
                    id="task-input"
                    .value=${this.task}
                    @input=${(e) => {
                     this.handleChange(e)
                    }}
                    type="text"
                    minlength="1"
                    maxlength="${this.maxLengthCharInput}"
                  > </textarea>
                </div>

                <div style="display:flex;align-items:center;margin:1rem;">
                  <label>
                    <input
                      id="normal"
                      type="checkbox"
                      @click=${(e) => {
                        e.stopPropagation();
                        this.toggleInfinite();
                      }}
                      .checked=${this.isInfinite}
                    />
                  </label>
                </div>
                <div style="display:flex;align-items:center;">
                  <button
                    class="submit-button"
                    style="cursor:pointer;"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </form>`
          : html`<button
              class="submit-button"
              style="cursor:pointer;"
              @click=${() => (this.createNewTask = true)}
            >
              Create Task
            </button>`}
        ${!!this.tasks  && this.tasks.length !== 0
          ? repeat(
              this.tasks,
              (task) =>
                html`<task-card
                  .createNewTask="${this.createNewTask}"
                  .maxLengthCharInput="${this.maxLengthCharInput}"
                  @edit-task-submit="${(e) =>
                    this.editTask(
                      task?.id,
                      e.detail.title,
                      e.detail.isInfinite
                    )}"
                  @complete-task="${() => this.completeTask(task?.id)}"
                  @toggle-infinite="${() => this.toggleInfinite()}"
                  @delete-task="${() => this.deleteTask(task?.id)}"
                  .task="${task}"
                ></task-card>`
            )
          : ''}
      </section>
    `;
  }
}

customElements.define('app-main', App);

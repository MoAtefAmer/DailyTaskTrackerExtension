import { html, css, LitElement } from 'lit';
import { map } from 'lit/directives/map.js';
import { sharedStyles } from '../styles.js';
import { checkmark, editIcon, trashIcon } from '../icons.js';
import './components/delete-button.js';

class App extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      .change-color-onhover:hover {
        color: red;
      }
    `,
  ];

  static get properties() {
    return {
      task: { type: String },
      tasks: { type: Object },
      isInfinite: { type: Boolean },
      cardBeingEditedId: { type: String },
    };
  }

  getNextDayDate() {
    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1); // Set the date to tomorrow
    return nextDay.toLocaleDateString('en-US');
  }

  connectedCallback() {
    super.connectedCallback();
  }

  constructor() {
    super();
    this.task = '';
    this.tasks = [];
    this.isInfinite = false;
    this.cardBeingEditedId = '';
  }

  toggleInfinite() {
    this.isInfinite = !this.isInfinite;
  }

  async calculateDailyQuests() {
    let storedTime = await chrome.storage.local.get('currentDate');
    // chrome.storage.local.set({ currentDate: "7/26/2023" });

    if (
      storedTime?.currentDate?.length === 0 ||
      storedTime?.currentDate === undefined
    ) {
      chrome.storage.local.set({ currentDate: this.getNextDayDate() });
    } else {
      const storedDateString = storedTime.currentDate;
      const currentDateString = new Date().toLocaleDateString('en-US');
      if (storedDateString <= currentDateString && this.tasks.length !== 0) {
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

  async deleteAllTasks() {
    await chrome.storage.sync.set({ tasks: [] });
    this.loadTasks();
  }

  async deleteTask(id) {
    // const taskToBeDeleted = this.tasks.filter((task) => task.id === id);

    let newTasks = this.tasks.filter((task) => task.id !== id);

    this.setTasks(newTasks);
    this.tasks = newTasks.length === 0 ? [] : newTasks;
    this.loadTasks();
  }

  async setTasks(tasks) {
    if (tasks !== undefined || null || [] || tasks.length !== 0) {
      await chrome.storage.sync.set({ tasks });
    } else {
      await chrome.storage.sync.set({ tasks: [] });
    }

    this.loadTasks();
  }

  async completeTask(id) {
    const completedTask = this.tasks.filter((task) => task.id === id);

    let newTasks = this.tasks.filter((task) => task.id !== id);
    if (!!completedTask && completedTask[0]) {
      completedTask[0].isCompleted = !completedTask[0].isCompleted;
    }

    newTasks.push(completedTask[0]);

    this.tasks = newTasks.length === 0 ? [] : newTasks;
    this.setTasks(this.tasks);
  }

  async openEditingMode(id) {
    const taskToBeEdited = this.tasks.filter((task) => {
      if (task.id === id) {
        task.isEditMode = !task.isEditMode;
        if (!task.isEditMode) this.cardBeingEditedId = '';
        return task;
      }
    });

    this.tasks = this.tasks.map((task) =>
      task.id === id ? taskToBeEdited[0] : task
    );
    this.setTasks(this.tasks);
  }
  // Test this chatgpt code and see if it fits
  async editTask(taskId,title) {
    const { tasks } = await chrome.storage.sync.get('tasks');

    if (tasks && tasks.length > 0) {
      let updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          let date = new Date().toLocaleString('en-GB');
          if (this.isInfinite) {
            date = 'infinite';
          }

          return {
            ...task,
            title: title, // Presuming 'this.task' contains the updated task title.
            date: date,
            // Add any other properties that might be updated during the edit.
          };
        } else {
          return task;
        }
      });

      await chrome.storage.sync.set({ tasks: updatedTasks });
    }

    // this.task = '';
    this.loadTasks();
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

  async firstUpdated() {
    await this.loadTasks();
    this.calculateDailyQuests();
  }

  updated() {
    this.shadowRoot.getElementById('task-edit-input')?.focus();
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
  }

  render() {
    // console.log('this.tasks :>> ', this.tasks);
    console.log('this.cardBeingEdited :>> ', this.cardBeingEdited);
    return html`
      <section class="main">
        <button @click=${this.deleteAllTasks}>delete all</button>
        <form
          @submit=${(e) => {
            e.preventDefault();

            this.saveTask2();
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
          <input
            type="checkbox"
            @click=${this.toggleInfinite}
            .checked=${this.isInfinite}
          />
          <button type="submit">click</button>
        </form>
        ${!!this.tasks && this.tasks && this.tasks.length !== 0
          ? map(
              this.tasks.filter((task) => {
                if (task?.date === 'infinite') return task;
              }),
              (task) => html` <div class="quest-card">
                <div
                  class="flex-between"
                  @click=${() => {
                    if (!task.isEditMode) {
                      this.completeTask(task.id);
                    }
                  }}
                >
                  <div
                    class="task-title"
                    style="${task.isCompleted
                      ? ' text-decoration: line-through; color: #b3b3b3;'
                      : ''}"
                  >
                    ${!task.isEditMode
                      ? task.title
                      : html` <form
                          @submit=${(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                              this.openEditingMode(task.id);
                              this.cardBeingEditedId = '';

                              const inputElement =
                                this.shadowRoot.getElementById(
                                  'task-edit-input'
                                );
                              console.log(
                                'inputElement :>> ',
                                inputElement.value
                              );
                              this.editTask(task.id,inputElement.value);
                          }}
                        >
                          <input
                            id="task-edit-input"
                            style=" border: none;background: transparent;outline: none;box-shadow: none;"
                            .value=${task.title}
                            @input=${(e) => {
                              // console.log('As the hours pass :>> ', e.target.value);
                            }}
                            type="text"
                          />
                          <input
                            type="checkbox"
                            @click=${this.toggleInfinite}
                            .checked=${task.date === 'infinite' ? true : false}
                          />
                          <button
                            type="submit"
                            style="z-index:100;"
                            @click=${(e) => {
                              // e.stopPropagation();
                              // this.openEditingMode(task.id);
                              // this.cardBeingEditedId = '';

                              // const inputElement =
                              //   this.shadowRoot.getElementById(
                              //     'task-edit-input'
                              //   );
                              // console.log(
                              //   'inputElement :>> ',
                              //   inputElement.value
                              // );
                              // this.editTask(task.id,inputElement.value);
                            }}
                          >
                            click
                          </button>
                        </form>`}
                  </div>

                  <!-- <div style="display: flex">${checkmark}</div> -->
                </div>

                <div id="divider"></div>
                <div class="flex-between">
                  <div class="timestamp">
                    ${task.date !== 'infinite' ? task.date : 'Daily Quest'}
                  </div>

                  <div
                    style="display: flex;justify-content: center;align-items: center; gap: 5px;"
                  >
                    <div
                      @click=${() => {
                        if (
                          this.cardBeingEditedId === '' ||
                          this.cardBeingEditedId === task.id
                        ) {
                          this.cardBeingEditedId = task.id;
                          this.openEditingMode(task.id);
                        }
                      }}
                    >
                      ${editIcon}
                    </div>

                    <div
                      class="change-color-onhover"
                      @click=${(e) => this.deleteTask(task.id)}
                      style="${task.isCompleted
                        ? ' text-decoration: line-through; color: #b3b3b3;'
                        : ''}"
                    >
                      ${trashIcon}
                    </div>
                  </div>
                </div>
              </div>`
            )
          : ''}
        ${!!this.tasks && this.tasks && this.tasks.length !== 0
          ? map(
              this.tasks.filter((task) => task.date !== 'infinite'),
              (task) => html` <div class="quest-card">
                <div
                  class="flex-between"
                  @click=${() => this.completeTask(task.id)}
                >
                  <div
                    class="task-title"
                    style="${task.isCompleted
                      ? ' text-decoration: line-through; color: #b3b3b3;'
                      : ''}"
                  >
                    ${task.title}
                  </div>
                </div>

                <div id="divider"></div>
                <div class="flex-between">
                  <div class="timestamp">
                    ${task.date !== 'infinite' ? task.date : 'Daily Quest'}
                  </div>

                  <div
                    style="
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 5px;
            "
                  >
                    <div
                      style="${task.isCompleted
                        ? ' text-decoration: line-through; color: #b3b3b3;'
                        : ''} "
                    >
                      ${editIcon}
                    </div>

                    <div
                      class="change-color-onhover"
                      @click=${(e) => this.deleteTask(task.id)}
                      style="${task.isCompleted
                        ? ' text-decoration: line-through; color: #b3b3b3;'
                        : ''}"
                    >
                      ${trashIcon}
                    </div>
                  </div>
                </div>
              </div>`
            )
          : ''}
      </section>
    `;
  }
}

customElements.define('app-main', App);

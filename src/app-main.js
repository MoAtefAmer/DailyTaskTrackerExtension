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
      .change-color-edit-onhover:hover {
        color: blue;
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

  getNextDayDate() {
    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1); // Set the date to tomorrow
    return nextDay.toLocaleDateString('en-US');
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadTasks();
    this.calculateDailyQuests();
  }

  constructor() {
    super();
    this.task = '';
    this.tasks = [];
    this.isInfinite = false;
    this.cardBeingEditedId = '';
    this.createNewTask = false;
  }

  toggleInfinite() {
    this.isInfinite = !this.isInfinite;
  }

  async calculateDailyQuests() {
    let storedTime = await chrome.storage.local.get('currentDate');
    console.log('storedTime :>> ', storedTime);
    const storedDateString = storedTime.currentDate;
    // init
    if(storedTime.currentDate === undefined){
      chrome.storage.local.set({ currentDate: this.getNextDayDate() });
      storedTime = await chrome.storage.local.get('currentDate');
    }

    // chrome.storage.local.set({ currentDate: "7/26/2023" });
    console.log('storedDateString :>> ', storedTime.currentDate);
    console.log('new Date().toLocaleDateString :>> ', new Date().toLocaleDateString('en-US'));
    const todaysDate = new Date().toLocaleDateString('en-US');

    if(storedDateString <=todaysDate){
        console.log("stored time is less than todays date");
        if (this.tasks.length !== 0) {
          console.log("sdasdasd");
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
  async editTask(taskId, title) {
    const { tasks } = await chrome.storage.sync.get('tasks');

    if (tasks && tasks.length > 0) {
      let updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          let date = new Date().toLocaleString('en-GB');
          console.log('this.isInfininte :>> ', this.isInfinite);
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
    // await this.loadTasks();
    // this.calculateDailyQuests();
  }

  updated() {
    this.shadowRoot.getElementById('task-edit-input')?.focus();
    this.shadowRoot.getElementById('task-edit-input2')?.focus();
    this.shadowRoot.getElementById('task-input')?.focus();
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
        ${this.createNewTask
          ? html` <div>
                <button @click=${this.deleteAllTasks}>delete all</button>
                ${this.createNewTask? html`<button @click="${()=>this.createNewTask = false}">Close</button>`:''}
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
                  <input
                    id="task-input"
                    .value=${this.task}
                    @input=${(e) => {
                      this.task = e.target.value;
                    }}
                    type="text"
                  />
                </div>

                <div style="display:flex;align-items:center;margin:1rem;">
                  <label>
                    <input
                      id="normal"
                      type="checkbox"
                      @click=${(e) => {
                        e.stopPropagation();
                        this.toggleInfinite();
                        console.log('this.infinite :>> ', this.isInfinite);
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
          : html`<button class="submit-button" style="cursor:pointer;" @click=${() => (this.createNewTask = true)}>
              Create Task
            </button>`}
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
                              this.shadowRoot.getElementById('task-edit-input');
                            console.log(
                              'inputElement :>> ',
                              inputElement.value
                            );
                            this.editTask(task.id, inputElement.value);
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
                            @click=${(e) => {
                              e.stopPropagation();
                              this.toggleInfinite();
                              console.log(
                                'this.isInfinite :>> ',
                                this.isInfinite
                              );
                            }}
                            .checked=${task.date === 'infinite' ? true : false}
                          />
                          <button type="submit" style="z-index:100;">
                            click
                          </button>
                        </form>`}
                  </div>
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
                      class="change-color-edit-onhover"
                      style="${task.isCompleted
                        ? ' text-decoration: line-through; color: #b3b3b3;'
                        : ''} "
                      @click=${() => {
                        console.log(
                          'this.cardBeingEditedId :>> ',
                          this.cardBeingEditedId
                        );
                        if (
                          this.cardBeingEditedId === '' ||
                          this.cardBeingEditedId === task.id
                        ) {
                          console.log('asdasdasdasd');
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
                                'task-edit-input2'
                              );
                            console.log(
                              'inputElement :>> ',
                              inputElement.value
                            );
                            this.editTask(task.id, inputElement.value);
                          }}
                        >
                          <input
                            id="task-edit-input2"
                            style=" border: none;background: transparent;outline: none;box-shadow: none;"
                            .value=${task.title}
                            type="text"
                          />
                          <input
                            type="checkbox"
                            @click=${() => this.toggleInfinite()}
                            .checked=${task.date === 'infinite' ? true : false}
                          />
                          <button type="submit" style="z-index:100;">
                            click
                          </button>
                        </form>`}
                  </div>
                </div>

                <div id="divider"></div>
                <div class="flex-between">
                  <div class="timestamp">
                    ${task.date !== 'infinite' ? task.date : 'Daily Quest'}
                  </div>

                  <div
                    style="display: flex;justify-content: center;align-items:center;gap: 5px;"
                  >
                    <div
                      class="change-color-edit-onhover"
                      style="${task.isCompleted
                        ? ' text-decoration: line-through; color: #b3b3b3;'
                        : ''} "
                      @click=${() => {
                        console.log('ASD');
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
      </section>
    `;
  }
}

customElements.define('app-main', App);

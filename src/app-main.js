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
        this.tasks.forEach((task) => {
          if (task.isCompleted && task.date === 'infinite') {
            task.isCompleted = false;
          }
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

  async saveTask2() {
    const { tasks } = await chrome.storage.sync.get('tasks');

    if (tasks === undefined || null || tasks.length===0) {
      await chrome.storage.sync.set({ tasks: [] });

    }
    let date = new Date().toLocaleString('en-GB');
    if (this.isInfinite) {
      date = 'infinite';
    }

    await chrome.storage.sync.set({
      tasks: [
        ...tasks,
        {
          id: this.generateId(),
          title: this.task,
          date: date,
          isCompleted: false,
        },
      ],
    });
    // await chrome.storage.sync.set({ tasks: null });
    this.task = '';
    this.loadTasks();
  }

  async firstUpdated() {
    await this.loadTasks();
    this.calculateDailyQuests();
  }

  generateId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  async loadTasks() {
    const { tasks } = await chrome.storage.sync.get('tasks');
    
    this.tasks =tasks;
  }



  render() {
    console.log('this.tasks :>> ', this.tasks);

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
              (task) => html` <div
                class="quest-card"
                
              >
                <div class="flex-between" @click=${() => this.completeTask(task.id)}>
                  <div
                    class="task-title"
                    style="${task.isCompleted
                      ? ' text-decoration: line-through; color: #b3b3b3;'
                      : ''}"
                  >
                    ${task.title}
                  </div>

                  <!-- <div style="display: flex">${checkmark}</div> -->
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
                    <div>${editIcon}</div>

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
        ${!!this.tasks && this.tasks && this.tasks.length !== 0 ? map(
          this.tasks.filter((task) => task.date !== 'infinite'),
          (task) => html` <div
            class="quest-card"
           
          >
            <div class="flex-between"  @click=${() => this.completeTask(task.id)}>
              <div
                class="task-title"
                style="${task.isCompleted
                  ? ' text-decoration: line-through; color: #b3b3b3;'
                  : ''}"
              >
                ${task.title}
              </div>

              <!-- <div style="display: flex">${checkmark}</div> -->
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
        ):''}
      </section>
    `;
  }
}

customElements.define('app-main', App);
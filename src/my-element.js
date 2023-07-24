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

    console.log('comp lodaded');
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
    console.log('storedTImes :>> ', storedTime);
    // If there is no stored time, set it to the next day
    console.log('storedTime.currentDate.length :>> ', storedTime.currentDate.length);
    console.log('!!storedTime :>> ', !!storedTime);
    if ( storedTime.currentDate.length === 0) {
      chrome.storage.local.set({ currentDate: this.getNextDayDate() });
    } else {
      console.log('storedTime :>> ', storedTime);
      const storedDateString = storedTime.currentDate;
      const currentDateString = new Date().toLocaleDateString('en-US');
      // Check the next day and reset the tasks
      // if ("7/26/2023" <="7/24/2023" ) {
        // console.log("ya a7a");
      if (storedDateString <= currentDateString) {
        this.tasks.forEach((task) => {
          if (task.isCompleted && task.date === 'infinite') {
            task.isCompleted = false;
          }
        });
        this.setTasks(this.tasks)
        console.log('this.tasksjjj :>> ', this.tasks);
  

        chrome.storage.local.set({ currentDate: this.getNextDayDate() });
      }
    }
  }

  async deleteAllTasks() {
    await chrome.storage.sync.set({ tasks: [] });
    this.loadTasks();
  }

  async setTasks(tasks) {
    await chrome.storage.sync.set({ tasks });
    this.loadTasks();
  }

  async completeTask(id) {
    console.log('tasks1111 :>> ', this.tasks);
    const completedTask = this.tasks.filter((task) => task.id === id);
    completedTask[0].isCompleted = !completedTask[0].isCompleted;
    let newTasks = this.tasks.filter((task) => task.id !== id);
    console.log('newTasks :>> ', newTasks);
    newTasks.push(completedTask[0]);

    this.tasks = newTasks;
    this.setTasks(this.tasks);
    // this.loadTasks();
  }

  async saveTask2() {
    const { tasks } = await chrome.storage.sync.get('tasks');
    console.log('tasks :>> ', tasks);

    if (tasks === undefined || null) {
      await chrome.storage.sync.set({
        tasks: [],
      });
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
    this.tasks = tasks;
    console.log('this.tasks :>> ', this.tasks);
  
  }

  render() {
    console.log('this.isInfinite :>> ', this.isInfinite);
    console.log('date :>> ', new Date().toLocaleDateString('en-US'));
    console.log('date :>> ', new Date().toLocaleDateString('en-US'));

    
    return html`
      <section class="main">
        <button @click=${this.deleteAllTasks}>delete all</button>
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
          <input
            type="checkbox"
            @click=${this.toggleInfinite}
            .checked=${this.isInfinite}
          />
          <button type="submit">click</button>
        </form>
        ${map(
          this.tasks,
          (task) => html` <div
            class="quest-card"
            @click=${() => this.completeTask(task.id)}
          >
            <div class="flex-between">
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

import { html, css, LitElement } from 'lit';
import { themeSwitcherState, getSystemTheme } from '../state/themeSwitcher.js';
import { ThemeMixin } from '../mixins/themeMixin.js';
import './material-components.js';
import { sharedStyles } from '../styles.js';
import { generateId } from '../utils/generateID.js';
const themeMapper = {
  dark: 'dark_mode',
  light: 'light_mode',
};



export class SettingsMenu extends ThemeMixin(LitElement) {
  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-block;
      }
      #theme-menu-wrapper {
        position: absolute;
        top: var(--theme-switcher-position-top, -160px);
        inset-inline-start: var(--theme-switcher-position-inline-start, -100px);
        z-index: 2;
      }
      .theme-mode-icon {
        font-size: 20px;
      }
      .dark a {
        color: #fff;
      }
    `,
  ];

  static get properties() {
    return {
      isOpen: { type: Boolean },
      currentTheme: { type: String },
    };
  }

  constructor() {
    super();
    this.isOpen = false;
    this.currentTheme = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.currentTheme = themeSwitcherState.theme;
  }

  // openThemeMenu() {
  //   const anchorEl = document.body.querySelector('#usage-anchor');
  //   const menuEl = document.body.querySelector('#theme-menu');
  // }

  switchMode(e, _theme, platform) {
    console.log('theme 1:>> ', _theme);
    console.log('platform 1:>> ', platform);
    themeSwitcherState.set(_theme, platform);
    this.currentTheme = _theme;
    e.stopPropagation();
  }


  async  importFromJsonFile() {
    // Create an input element to allow the user to select a file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json'; // Only accept .json files
  
    input.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (!file) {
        alert('No file selected');
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = async (e) => {
        const fileContent = e.target.result;
        try {
          // Parse the JSON content
          const tasksToImport = JSON.parse(fileContent);
  
          // Assign new IDs to the imported tasks using the generateId function
          const updatedTasksToImport = tasksToImport.map(task => ({
            ...task,
            id: generateId() // Use generateId function to assign a new ID
          }));
  
          // Get the existing tasks from Chrome storage
          const { tasks: existingTasks } = await chrome.storage.sync.get('tasks');
          const updatedTasks = existingTasks ? [...existingTasks, ...updatedTasksToImport] : updatedTasksToImport;
  
          // Save the updated tasks back to Chrome storage
          await chrome.storage.sync.set({ tasks: updatedTasks });
  
          alert('Data imported successfully');
        } catch (error) {
          alert('Failed to import data: ' + error.message);
        }
      };
  
      // Read the content of the file
      reader.readAsText(file);
    });
  
    // Trigger the file input click event programmatically
    input.click();
    this.triggerReloadTasks();
  }

  async exportToJsonFile() {
    const { tasks } = await chrome.storage.sync.get('tasks');

    if (!tasks) {
      alert('No data to export');
      return;
    }

    const fileName = 'export.json';
    const jsonStr = JSON.stringify(tasks);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    // Cleanup: revoke object URL after download
    URL.revokeObjectURL(url);
  }


  triggerReloadTasks() {
    this.dispatchEvent(new CustomEvent('reload-tasks'), {
      bubbles: true,
      composed: true,
    });
  }

  render() {
    console.log('getSystemTheme :>> ', getSystemTheme());
    console.log('this.currentTheme :>> ', this.currentTheme);
    return html`
      <div class=${this.theme}>
        <span style="position: relative">
          <md-outlined-icon-button
            id="usage-anchor"
            @click=${(e) => {
              this.isOpen = !this.isOpen;
            }}
          >
            <md-icon>settings</md-icon>
            <!-- settings -->
          </md-outlined-icon-button>
          <md-menu .open="${this.isOpen}" id="usage-menu" anchor="usage-anchor">
            <md-menu-item>
              <div slot="headline" @click=${(e)=>{this.importFromJsonFile()}}>Import Data</div>
            </md-menu-item>
            <md-menu-item>
              <div slot="headline" @click=${(e) => this.exportToJsonFile()}>
                Export Data
              </div>
            </md-menu-item>
            ${this.currentTheme === 'dark'
              ? html` <md-menu-item
                  @click=${(e) => this.switchMode(e, 'light', 'OS')}
                >
                  <div slot="headline" class="flex justify-center ">
                    <md-icon>light_mode</md-icon>
                  </div>
                </md-menu-item>`
              : html` <md-menu-item
                  @click=${(e) => this.switchMode(e, 'dark', 'OS')}
                >
                  <div slot="headline" class="flex justify-center ">
                    <md-icon>dark_mode</md-icon>
                  </div>
                </md-menu-item>`}
          </md-menu>
        </span>
      </div>
    `;
  }
}
customElements.define('settings-menu', SettingsMenu);

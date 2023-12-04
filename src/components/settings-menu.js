import { html, css, LitElement } from 'lit';
import { themeSwitcherState,getSystemTheme } from '../state/themeSwitcher.js';
import { ThemeMixin } from '../mixins/themeMixin.js';
import './material-components.js';
import { sharedStyles } from '../styles.js';
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

  // get dir() {
  //   return document.querySelector('html').getAttribute('dir');
  // }

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
              <div slot="headline">Import Data</div>
            </md-menu-item>
            <md-menu-item>
              <div slot="headline">Export Data</div>
            </md-menu-item>
            ${this.currentTheme === 'dark'
              ? html` <md-menu-item
                  @click=${(e) => this.switchMode(e, 'light', 'OS')}
                >
              
                  <div slot="headline" class="flex justify-center ">  <md-icon >light_mode</md-icon> </div>
                </md-menu-item>`
              : html` <md-menu-item
                  @click=${(e) => this.switchMode(e, 'dark', 'OS')}
                >
                <div slot="headline" class="flex justify-center ">  <md-icon >dark_mode</md-icon> </div>
                </md-menu-item>`}
          </md-menu>
          
        </span>
      </div>
    `;
  }
}
customElements.define('settings-menu', SettingsMenu);

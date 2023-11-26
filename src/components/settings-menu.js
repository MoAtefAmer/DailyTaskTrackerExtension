import { html, css, LitElement } from 'lit';
import { themeSwithcherState } from '../state/themeSwitcher.js';
import { ThemeMixin } from '../mixins/themeMixin.js';
import './material-components.js';

const themeMapper = {
  dark: 'dark_mode',
  light: 'light_mode',
};

export class SettingsMenu extends ThemeMixin(LitElement) {
  static styles = [
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
    };
  }

  constructor() {
    super();
    this.isOpen = false;
  }

  // openThemeMenu() {
  //   const anchorEl = document.body.querySelector('#usage-anchor');
  //   const menuEl = document.body.querySelector('#theme-menu');
  // }

  // switchMode(e, _theme, platform) {
  //   themeSwithcherState.set(_theme, platform);
  //   e.stopPropagation();
  // }

  // get dir() {
  //   return document.querySelector('html').getAttribute('dir');
  // }

  render() {
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
              <div slot="headline">Apple</div>
            </md-menu-item>
            <md-menu-item>
              <div slot="headline">Banana</div>
            </md-menu-item>
            <md-menu-item>
              <div slot="headline">Cucumber</div>
            </md-menu-item>
          </md-menu>
        </span>
      </div>
    `;
  }
}
customElements.define('settings-menu', SettingsMenu);

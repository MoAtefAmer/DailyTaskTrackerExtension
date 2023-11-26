import { themeSwithcherState } from '../state/themeSwitcher.js'

export const ThemeMixin = (superClass) =>
  class extends superClass {
    constructor() {
      super()
      this.theme = null
    }
    static styles = [superClass.styles ?? []]
    static get properties() {
      return {
        theme: { type: String },
        platform: { type: String },
      }
    }

    connectedCallback() {
      super.connectedCallback()
      this.theme = themeSwithcherState.theme
      this.platform = themeSwithcherState.platform
      themeSwithcherState.addEventListener(
        'updated',
        ({ detail: { theme, platform } }) => {
          console.log('Platform::', platform)
          this.theme = theme
          this.platform = platform
        }
      )
    }

    updated(changedProperties) {
      super.updated?.(changedProperties)
    }
  }

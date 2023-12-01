export const THEME_NAME = {
  dark: 'dark',
  light: 'light',
};

const PLATFORM = {
  OS: 'OS',
  BROWSER: 'BROWSER',
};

const isDarkMode = () => {
  window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const getSystemTheme = () => {
  isDarkMode() ? THEME_NAME.dark : THEME_NAME.light;
};

class ThemeSwitcher extends EventTarget {
  constructor() {
    super();
    this.theme = null;
    this.platform = PLATFORM.OS;
    this.theme = localStorage.getItem('theme');
    const _platform = localStorage.getItem('themePlatform');
    if (_platform) {
      this.platform = _platform;
    } else {
      this.platform = PLATFORM.OS;
    }
  }

  set(_theme, platform = PLATFORM.OS) {
    this.theme = _theme || getSystemTheme();
    this.platform = platform;

    localStorage.setItem('theme', this.theme);
    localStorage.setItem('themePlatform', this.platform);
    document.documentElement.setAttribute('data-theme', this.theme);
    this.dispatchEvent(
      new CustomEvent('updated', {
        detail: { theme: this.theme, platform: this.platform },
      })
    );
  }

  toggle() {
    if (this.theme === THEME_NAME.dark) {
      this.set(THEME_NAME.light);
    } else {
      this.set(THEME_NAME.dark);
    }
  }
}
const themeSwitcherState = new ThemeSwitcher();

if (window.matchMedia) {
  var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  colorSchemeQuery.addEventListener('change', () => {
    console.log('Theme updated: ', getSystemTheme());
    if (themeSwitcherState.platform === PLATFORM.OS) {
      themeSwitcherState.set(getSystemTheme(), PLATFORM.OS);
    }
  });
}

export { themeSwitcherState };

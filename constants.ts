// This file contains constants used for testing, can add and change them as needed. //SPLIT DATA

export const KNOWN_SEARCH_TERMS =  ['useState', 'components', 'hooks']


export const KEYBOARD_SHORTCUTS = {
  SEARCH: ['/', 'Control+K', 'Meta+K'],
  SELECT: 'Enter',
  CLOSE_SEARCH: 'Escape',
  NEXT_ITEM: 'ArrowDown',
  PREVIOUS_ITEM: 'ArrowUp',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
}

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
}

export const VIEWPORT_SIZES = {
  MOBILE: { width: 375, height: 667 },
  TABLET: { width: 768, height: 1024 },
  DESKTOP: { width: 1920, height: 1080 }
}
export const MAX_TIME_TO_LOAD = 3000; 
export const FIRST_ELEMENTS = ['Learn more.', 'React', 'v19.1'];
export const THEME_TOGGLE_BUTTON = 'button[aria-label*="Dark Mode"], button[aria-label*="Light Mode"], ' +
      'button[aria-label="Use Dark Mode"], button[aria-label="Use Light Mode"], ' +
      'button:has-text("Dark"), button:has-text("Light")'
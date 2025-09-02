export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum Language {
  EN = 'en',
  AR = 'ar',
}

export interface TranslationSet {
  title: string;
  subtitle: string;
  promptPlaceholder: string;
  generateButton: string;
  generatingButton: string;
  errorTitle: string;
  errorGeneral: string;
  aspectRatio: string;
  download: string;
  editImageTitle: string;
  editPromptPlaceholder: string;
  editButton: string;
  editingButton: string;
}
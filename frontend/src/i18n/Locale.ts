export interface Locale {
  locale: string; // !Must not be deleted. Used for providing the locale in the native language

  example: {
    title: string;
    byLine: string;
    dataLine: string;

    actions: {
      addNew: string;
    };
  };
}

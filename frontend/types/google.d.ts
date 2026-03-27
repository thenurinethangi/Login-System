declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
          cancel: () => void;
          storeCredential: (credential: any) => void;
        };
      };
    };
  }
}

export {};

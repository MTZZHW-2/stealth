import type { IpcRendererEvent } from 'electron';
import { contextBridge, ipcRenderer } from 'electron';

export type Channels = 'window-minimize' | 'window-maximize' | 'window-close';

const electronHandler = {
  ipcRenderer: {
    send<T>(channel: Channels, args: T) {
      ipcRenderer.send(channel, args);
    },
    on<T>(channel: Channels, callback: (args: T) => void) {
      const subscription = (_: IpcRendererEvent, args: T) => callback(args);

      ipcRenderer.on(channel, subscription);
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once<T>(channel: Channels, callback: (args: T) => void) {
      ipcRenderer.once(channel, (_, args) => callback(args));
    },
    async invoke<T, M>(channel: Channels, args?: T): Promise<M> {
      return ipcRenderer.invoke(channel, args);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

declare global {
  interface Window {
    electron: typeof electronHandler;
  }
}

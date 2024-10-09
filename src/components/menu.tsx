import React, { useState } from 'react';
import { XIcon, MaximizeIcon, MinimizeIcon, MinusIcon } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from './ui/menubar';

export default function Menu() {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarLabel className="px-0 w-6 draggable">
          <img src="./icon.png" className="h-4 w-4" />
        </MenubarLabel>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>选项</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>一键伪装</MenubarItem>
          <MenubarItem>自定义伪装</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>置顶窗口</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>退出</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>帮助</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>关于</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <div className="h-full w-full draggable" />
      <MenubarMenu>
        <MenubarLabel
          className="hover:bg-gray-500"
          onClick={() => {
            window.electron.ipcRenderer.invoke('window-minimize');
          }}
        >
          <MinusIcon className="h-4 w-4" />
        </MenubarLabel>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarLabel
          className="hover:bg-gray-500 h-full flex items-center"
          onClick={async () => {
            setIsMaximized(
              (await window.electron.ipcRenderer.invoke('window-maximize')) as boolean,
            );
          }}
        >
          {isMaximized ? (
            <MinimizeIcon className="h-3 w-3 " />
          ) : (
            <MaximizeIcon className="h-3 w-3 " />
          )}
        </MenubarLabel>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarLabel
          className="hover:bg-red-600"
          onClick={() => {
            window.electron.ipcRenderer.invoke('window-close');
          }}
        >
          <XIcon className="h-4 w-4" />
        </MenubarLabel>
      </MenubarMenu>
    </Menubar>
  );
}

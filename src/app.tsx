import React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import Menu from './components/menu';

const router = createHashRouter([
  {
    path: '/',
    element: <MainPage />,
  },
]);

const App = () => {
  return (
    <>
      <Menu />
      <div className="h-[calc(100vh-52px)] overflow-auto">
        <RouterProvider router={router} />
      </div>
      <div className="flex items-center h-6 w-full bg-gray-100 draggable px-3 text-xs">就绪</div>
    </>
  );
};

const root = createRoot(document.body);
root.render(<App />);

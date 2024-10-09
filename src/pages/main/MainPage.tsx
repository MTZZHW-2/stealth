import React from 'react';

export default function MainPage() {
  return (
    <div className="h-full grid grid-cols-3 gap-4 p-2">
      <div className="flex justify-center pt-16 bg-green-300 ">
        <img src="./accept.png" className="h-16 w-16" />
      </div>
      <div className="flex justify-center pt-16 bg-yellow-400">
        <img src="./cancel.png" className="h-16 w-16" />
      </div>
      <div className="flex justify-center pt-16 bg-pink-400">
        <img src="./drag.png" className="h-16 w-16" />
      </div>
    </div>
  );
}

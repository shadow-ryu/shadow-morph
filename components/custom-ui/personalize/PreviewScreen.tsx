// components/PreviewScreen.js

import React from 'react';

const PreviewScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="max-w-screen-md p-8 bg-white rounded-lg shadow-lg">
        {/* Laptop Preview */}
        {/* <div className="hidden lg:flex items-center justify-center h-64 bg-gray-100 rounded-lg mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Laptop Preview</h2>
            <p className="text-gray-700">Your laptop content goes here</p>

          </div>
        </div> */}

        {/* Mobile Preview */}

        <div className="lg:hidden flex items-center justify-center h-64 bg-gray-100 rounded-lg mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Mobile Preview</h2>
            <p className="text-gray-700">Your mobile content goes here</p>
           
          </div>
        </div>

        {/* Your content goes here */}
        <h1 className="text-3xl font-bold mb-4">Your App Name</h1>
        <p className="text-gray-700 mb-8">
          This is a preview screen for your awesome Next.js application.
        </p>

        {/* Add more components or sections as needed */}
      </div>
    </div>
  );
};

export default PreviewScreen;

// App.jsx
import React, { useState } from 'react';
import { router } from './routes';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./assets/css/reset.css"
import "./assets/css/font.css"
import "./assets/css/styles.css"

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import './SussessToast.scss'
import React, { useEffect } from 'react';
const SuccessToast = ({ message, show, duration = 3000, onClose }) => {
    useEffect(() => {
      if (show) {
        const timer = setTimeout(() => {
          onClose();
        }, duration);
  
        return () => clearTimeout(timer);
      }
    }, [show, duration, onClose]);
  
    if (!show) {
      return null;
    }
  
    return (
      <div className="success-toast">
        <div className="success-toast__message">
          {message}
        </div>
      </div>
    );
  };
  
  export default SuccessToast;
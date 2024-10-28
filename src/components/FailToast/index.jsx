import React, { useEffect } from 'react';
import './failToast.scss'
const FailToast = ({ message, show, duration = 3000, onClose }) => {
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
      <div className="fail-toast">
        <div className="fail-toast__message">
          {message}
        </div>
      </div>
    );
  };
  
  export default FailToast;
import { useEffect, useState } from "react";

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const { message, type = "info", timeout = 3500 } = e.detail || {};
      const id = Date.now() + Math.random();
      setToasts((s) => [...s, { id, message, type }]);
      setTimeout(() => {
        setToasts((s) => s.filter((t) => t.id !== id));
      }, timeout);
    };

    window.addEventListener("cf-toast", handler);
    return () => window.removeEventListener("cf-toast", handler);
  }, []);

  return (
    <div className="cf-toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`cf-toast cf-toast-${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;

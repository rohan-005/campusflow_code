// Simple helper to show toast messages across the app
export function showToast(message, type = "info", timeout = 3500) {
  try {
    const ev = new CustomEvent("cf-toast", {
      detail: { message, type, timeout },
    });
    window.dispatchEvent(ev);
  } catch (err) {
    // fallback to alert if custom events are not supported
    // eslint-disable-next-line no-alert
    alert(message);
  }
}

export default showToast;

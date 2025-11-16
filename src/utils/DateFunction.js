export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("en-US", options);
  }
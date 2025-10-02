const errorMap = {
  "already exists": "Your ticket is in progress",
  "Conversation with orderId": "Your ticket is in progress",
  "not found": "Ticket not found. Please try again",
  "unauthorized": "Session expired. Please refresh",
};

export const parseErrorMessage = (error) => {
  for (const key in errorMap) {
    if (error.detail.includes(key)) {
      if (key === "already exists" || key === "Conversation with orderId") {
        return { type: 'info', message: errorMap[key] };
      }
      return { type: 'error', message: errorMap[key] };
    }
  }
  return { type: 'error', message: "Something went wrong. Please try again" };
};
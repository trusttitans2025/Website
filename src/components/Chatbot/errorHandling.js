const errorMap = {
  "already exists": "Your ticket is in progress",
  "Conversation with orderId": "Your ticket is in progress",
  "not found": "Ticket not found. Please try again",
  "unauthorized": "Session expired. Please refresh",
};

export const parseErrorMessage = (error) => {
  for (const key in errorMap) {
    if (error.detail.includes(key)) {
      return errorMap[key];
    }
  }
  return "Something went wrong. Please try again";
};

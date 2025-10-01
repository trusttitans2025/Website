class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    } else if (lowerCaseMessage.includes("orders") || lowerCaseMessage.includes("my orders") || lowerCaseMessage.includes("order list")) {
      this.actionProvider.handleUserOrders();
    }
  }
}

export default MessageParser;

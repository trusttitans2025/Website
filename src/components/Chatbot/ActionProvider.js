class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage, stateRef, createCustomMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.");
    this.updateChatbotState(greetingMessage);
  }

  async handleUserOrders() {
    const { user } = this.stateRef.current;

    if (user) {
      try {
        const response = await fetch('https://web-chat-service-631872245250.us-central1.run.app/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        const userOrders = data.filter(order => order.userId === user.email);

        if (userOrders.length > 0) {
          const orderIds = userOrders.map(order => order.orderId).join(', ');
          const message = this.createChatBotMessage(`Here are your order IDs: ${orderIds}`);
          this.updateChatbotState(message);
        } else {
          const message = this.createChatBotMessage("You have no orders.");
          this.updateChatbotState(message);
        }
      } catch (error) {

        const message = this.createChatbotMessage("Sorry, I couldn't fetch your orders right now.");
        this.updateChatbotState(message,error);
      }
    } else {
      const message = this.createChatBotMessage("You need to be logged in to see your orders.");
      this.updateChatbotState(message);
    }
  }

  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
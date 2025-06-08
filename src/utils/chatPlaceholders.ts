
type ChatState = 'initial' | 'asking' | 'evaluating' | 'wallet' | 'payment' | 'complete';

export const getChatPlaceholder = (chatState: ChatState): string => {
  switch (chatState) {
    case 'initial':
      return "Describe your startup idea...";
    case 'asking':
      return "Answer the question above...";
    case 'wallet':
      return "Please enter your wallet address above";
    default:
      return "Chat completed!";
  }
};

export const shouldDisableChatInput = (chatState: ChatState, isLoading: boolean): boolean => {
  return isLoading || chatState === 'wallet' || chatState === 'payment';
};

export interface UserResponse {
  userId: string;
  userName: string;
  userPfp: string; // Profile picture URL
  isActive: boolean;
}

export interface ConversationMessageResponse {
  messageId: string;
  conversationId: string;
  authorId: string;
  text: string;
  creationDate: string; // ISO string desde Instant de Java
  isRead: boolean;
}

export interface ConversationResponse {
  conversationId: string;
  creationDate: string; // ISO string desde Instant de Java
  usersIds: string[];
  messageResponses: ConversationMessageResponse[];
  orderId: string;
}

export interface CreateConversationRequest {
  usersIds: string[];
  orderId: string;
}

export interface DeleteConversationRequest {
  userId: string;
  conversationId: string;
}

export interface AddContactRequest {
  userId: string;
  contactId: string;
}

export interface ConversationMessageRequest {
  authorId?: string; // Se establece en el backend desde el header
  conversationId: string;
  text: string;
}

export interface TypingRequest {
  conversationId: string;
  userId?: string; // Se establece en el backend
  isTyping: boolean;
}

export interface ReadRequest {
  conversationId: string;
  messageId: string;
  userId?: string; // Se establece en el backend
}
import Message from "./Message";

interface Conversation {
    users: string[]; // User IDs or usernames of users involved in the conversation
    messages: Message[]; // Array of messages exchanged between users
    // ... other properties like conversation ID, last seen message, etc.
}

export default Conversation;
interface Message {
    sender: string; // User ID or username of the sender
    receiver: string; // User ID or username of the receiver
    content: string;
    timestamp: Date;
}

export default Message;
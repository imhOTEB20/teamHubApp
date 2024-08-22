import ChatHeader from "../components/ChatHeader";
import ChatMain from "../components/ChatMain";
import '../styles/Chat.css';

const ChatPage = () => {
    return (
        <div className="chat-mensaje">
            <ChatHeader/>
            <ChatMain/>
        </div>
    );
}

export default ChatPage;

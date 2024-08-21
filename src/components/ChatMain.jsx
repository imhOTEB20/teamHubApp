import '../styles/Chat.css';
import ChatEscribirMensaje from "./ChatEscribirMensaje";
import ChatMensaje from "./ChatMensaje";
import ChatTitulo from "./ChatTitulo";

const ChatMain = () => {
    return (
        <main>
            <ChatTitulo></ChatTitulo>
        <section className="chat">
            <ChatMensaje idMensaje={1}/>
            <ChatMensaje idMensaje={2}/>
            <ChatMensaje idMensaje={3}/>
            <ChatMensaje idMensaje={4}/>
            <ChatMensaje idMensaje={5}/>
            <ChatMensaje idMensaje={6}/>
            <ChatMensaje idMensaje={8}/>
            <ChatMensaje idMensaje={9}/>
        </section>
        <ChatEscribirMensaje/>
    </main>
    );
}

export default ChatMain;


import styles from './App.module.css'
import Chats from './components/ChatList/ChatList.tsx'
import Chat from './components/Chat/Chat.tsx'
import { ChatProvider } from './ChatContext.tsx';

function App() {

  return (
    <ChatProvider>
      <div className={styles.app}>
        <Chats />
        <Chat />
      </div>
    </ChatProvider>
  )
}

export default App

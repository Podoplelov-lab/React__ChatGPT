import { useState } from 'react';
import styles from './App.module.css'
import AuthModal from './Components/AuthModal/AuthModal.tsx'
import Chats from './Components/ChatList/ChatList.tsx'
import Main from './Components/Main/Main.tsx'
import { ChatProvider } from './ChatContext.tsx';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ChatProvider>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className={styles.app}>
        <Chats />
        <Main />
      </div>
    </ChatProvider>
  )
}

export default App

// Доделать delete и post в СhatList 
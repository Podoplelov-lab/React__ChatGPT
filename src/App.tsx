import { useState } from 'react';
import styles from './App.module.css'
import AuthModal from './Components/AuthModal/AuthModal.tsx'
import Chats from './Components/ChatList/ChatList.tsx'
import Main from './Components/Main/Main.tsx'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
          <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    <div className={styles.app}>
      <Chats/>
      <Main/>
      </div>
    </>
  )
}

export default App

// Доделать delete и post в СhatList 
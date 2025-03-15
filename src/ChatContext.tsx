import { createContext, ReactNode, useContext, useState } from 'react';

const initialContext: {
    activeChat : string | null,
    setActiveChat: null | ((value: string | null) => void)
} = {
    activeChat : null,
    setActiveChat: null
}
const ChatContext = createContext(initialContext);

export const useChatContext = () => useContext(ChatContext)

export const ChatProvider = ({children}: {children: ReactNode}) => {

    const [activeChat, setActiveChat] = useState<string | null>(null)

    return (
        <ChatContext.Provider value={{activeChat, setActiveChat}}>
          {children}
        </ChatContext.Provider>
      )
}
import axios, { AxiosResponse } from "axios"
import { TChat, TModal } from "../types"
import { TOKEN } from "../const"


const getChats = () : Promise<AxiosResponse<{data: TChat[]}>> => {
    return axios.get("https://bothubq.com/api/v2/chat/list", {headers: {authorization: `Token ${TOKEN}`}})
}

const getModuleList = () : Promise<AxiosResponse<TModal[]>> => {
    return axios.get("https://bothubq.com/api/v2/model/list", {headers: {authorization: `Token ${TOKEN}`}})
}


const getMessages = async (chatId: string) => {
    try {
        const response = await axios.get(
            `https://bothubq.com/api/v2/chat/${chatId}/messages`,
            {
                headers: {
                    Authorization: `Token ${TOKEN}`
                }
            }
        );

        console.log("Сообщения чата:", response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сообщений:", error.response?.data || error.message);
        return [];
    }
};

const deleteChat = (id: string) => {
    return axios.delete(`https://bothubq.com/api/v2/chat/${id}`, {headers: {authorization: `Token ${TOKEN}`}})
}


const postChat = (name: string) => {
    return axios.post(
        "https://bothubq.com/api/v2/chat",
        { name },
        {
            headers: {
                Authorization: `Token ${TOKEN}`,
                "Content-Type": "application/json"
            }
        }
    );
};

  const sendMessage = async (chatId: string, message: string) => {
    const requestBody = {
      chatId,
      message,
      tgBotMessageId: "",
      platform: "MAIN", 
    };
  
    try {
      const response = await axios.post('https://your-api-url.com/message/send', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке сообщения", error);
    }
  };
  

export {getChats, getModuleList, getMessages, deleteChat, postChat, sendMessage}

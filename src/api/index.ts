import axios, { AxiosResponse } from "axios"
import { TChat, TModal } from "../types"
import { TOKEN } from "../const"

const $api = axios.create({
    baseURL: "https://bothubq.com/api/v2/",
  })


  $api.interceptors.request.use((config) => {
    if (config.headers)
      config.headers.Authorization = `Token ${TOKEN}`
  
    return config
  })


const getChats = () : Promise<AxiosResponse<{data: TChat[]}>> => {
    return $api({url: "chat/list", method: "GET"})
}

const getModuleList = () : Promise<AxiosResponse<TModal[]>> => {
    return $api({url: "model/list", method: "GET"})
}


const getMessages = async (chatId: string) => {
    try {
        const response = await  $api({url: `chat/${chatId}/messages`, method: "GET"})
        // console.log("Сообщения чата:", response.data);
        return response.data;
    } catch {
        console.error("Ошибка при получении сообщений");
    }
};

const deleteChat = (id: string) => {
    return $api({url: `chat/${id}`, method: "DELETE"})
}


const postChat = (name: string) => {
    return $api({url: `chat`, method: "POST", data: {name}})
};

const sendMessage = async (chatId: string, message: string) => {
  try {
    const response = await $api({url: `message/send`, method: "POST", data: {message, chatId}});
    // console.log("Ответ от сервера:", response.data);
    return response.data;
  } catch {
    console.error("Ошибка при отправке сообщения");
  }
};
  

export {getChats, getModuleList, getMessages, deleteChat, postChat, sendMessage}

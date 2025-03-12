
type TChat = {
    "id": string,
    "name": string,
    "group_id": string | null,
    "model_id": string,
    "model_function_id": string | null,
    "created_at": string,
    "user_id": string,
    "highlight": string | null,
    "initial": boolean,
    "platform": string,
    "total_caps": number,
    "order": number,
    "deleted": boolean
}

type TModal = {
"created_at" : string
"description" : string | null
"disabled" : boolean
"icon" :  string | null
"id" : string
"label" : string 
"message_color" : string
"order" : number
"owned_by" : string
"parent_id": string | null
}

export type {TChat, TModal}
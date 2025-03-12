import { useEffect, useState } from "react"
import style from "./ModelList.module.css"
import { getModuleList } from "../../api"
import { TModal } from "../../types"


const ModalList = ({onChange}) => {

    const [models, setModels] = useState<TModal[]>([])

    useEffect(() => {
        getModuleList().then(({data}) => {
            setModels(data)
            console.log(data)
        }).catch((error) => {
             console.log(error)
        })
     },[])

    return(
        <select className={style.select} onChange={onChange}>
        <option value="ChatGPT">ChatGPT</option>
        <option value="DALL-E">DALL-E</option>
        <option value="Midjourney">Midjourney</option>
        </select>
    )
}

export default ModalList
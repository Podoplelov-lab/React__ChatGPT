import { useEffect, useState } from "react";
import style from "./ModelList.module.css";
import { getModuleList } from "../../api";
import { TModal } from "../../types";

const ModelList = () => {
  const [models, setModels] = useState<TModal[]>([]);
  const [selectedModel, setSelectedModel] = useState("ChatGPT");

  useEffect(() => {
    getModuleList()
      .then(({ data }) => {
        setModels(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedModel(value); 
  };

  return (
    <select
      className={`${style.select} ${style[selectedModel]}`}
      value={selectedModel}
      onChange={handleChange}
    >
      {models.map((model) => {
        return (
          <option key={model.id} className={style.ChatGPT} value={model.id}>
            {model.label}
          </option>
        )
      })}
    </select>
  );
};

export default ModelList;
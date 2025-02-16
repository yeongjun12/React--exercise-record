import { useContext, useState, useEffect} from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    const data = useContext(DiaryStateContext); //일기 데이터를 불러옴
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();
    
    useEffect(() => {
        
        const currentDiaryItem = data.find(
            (item)=>String(item.id) === String(id)
        );

        console.log(currentDiaryItem);

        if(!currentDiaryItem) {
            window.alert("존재하지 않는 일기입니다.");
            nav("/", {replace : true});
        }
        setCurDiaryItem(currentDiaryItem);
    }, [id]);
    
    return curDiaryItem;
};

export default useDiary;
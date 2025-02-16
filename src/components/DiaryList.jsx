import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {

    const nav = useNavigate();

    const [sortType, setSortType] = useState("latest");


    const onChangeSortType = (e) => { //최신순, 오래된 순 변경되면 변수값 변환
        setSortType(e.target.value);
    };

    const getSortedDate = () => {
        return data.toSorted((a,b) => {
            if(sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate); //오름차순
            }else{
                return Number(b.createdDate) - Number(a.createdDate); //내림차순
            }
        });
    }

    const sortedDate = getSortedDate(); //리렌더링 될때마다 정렬
    
    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>

                <Button 
                    onClick={() => nav("/new")}
                    text={"운동 추가"} 
                    type={"POSITIVE"}
                />
            </div>
            <div className="list-wrapper">
                {sortedDate.map((item) => (

                    <DiaryItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};


export default DiaryList;

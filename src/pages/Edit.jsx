import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    const curDiaryItem = useDiary(params.id); //커스텀훅
    usePageTitle(`${params.id}번 운동 기록 수정`);


    const onClickDelete = () => {
        if (window.confirm("운동기록 정말 삭제할까요?")) {
            //일기 삭제 로직
            onDelete(params.id); //url파라미터를 불러옴
            nav("/", {replace: true});
        }
    };

    const onSubmit = (input) => {
        if(window.confirm("정말 수정할까요?")){
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.selectedExercises ,input.content);
            nav("/",{replace :true });
        }
    };

    return (
        <div>
            <Header 
                title={"운동 수정하기"}
                leftChild={ <Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
                rightChild={<Button onClick={onClickDelete} text={"삭제하기"}  type={"NEGATIVE"}/>}
            />
            <Editor initData={curDiaryItem} onSubmit={onSubmit} />
        </div>
    );
};

export default Edit;
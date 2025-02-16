import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
    const {onCreate} = useContext(DiaryDispatchContext);
    const nav = useNavigate();
    usePageTitle("새 운동 기록");
    

    const onSubmit = (input) => { //작성완료 누르면 input이 들어옴

         // 1. selectedExercises 안의 sets 배열을 확인하여 비어 있는 값이 있는지 체크
        const hasEmptyFields = input.selectedExercises.some(exercise => 
            exercise.sets.some(set => set.weight === 0 || set.reps === 0) 
        );

        if (hasEmptyFields) {
            alert("모든 세트의 무게와 횟수를 입력하세요!"); // 경고창 띄우기
            return; // 제출 중단
        }

        onCreate(
            input.createdDate.getTime(),
             input.emotionId,
             input.selectedExercises,
              input.content
            );
        nav('/',{replace: true}) ; //replace: true -> 뒤로가기 방지
    };

    return (
        <div>
            <Header 
            title={"새 운동 기록"}
            leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"}/>} // nav에 -1을 전달하면 뒤로가기
            />

            <Editor onSubmit={onSubmit}/>
        </div>
    );
};

export default New;
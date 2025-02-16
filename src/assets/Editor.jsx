import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import ExerciseDetailItem from "./ExerciseDetailItem";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList  } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";



const exerciseDetails = {
    1: [
        { name: "덤벨 인클라인 벤치 프레스", img: "/img/chest/DumbbellInclineBenchPress.png" },
        { name: "덤벨 플라이", img: "/img/chest/DumbbellFly.png" },
        { name: "머신 디클라인 벤치 프레스", img: "/img/chest/MachineDeclineBenchPress.png" },
        { name: "머신 인클라인 벤치 프레스", img: "/img/chest/MachineInclineBenchPress.png" },
        { name: "머신 체스트 프레스", img: "/img/chest/MachineChestPress.png" },
        { name: "바벨 디클라인 벤치 프레스", img: "/img/chest/BarbellDeclineBenchPress.png" },
        { name: "바벨 인클라인 벤치 프레스", img: "/img/chest/BarbellInclineBenchPress.png" },
        { name: "바벨 플랫 벤치 프레스", img: "/img/chest/BarbellFlatBenchPress.png" },
        { name: "바벨 플랫 벤치 프레스", img: "/img/chest/BarbellFlatBenchPress.png" },
        { name: "스미스 머신 벤치 프레스", img: "/img/chest/SmithMachineBenchPress.png" },
        { name: "케이블 체스트 프레스", img: "/img/chest/CableChestPress.png" },
    ],
    2: [
        { name: "Squats", img: "/images/squats.png" },
        { name: "Leg Press", img: "/images/leg_press.png" },
        { name: "Lunges", img: "/images/lunges.png" }
    ],
    3: [
        { name: "Deadlifts", img: "/images/deadlifts.png" },
        { name: "Pull-ups", img: "/images/pullups.png" },
        { name: "Barbell Row", img: "/images/barbell_row.png" }
    ],
  
};

const Editor = ({ initData, onSubmit }) => {
    // initData는 일기를 새로 작성할 때는 undefined이지만, 기존 일기를 수정할 때는 해당 일기의 데이터를 포함합니다.
    const [input, setInput] = useState({
        createdDate : new Date(),
        emotionId : 3,
        content : "1",
    }); //사용자가 입력한 데이터 저장
    
    const [selectedExercise, setSelectedExercise] = useState(null); 
    const nav = useNavigate();


    useEffect(() => { //새로운 일기 작성시에는 initData가 없기 때문에 실행 안됨
        if (initData) {
          setInput({
            ...initData,
            createdDate: new Date(Number(initData.createdDate)),
          });
        }
      }, [initData]);

    const onChangeInput = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);


        let name = e.target.name;
        let value = e.target.value;

        if(name === "createdDate") { //문자열 형태로 오기때문에 Date객체로 바꿔줘야함
            value = new Date(value);
        }

        setInput({
            ...input,
            [name] : value,
        });
    };

    const onClickSubmitButton = () => {
        onSubmit(input);
    };

    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input 
                name="createdDate"
                onChange={onChangeInput}
                value={getStringedDate(input.createdDate)} type="date" /> </section> 
            <section className="emotion_section">
                <h4>오늘의 운동</h4>
                <div className="emotion_list_wrapper">
                    {emotionList.map((item) => 
                    <EmotionItem
                        onClick={() => onChangeInput({ //컴포넌트들이 클릭했을때 이벤트를 직접 발생시켜줘야함
                            target: { //prop으로 전달해서 받아줘야 실행됨
                                name: "emotionId",
                                value: item.emotionId,
                            },
                        })
                    }
                    key={item.emotionId} {...item} 
                    isSelected={item.emotionId === input.emotionId} //현재 선택된 감정이 emotionID와 같다면 true를 넘김
                    /> )}

                    
                </div>
            </section> 
            <section className="detail_exercise">
            <h4>추천 운동 리스트</h4>
                <ul>
                    {exerciseDetails[input.emotionId]?.map((exercise, index) => (
                        <ExerciseDetailItem
                        key={index}
                        exercise={exercise}
                        onSelect={setSelectedExercise}
                      />
                    ))}
                </ul>   

            
            </section>




            <section className="content_section">
               <h4>운동 기록</h4>     
               <textarea 
               name="content"
               value={input.content}
               onChange={onChangeInput}
               placeholder="오늘은 어땠나요?" />
            </section> 
            <section className="button_section">
                <Button onClick={() => nav(-1)} text={"취소하기"}/> 
                
                <Button onClick={onClickSubmitButton} text={"작성완료"} type={"POSITIVE"}  /> 
            </section> 
        </div>//Oncreate를 직접 호출하지말고 클릭이 되었을때 실행되어야 하는 함수를 부모 컴포넌트로부터 전달받도록
    );
};

export default Editor;
import  "./SetRecord.css";

import Button from "./Button";
import { useState, useEffect } from "react";

const SetRecord = ({ type, name, img, onDelete, onUpdateExercise, set}) => {
    const [sets, setSets] = useState([
        { id: 1, weight: 0, reps: 0 },
        { id: 2, weight: 0, reps: 0 },
        { id: 3, weight: 0, reps: 0 },
        { id: 4, weight: 0, reps: 0 },
        { id: 5, weight: 0, reps: 0 },
    ]);

    useEffect(() => {

        if (set) {
            setSets(set);
        }
    }, [set]);



    //  새로운 세트 추가
    const addSet = () => {
        const updateSets = [...sets, { id: setSets.length + 1, weight: 0, reps: 0 } ]  
        setSets(updateSets);
        updateParent(updateSets);
    };

    //  마지막 세트 삭제
    const removeSet = () => {
        if (sets.length > 1) {
            const updatedSets = sets.slice(0, -1);
            setSets(updatedSets);
            updateParent(updatedSets);
        }
    };

    //  입력값 변경 핸들러 (무게 & 횟수)
    const handleInputChange = (id, field, value) => {
        const updatedSets = sets.map(set =>
            set.id === id ? { ...set, [field]: value } : set
        );
        setSets(updatedSets);
        updateParent(updatedSets);
    };

    //  부모(Editor)로 업데이트된 데이터 전달
    const updateParent = (updatedSets) => {
        onUpdateExercise({
            type,
            name,
            img,
            sets: updatedSets,  //  세트 정보까지 전달
            volume : totalVolume
        });
    };

    //  총 볼륨 계산 (모든 세트의 (weight * reps) 합산)
    const totalVolume = sets.reduce((total, set) => total + (set.weight * set.reps), 0);

    return (


        <div className="setRecord_mainContainer">
            <div className="setRecord_imgDiv">
                <img src={img} alt="운동 이미지" />
            </div>

            <div className="setRecord_workout-container">
                
                

                <div className="setRecord_setDiv" >
                    
                   

                    <div className="setRecord_title">
                         {/* 삭제 버튼 클릭시 운동이름 전달해서 삭제 */}
                        <div className="setRecord_DeleteButton" onClick={() => onDelete(name)}>
                            <span>X</span> 
                        </div>
                        <h1>{type} | {name}</h1>
                    </div>

                    <div>총 볼륨: {totalVolume}kg</div> {/*  총 볼륨 표시 */}
                
                    <div className="setRecord_setHeader">
                        <h1>세트</h1>
                        <h1>kg</h1>
                        <h1>회</h1>
                    </div>
                    
                    {sets.map((set, index) => (
                        <div key={index} className="setRecord_input-container">

                                <span>{set.id}</span>
                                <input 
                                    type="number" 
                                    placeholder="kg"
                                    value={set.weight === 0 ? "" : set.weight}  // weight가 0이면 빈 문자열 ("")로 설정
                                    onChange={(e) => handleInputChange(set.id, "weight", Number(e.target.value))}
                                />
                                <input 
                                    type="number" 
                                    placeholder="reps"
                                    value={set.reps === 0 ? "" : set.reps} 
                                    onChange={(e) => handleInputChange(set.id, "reps", Number(e.target.value))}
                                />
                            </div>

                    ))}

                </div>
                

                <div className="setRecord_setButton">
                    <div className="removeSet" onClick={removeSet}>
                        — 세트삭제
                    </div>
                    <div className="setRecord_addSet" onClick={addSet}>
                        + 세트추가
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SetRecord;

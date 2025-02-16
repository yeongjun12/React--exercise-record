import PropTypes from 'prop-types';

import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import "./DiaryItem.css";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({id, emotionId, createdDate, content ,selectedExercises}) => {
    
    const nav = useNavigate();



    return (
        <div className="DiaryItem">
            
            <div onClick={()=>nav(`/diary/${id}`)} className="info_section">
                <div className="created_date">
                    {new Date(createdDate).toLocaleDateString()}
                </div>
                <div>
                    <ul>
                    {selectedExercises?.map((exercise, index) => (
                        <div className="itemList" key={index}>

                        <img src={exercise.img} alt={exercise.name} width="100px" />
                        <li className="exerciseName" >
                            
                            <h4>{exercise.name}</h4>
                            <ul>
                                {exercise.sets.map(set => (
                                    <li key={set.id}>
                                        {set.id}세트: {set.weight}kg x {set.reps}회
                                    </li>
                                ))}
                            </ul>
                        </li>
                        </div>
                    ))}
                    </ul>
                </div>
            </div>
            <div className="button_section">
                <Button 
                onClick={() => nav(`/edit/${id}`)}
                text={"수정하기"}/>
            </div>
        </div>
    );
};

DiaryItem.propTypes = {
    id: PropTypes.number.isRequired,
    emotionId: PropTypes.number.isRequired,
    createdDate: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    selectedExercises: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired, // Ensure each exercise has a name
            type: PropTypes.string,
            volume: PropTypes.number,
            sets: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    weight: PropTypes.number.isRequired,
                    reps: PropTypes.number.isRequired
                })
            )
        })
    )
};


export default DiaryItem;
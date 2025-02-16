import "./Viewer.css";
import PropTypes from 'prop-types';
import { emotionList } from "../util/constants";

const Viewer = ({ emotionId, selectedExercises, content }) => {
    
    

    return (
        <div className="Viewer">
            {(selectedExercises).map((exercise, index) => (
                <section key={index}>
                    <div className="viewer_setRecord_section">
                        <div className="viewer_setDetail_section">
                            <div className="viewer_title">
                                <h1>{exercise.type} | {exercise.name}</h1>
                                <h1>총 볼륨 : {exercise.volume} kg</h1>
                            </div>
                            <div className="viewer_setHead">
                                <h1>세트</h1>
                                <h1>kg</h1>
                                <h1>회</h1>
                            </div>
                            {exercise.sets.map((set, setIndex) => (
                                <div className="viewer_input-container" key={setIndex}>
                                    <span>{setIndex + 1}</span>
                                    <input  readOnly value={set.weight} />
                                    <input  readOnly value={set.reps} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
            <section className="viewer_content_section">
                <h4>메모</h4>
                <div className="viewer_content_wrapper">
                    <p>{content}</p>
                </div>
            </section>
        </div>
    );
};

Viewer.propTypes = {
    emotionId: PropTypes.string.isRequired,
    selectedExercises: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            volume: PropTypes.number.isRequired,
            sets: PropTypes.arrayOf(
                PropTypes.shape({
                    kg: PropTypes.number.isRequired,
                    reps: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    content: PropTypes.string,
};


export default Viewer;

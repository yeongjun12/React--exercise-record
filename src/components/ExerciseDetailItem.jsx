import "./ExerciseDetailItem.css";

const ExerciseDetailItem = ({ exercise, onSelect, isSelected }) => {
    return (
        <div 
        // className="ExerciseDetailItem"
        className={`ExerciseDetailItem ${isSelected ? "selected" : ""}`} 
        onClick={() => onSelect(exercise)}
        >
          <p>{exercise.name}</p>
          <img src={exercise.img} alt={exercise.name} width="150px" />
        </div>
      ); 
}




export default ExerciseDetailItem;

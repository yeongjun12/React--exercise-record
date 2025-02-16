import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
    const params = useParams();
    const nav = useNavigate();
    usePageTitle(`${params.id}번 운동 기록`);

    const curDiaryItem = useDiary(params.id); //현재 id에 일기데이터만 커스텀 훅으로 불러옴
    
    console.log(curDiaryItem);

    if(!curDiaryItem) {
        return <div>데이터 로딩중...</div>
    }

    const {createdDate, emotionId, selectedExercises ,content} = curDiaryItem;
    const title = getStringedDate(new Date(createdDate));

    return (
        <div>
            <Header 
                title={`${title} 기록`} 
                leftChild={<Button onClick={ () => nav(-1) } text={"< 뒤로 가기"}/>}
                rightChild={
                    <Button 
                    onClick={() => nav(`/edit/${params.id}`)}
                    text={"수정하기"} />}
            />
    
            <Viewer 
                emotionId={emotionId} 
                selectedExercises={selectedExercises} 
                content={content} 
            />
        </div>
    );
}

export default Diary;
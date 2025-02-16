import { useState, useContext } from "react"; 
import { DiaryStateContext } from "../App";  

// 컴포넌트 import
import Header from "../components/Header";   // 헤더 컴포넌트 (현재 년/월 표시 및 버튼 포함)
import Button from "../components/Button";   // 월 이동 버튼 컴포넌트
import DiaryList from "../components/DiaryList";  // 일기 목록 렌더링 컴포넌트
import usePageTitle from "../hooks/usePageTitle";

// 선택된 달(pivotDate)에 맞는 일기 데이터를 필터링하는 함수
const getMonthlyData = (pivotDate, data) => {
    // 해당 월의 시작 시간 (1일 00:00:00)
    const beginTime = new Date(
        pivotDate.getFullYear(),   // 현재 기준 년도
        pivotDate.getMonth(),      // 현재 기준 월 (0부터 시작)
        1,                         // 1일
        0, 0, 0                    // 자정(00:00:00)
    ).getTime();

    // 해당 월의 마지막 시간 (말일 23:59:59)
    const endTime = new Date(
        pivotDate.getFullYear(),   
        pivotDate.getMonth() + 1,  // 다음 달 (0일로 설정하면 전 달의 마지막 날이 됨)
        0,                         // 0일 = 전 달의 마지막 날
        23, 59, 59                 // 23:59:59 (하루의 끝)
    ).getTime();

    // 일기 데이터 중 해당 월에 작성된 일기만 필터링
    return data.filter(
        (item) => beginTime <= item.createdDate && item.createdDate <= endTime
    );
};

// Home 컴포넌트: 메인 페이지
const Home = () => {
    // DiaryStateContext에서 전체 일기 데이터를 가져옴
    const data = useContext(DiaryStateContext);  

    // 현재 기준 날짜(pivotDate)를 상태로 관리 (초기값: 오늘 날짜)
    const [pivotDate, setPivotDate] = useState(new Date());
    usePageTitle("운동 기록");

    // 현재 달에 해당하는 일기 데이터를 필터링
    const monthlyData = getMonthlyData(pivotDate, data);


    // 다음 달로 이동하는 함수
    const onIncreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)  // 월을 +1
        );
    };

    // 이전 달로 이동하는 함수
    const onDecreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)  // 월을 -1
        );
    };

    return (
        <div>
            {/* 헤더 컴포넌트: 현재 년/월과 이전/다음 달 이동 버튼 표시 */}
            <Header 
                title={ `운동기록 ${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}  // 현재 년/월 표시
                leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}          // 이전 달 버튼
                rightChild={<Button onClick={onIncreaseMonth} text={">"} />}         // 다음 달 버튼
            />

            {/* DiaryList 컴포넌트에 필터링된 월별 일기 데이터를 전달 */}
            <DiaryList data={monthlyData} />
        </div>
    );
};

// Home 컴포넌트 export
export default Home;

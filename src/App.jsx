import './App.css'

import { useReducer, useRef, createContext, useEffect, useState } from 'react';

import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home";       // 홈 페이지
import Diary from "./pages/Diary";     // 일기 상세 페이지
import New from "./pages/New";         // 새 일기 작성 페이지
import Notfound from "./pages/Notfound"; // 404 페이지 (없는 경로 처리)
import Edit from "./pages/Edit";       // 일기 수정 페이지


// 상태 관리 reducer 함수
function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
        return action.data;

    case "CREATE":{
      nextState= [action.data, ...state];  // 새 데이터를 기존 상태 앞에 추가
      break;
    }  // 새 일기 생성
    case "UPDATE":  // 기존 일기 수정
      {
        nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    break;
  }  // ID가 일치하는 항목만 수정
    case "DELETE":  // 일기 삭제
      {
        nextState= state.filter(
          (item) => String(item.id) !== String(action.id)
        );
        break;
      }  // 삭제할 ID 제외
    default:  // 기본 상태 반환
      return state;
  }

    localStorage.setItem("exercise", JSON.stringify(nextState));
  return nextState;
}

// Context 생성: 일기 데이터와 일기 조작 함수 공유
export const DiaryStateContext = createContext();      // 일기 데이터 상태 공유용 Context
export const DiaryDispatchContext = createContext();   // 일기 조작 함수 공유용 Context

function App() {
  const [isLoading,setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);

  // 새로운 일기의 ID 관리 (현재 ID는 3부터 시작)
  const idRef = useRef(0);

  useEffect(()=> {
    const storedData = localStorage.getItem("exercise");

    if(!storedData){
      setIsLoading(false);
      return ;
    }
    const parsedData = JSON.parse(storedData);

    if(!Array.isArray(parsedData)){ //배열이 아니면 오류 발생하기 때문에 예외처리
      setIsLoading(false);
      return ;
    }

    let maxId = 0;
    parsedData.forEach((item)=>{
      if(Number(item.id) > maxId){
        maxId = Number(item.id);
      }
    })

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false); //초기값 설정시 로딩종료
  }, []);




  // 새로운 일기 추가 함수
  const onCreate = (createdDate, emotionId, selectedExercises  ,content) => {
    dispatch({
      type: "CREATE",  // CREATE 액션 디스패치
      data: {
        id: idRef.current++,  // 새로운 ID 할당 및 증가
        createdDate,
        emotionId,
        selectedExercises,
        content,
      },
    });
  };

  // 기존 일기 수정 함수
  const onUpdate = (id, createdDate, emotionId, selectedExercises ,content) => {
    dispatch({
      type: "UPDATE",  // UPDATE 액션 디스패치
      data: {
        id,
        createdDate,
        emotionId,
        selectedExercises,
        content
      }
    });
  };

  // 기존 일기 삭제 함수
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",  // DELETE 액션 디스패치
      id,
    });
  };

  if(isLoading) {
    return <div>데이터 로딩중입니다...</div>
  }

  return (
    <>
      {/* 일기 데이터 상태를 자식 컴포넌트에 전달 */}
      <DiaryStateContext.Provider value={data}>
        {/* 일기 조작 함수(onCreate, onUpdate, onDelete)를 자식 컴포넌트에 전달 */}
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          {/* 라우팅 설정: URL에 따라 페이지 컴포넌트 렌더링 */}
          <Routes> 
            <Route path="/" element={<Home />} />               {/* 홈 페이지 */}
            <Route path="/new" element={<New />} />             {/* 새 일기 작성 페이지 */}
            <Route path="/diary/:id" element={<Diary />} />     {/* 특정 ID의 일기 상세 페이지 */} { /*:는 Path Parameter가 올것임을 의미미*/ }
            <Route path="/edit/:id" element={<Edit />} />       {/* 특정 ID의 일기 수정 페이지 */}
            <Route path="*" element={<Notfound />} />           {/* 존재하지 않는 경로 접근 시 404 페이지 */}
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

// App 컴포넌트 export
export default App;

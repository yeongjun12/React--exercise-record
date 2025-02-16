import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import ExerciseDetailItem from "./ExerciseDetailItem";
import SetRecord from "./SetRecord";

import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList  } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";

import PropTypes from "prop-types";


//가슴
import DumbbellInclineBenchPress from "./../assets/chest/DumbbellInclineBenchPress.png";
import DumbbellFly from "./../assets/chest/DumbbellFly.png";
import MachineDeclineBenchPress from "./../assets/chest/MachineDeclineBenchPress.png";
import MachineInclineBenchPress from "./../assets/chest/MachineInclineBenchPress.png";
import MachineChestPress from "./../assets/chest/MachineChestPress.png";
import BarbellDeclineBenchPress from "./../assets/chest/BarbellDeclineBenchPress.png";
import BarbellInclineBenchPress from "./../assets/chest/BarbellInclineBenchPress.png";
import BarbellFlatBenchPress from "./../assets/chest/BarbellFlatBenchPress.png";
import SmithMachineBenchPress from "./../assets/chest/SmithMachineBenchPress.png";
import CableChestPress from "./../assets/chest/CableChestPress.png";

//등
import DumbbellRow from "./../assets/back/DumbbellRow.png";
import DumbbellInclineRow from "./../assets/back/DumbbellInclineRow.png";
import LatPulldown from "./../assets/back/LatPulldown.png";
import MachineLatPulldown from "./../assets/back/MachineLatPulldown.png";
import MachineSeatedRow from "./../assets/back/MachineSeatedRow.png";
import BarbellRow from "./../assets/back/BarbellRow.png";
import BandChinup from "./../assets/back/BandChinup.png";
import BehindNeckLatPulldown from "./../assets/back/BehindNeckLatPulldown.png";
import AssistedMachineChinup from "./../assets/back/AssistedMachineChinup.png";
import Chinup from "./../assets/back/Chinup.png";
import TBarRow from "./../assets/back/TBarRow.png";
import PendlayRow from "./../assets/back/PendlayRow.png";
import Pullup  from "./../assets/back/Pullup.png";

//어깨

import DumbbellRearDeltRaise  from "./../assets/shoulder/DumbbellRearDeltRaise.png";
import DumbbellLateralRaise  from "./../assets/shoulder/DumbbellLateralRaise.png";
import DumbbellFrontRaise  from "./../assets/shoulder/DumbbellFrontRaise.png";
import MachineLateralRaise  from "./../assets/shoulder/MachineLateralRaise.png";
import MachineShoulderPress  from "./../assets/shoulder/MachineShoulderPress.png";
import BarbellShoulderPress  from "./../assets/shoulder/BarbellShoulderPress.png";
import BarbellUprightRow  from "./../assets/shoulder/BarbellUprightRow.png";
import BarbellFrontRaise  from "./../assets/shoulder/BarbellFrontRaise.png";
import BandFacePull  from "./../assets/shoulder/BandFacePull.png";
import BandFrontRaise  from "./../assets/shoulder/BandFrontRaise.png";
import SeatedDumbbellShoulderPress  from "./../assets/shoulder/SeatedDumbbellShoulderPress.png";
import SeatedBarbellBehindTheNeckPress  from "./../assets/shoulder/SeatedBarbellBehindTheNeckPress.png";
import OneArmDumbbellShoulderPress  from "./../assets/shoulder/OneArmDumbbellShoulderPress.png";
import CableLateralRaise  from "./../assets/shoulder/CableLateralRaise.png";
import CableShoulderPress  from "./../assets/shoulder/CableShoulderPress.png";
import CableFacePull  from "./../assets/shoulder/CableFacePull.png";
import CableFrontRaise  from "./../assets/shoulder/CableFrontRaise.png";

//하체

import DumbbellSquat  from "./../assets/leg/DumbbellSquat.png";
import LegExtension  from "./../assets/leg/LegExtension.png";
import LegPress  from "./../assets/leg/LegPress.png";
import MachineHackSquat  from "./../assets/leg/MachineHackSquat.png";
import BarbellLunge  from "./../assets/leg/BarbellLunge.png";
import SmithMachineDeadlift  from "./../assets/leg/SmithMachineDeadlift.png";
import SmithMachineSquat  from "./../assets/leg/SmithMachineSquat.png";
import SeatedLegCurl  from "./../assets/leg/SeatedLegCurl.png";
import CableDeadlift  from "./../assets/leg/CableDeadlift.png";

//이두
import ConcentrationCurl  from "./../assets/biceps/ConcentrationCurl.png";
import DumbbellBicepCurl  from "./../assets/biceps/DumbbellBicepCurl.png";
import DumbbellHammerCurl  from "./../assets/biceps/DumbbellHammerCurl.png";
import DumbbellInclineHammerCurl  from "./../assets/biceps/DumbbellInclineHammerCurl.png";
import DumbbellInclineCurl  from "./../assets/biceps/DumbbellInclineCurl.png";
import BarbellBicepCurl  from "./../assets/biceps/BarbellBicepCurl.png";
import BarbellReverseCurl  from "./../assets/biceps/BarbellReverseCurl.png";
import CableHammerCurl  from "./../assets/biceps/CableHammerCurl.png";
import CableReverseCurl  from "./../assets/biceps/CableReverseCurl.png";
import EZBarBicepCurl  from "./../assets/biceps/EZBarBicepCurl.png";
import OneArmDumbbellPreacherCurl  from "./../assets/biceps/OneArmDumbbellPreacherCurl.png";
import DumbbellDragCurl  from "./../assets/biceps/DumbbellDragCurl.png";
import EZBarCloseGripCurl  from "./../assets/biceps/EZBarCloseGripCurl.png";
import EZBarWideGripBicepCurl  from "./../assets/biceps/EZBarWideGripBicepCurl.png";

//삼두
import CloseGripBenchPress  from "./../assets/triceps/CloseGripBenchPress.png";
import MachineDips   from "./../assets/triceps/MachineDips.png";
import BenchDips  from "./../assets/triceps/BenchDips.png";
import Dips  from "./../assets/triceps/Dips.png";
import DumbbellLyingTricepExtension  from "./../assets/triceps/DumbbellLyingTricepExtension.png";
import DumbbellTricepsExtension  from "./../assets/triceps/DumbbellTricepsExtension.png";
import OneArmTricepsExtension  from "./../assets/triceps/OneArmTricepsExtension.png";
import BarbellSeatedTricepExtension  from "./../assets/triceps/BarbellSeatedTricepExtension.png";
import MachineTricepExtension  from "./../assets/triceps/MachineTricepExtension.png";
import CableOverheadTricepExtension  from "./../assets/triceps/CableOverheadTricepExtension.png";
import CableRopeTricepExtension  from "./../assets/triceps/CableRopeTricepExtension.png";
import CableTricepPushDown  from "./../assets/triceps/CableTricepPushDown.png";
import CableInclinePushDown  from "./../assets/triceps/CableInclinePushDown.png";

//복근
import WeightedCableCrunch  from "./../assets/abs/WeightedCableCrunch.png";
import BicycleCrunch  from "./../assets/abs/BicycleCrunch.png";
import CrossBodyCrunch  from "./../assets/abs/CrossBodyCrunch.png";
import DeclineCrunch  from "./../assets/abs/DeclineCrunch.png";
import Plank  from "./../assets/abs/Plank.png";
import PlankRotation  from "./../assets/abs/PlankRotation.png";
import HangingLegRaise  from "./../assets/abs/HangingLegRaise.png";
import LegRaise  from "./../assets/abs/LegRaise.png";
import ABSlide  from "./../assets/abs/ABSlide.png";

const exerciseDetails = {
    1: [
        { type: "가슴", name: "덤벨 인클라인 벤치 프레스", img: DumbbellInclineBenchPress },
        { type: "가슴", name: "덤벨 플라이", img: DumbbellFly  },
        { type: "가슴", name: "머신 디클라인 벤치 프레스", img:MachineDeclineBenchPress  },
        { type: "가슴", name: "머신 인클라인 벤치 프레스", img: MachineInclineBenchPress  },
        { type: "가슴", name: "머신 체스트 프레스", img: MachineChestPress },
        { type: "가슴", name: "바벨 디클라인 벤치 프레스", img: BarbellDeclineBenchPress },
        { type: "가슴", name: "바벨 인클라인 벤치 프레스", img: BarbellInclineBenchPress },
        { type: "가슴", name: "바벨 플랫 벤치 프레스", img: BarbellFlatBenchPress },
        { type: "가슴", name: "스미스 머신 벤치 프레스", img: SmithMachineBenchPress },
        { type: "가슴", name: "케이블 체스트 프레스", img: CableChestPress },
    ],
    2: [
        { type: "등", name: "덤벨 로우", img: DumbbellRow },
        { type: "등", name: "덤벨 인클라인 로우", img: DumbbellInclineRow },
        { type: "등", name: "랫 풀 다운", img: LatPulldown  },
        { type: "등", name: "머신 랫 풀 다운", img: MachineLatPulldown  },
        { type: "등", name: "머신 시티드 로우", img: MachineSeatedRow },
        { type: "등", name: "바벨 로우", img: BarbellRow },
        { type: "등", name: "밴드 친 업", img: BandChinup },
        { type: "등", name: "비하인드 넷 랫 풀 다운", img: BehindNeckLatPulldown },
        { type: "등", name: "어시스티드 머신 친 업", img: AssistedMachineChinup  },
        { type: "등", name: "친업", img: Chinup },
        { type: "등", name: "티바 로우", img: TBarRow  },
        { type: "등", name: "팬들레이 로우", img: PendlayRow  },
        { type: "등", name: "풀 업", img: Pullup },
    ],
    3: [
        { type: "어깨", name: "덤벨 리어 델트 레이즈", img: DumbbellRearDeltRaise  },
        { type: "어깨", name: "사이드 레터럴 레이즈", img: DumbbellLateralRaise },
        { type: "어깨", name: "덤벨 프론트 레이즈", img: DumbbellFrontRaise  },
        { type: "어깨", name: "머신 레터럴 레이즈", img: MachineLateralRaise  },
        { type: "어깨", name: "머신 숄더 프레스", img: MachineShoulderPress },
        { type: "어깨", name: "바벨 숄더 프레스", img: BarbellShoulderPress  },
        { type: "어깨", name: "바벨 업라이트 로우", img: BarbellUprightRow },
        { type: "어깨", name: "바벨 프론트 레이즈", img: BarbellFrontRaise },
        { type: "어깨", name: "밴드 페이스 풀", img: BandFacePull },
        { type: "어깨", name: "밴드 프론트 레이즈", img: BandFrontRaise },
        { type: "어깨", name: "시티드 덤벨 숄더 프레스", img: SeatedDumbbellShoulderPress  },
        { type: "어깨", name: "시티드 비하인드 넥 프레스", img: SeatedBarbellBehindTheNeckPress },
        { type: "어깨", name: "원 암 덤벨 숄더 프레스", img:  OneArmDumbbellShoulderPress },
        { type: "어깨", name: "케이블 레터럴 레이즈", img: CableLateralRaise },
        { type: "어깨", name: "케이블 숄더 프레스", img: CableShoulderPress },
        { type: "어깨", name: "케이블 페이스 풀", img: CableFacePull },
        { type: "어깨", name: "케이블 프론트 레이즈", img: CableFrontRaise },
    ],

    4: [
        { type: "하체", name: "덤벨 스쿼트", img: DumbbellSquat   },
        { type: "하체", name: "레그 익스텐션", img: LegExtension  },
        { type: "하체", name: "레그 프레스", img: LegPress  },
        { type: "하체", name: "머신 핵 스쿼트", img: MachineHackSquat  },
        { type: "하체", name: "바벨 런지", img: BarbellLunge  },
        { type: "하체", name: "스미스 머신 데드리프트", img: SmithMachineDeadlift  },
        { type: "하체", name: "시티드 레그 컬", img: SeatedLegCurl  },
        { type: "하체", name: "케이블 데드리프트", img: CableDeadlift  },
        { type: "하체", name: "스미스 머신 스쿼트", img: SmithMachineSquat  },
    ],

    //이두운동
    5: [
        { type: "이두", name: "컨센트레이션 컬", img: ConcentrationCurl   },
        { type: "이두", name: "덤벨 바이셉 컬", img: DumbbellBicepCurl   },
        { type: "이두", name: "덤벨 해머 컬", img: DumbbellHammerCurl   },
        { type: "이두", name: "덤벨 인클라인 해머 컬", img: DumbbellInclineHammerCurl },
        { type: "이두", name: "덤벨 인클라인 컬", img: DumbbellInclineCurl  },
        { type: "이두", name: "바벨 바이셉 컬", img: BarbellBicepCurl   },
        { type: "이두", name: "바벨 리버스 컬", img: BarbellReverseCurl   },
        { type: "이두", name: "케이블 해머 컬", img: CableHammerCurl   },
        { type: "이두", name: "케이블 리버스 컬", img: CableReverseCurl   },
        { type: "이두", name: "이지바 바이셉 컬", img: EZBarBicepCurl    },
        { type: "이두", name: "원 암 덤벨 프리쳐 컬", img: OneArmDumbbellPreacherCurl   },
        { type: "이두", name: "덤벨 드래그 컬", img: DumbbellDragCurl   },
        { type: "이두", name: "이지바 클로즈 그립 컬", img: EZBarCloseGripCurl   },
        { type: "이두", name: "이지바 와이드 그립 바이셉 컬", img:EZBarWideGripBicepCurl    }
    ],
    //삼두운동
    6: [
        { type: "삼두", name: "클로즈 그립 벤치 프레스", img:CloseGripBenchPress   },
        { type: "삼두", name: "머신 딥스", img: MachineDips   },
        { type: "삼두", name: "벤치 딥스", img: BenchDips  },
        { type: "삼두", name: "딥스", img: Dips  },
        { type: "삼두", name: "라잉 트라이셉 익스텐션", img: DumbbellLyingTricepExtension  },
        { type: "삼두", name: "덤벨 트라이셉스 익스텐션", img: DumbbellTricepsExtension   },
        { type: "삼두", name: "원 암 트라이셉스 익스텐션", img: OneArmTricepsExtension  },
        { type: "삼두", name: "시티드 트라이셉 익스텐션", img: BarbellSeatedTricepExtension  },
        { type: "삼두", name: "머신 트라이셉 익스텐션", img: MachineTricepExtension  },
        { type: "삼두", name: "오버헤드 트라이셉 익스텐션", img: CableOverheadTricepExtension  },
        { type: "삼두", name: "트라이셉 익스텐션", img: CableRopeTricepExtension  },
        { type: "삼두", name: "트라이셉 푸시 다운", img: CableTricepPushDown  },
        { type: "삼두", name: "인클라인 푸시 다운", img: CableInclinePushDown  },
    ],

    //복근운동
    7: [
        { type: "복근", name: "중량 케이블 크런치", img: WeightedCableCrunch  },
        { type: "복근", name: "바이씨클 크런치", img: BicycleCrunch   },
        { type: "복근", name: "크로스 바디 크런치", img: CrossBodyCrunch  },
        { type: "복근", name: "디클라인 크런치", img: DeclineCrunch  },
        { type: "복근", name: "플랭크", img:Plank  },
        { type: "복근", name: "플랭크 로테이션", img:  PlankRotation  },
        { type: "복근", name: "행잉 레그 레이즈", img: HangingLegRaise  },
        { type: "복근", name: "레그 레이즈", img: LegRaise  },
        { type: "복근", name: "AB 슬라이드", img: ABSlide   },
    ],
  
};

const Editor = ({ initData, onSubmit}) => {
    // initData는 일지를 새로 작성할 때는 undefined이지만, 기존 일지를 수정할 때는 해당 일지의 데이터를 포함합니다.
    const [input, setInput] = useState({
        createdDate : new Date(),
        emotionId : 3,
        selectedExercises: [],
        content : "",
    }); //사용자가 입력한 데이터 저장
    
    const [selectedExercises, setSelectedExercises] = useState([]);
    const nav = useNavigate();


        //  운동 추가 시, 기본 세트 정보까지 저장
        const handleSelectExercise = (exercise) => {
            setSelectedExercises(prevExercises => {
                if (prevExercises.some(e => e.name === exercise.name)) {
                    // ✅ 이미 선택된 운동이면 리스트에서 제거
                    return prevExercises.filter(e => e.name !== exercise.name);
                } else {
                    // ✅ 선택되지 않은 운동이면 리스트에 추가 (기본 세트 정보 포함)
                    return [
                        ...prevExercises,
                        { ...exercise, sets: [
                            { id: 1, weight: 0, reps: 0 },
                            { id: 2, weight: 0, reps: 0 },
                            { id: 3, weight: 0, reps: 0 },
                            { id: 4, weight: 0, reps: 0 },
                            { id: 5, weight: 0, reps: 0 }
                        ] }
                    ];
                }
            });
        };

    //  운동 세트(weight, reps) 업데이트 함수
    const handleUpdateExercise = (updatedExercise) => {
        setSelectedExercises(prevExercises =>
            prevExercises.map(exercise =>
                exercise.name === updatedExercise.name ? updatedExercise : exercise
            )
        );
    };

    //  운동 삭제 시 `selectedExercises[]`에서 제거
    const handleDeleteExercise = (name) => {
        setSelectedExercises(prevExercises =>
            prevExercises.filter(exercise => exercise.name !== name)
        );
    };

    useEffect(() => { //새로운 일지 작성시에는 initData가 없기 때문에 실행 안됨
        if (initData) {
          setInput({
            ...initData,
            createdDate: new Date(Number(initData.createdDate)),
          });
        }
         // 기존에 선택된 운동을 자동으로 추가
         //ddd

          setSelectedExercises(initData?.selectedExercises || []);
      }, [initData]);


      useEffect(() => {
         //운동 요소 선택할때마다 input요소에 추가가


        setInput(prevInput => ({
            ...prevInput,
            selectedExercises: selectedExercises  
        }));


    }, [selectedExercises]); 
    
    const onChangeInput = (e) => {


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
                            target: { //prop으로 전달해서 받아줘야 실행됨.
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
            <h4> 운동 리스트</h4>
                <ul>
                    {exerciseDetails[input.emotionId]?.map((exercise, index) => (
                        <ExerciseDetailItem
                            key={index}
                            exercise={exercise}
                            onSelect={() => handleSelectExercise(exercise)}
                            isSelected={selectedExercises.some(e => e.name === exercise.name)} // 선택된 운동인지 확인
                        />
                    ))}
                </ul>
            
            </section>

            <section className="content_section">

               {selectedExercises.length > 0 ?  <h4>운동 기록</h4>  : null }
                
               {selectedExercises.map((exercise, index) => (
                <div key={index} className="exercise-record">
                    <SetRecord type={exercise.type} name={exercise.name} img={exercise.img} 
                    onDelete={() => handleDeleteExercise(exercise.name)}  
                    onUpdateExercise={handleUpdateExercise} set={exercise.sets}
                    
                    />
                </div>
            ))}


                <h4>메모</h4>

               <textarea 
               name="content"
               value={input.content}
               onChange={onChangeInput}
               placeholder="메모를 입력하세요" />
            </section> 
            <section className="button_section">
                <Button onClick={() => nav(-1)} text={"취소하기"}/> 
                
                <Button onClick={onClickSubmitButton} text={"작성완료"} type={"POSITIVE"}  /> 
            </section> 
        </div>//Oncreate를 직접 호출하지말고 클릭이 되었을때 실행되어야 하는 함수를 부모 컴포넌트로부터 전달받도록
    );
};

Editor.propTypes = {
    initData: PropTypes.shape({
        createdDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
        emotionId: PropTypes.number,
        content: PropTypes.string,
        selectedExercises: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                type: PropTypes.string,
                img: PropTypes.string,
                volume: PropTypes.number,
                sets: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number.isRequired,
                        weight: PropTypes.number.isRequired,
                        reps: PropTypes.number.isRequired
                    })
                )
            })
        ),
    }),
    onSubmit: PropTypes.func.isRequired,
};


export default Editor;
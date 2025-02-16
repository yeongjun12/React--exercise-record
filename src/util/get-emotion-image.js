
import chest from "./../assets/chest.png";
import back from "./../assets/back.png";
import shoulder from "./../assets/shoulder.png";
import leg from "./../assets/leg.png";
import biceps from "./../assets/biceps.png";
import triceps from "./../assets/triceps.png";
import abs from "./../assets/abs.png";

export function getEmotionImage(emotionId) {
    switch(emotionId) {
        case 1:
            return chest;
        case 2 :
            return back;
        case 3 :
            return shoulder;
        case 4 :
            return leg;
        case 5 :
            return biceps;
        case 6 :
            return triceps;
        case 7 :
            return abs;
        default:
            return null;
    }
}
import {useRef} from "react";

export const useThrottlingProtect = () => {
    const timerIdRef = useRef<any>(null);

    function throttlingProtect(func:() => void, delay:number){
        clearTimeout(timerIdRef.current);
        timerIdRef.current = setTimeout(func, delay)
    }

    return throttlingProtect


}
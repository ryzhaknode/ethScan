import { useState, useEffect, useCallback } from 'react';

const useCountdownTimer = (initialSeconds: number) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);

    const startTimer = useCallback(() => {
        setSeconds(initialSeconds);
        setIsActive(true);
    }, [initialSeconds]);

    // const stopTimer = useCallback(() => {
    //     setIsActive(false);
    // }, []);

    useEffect(() => {
        let timerId:any = null;

        if (isActive && seconds > 0) {
            timerId = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false);
        }

        return () => {
            if (timerId) clearInterval(timerId);
        };
    }, [isActive, seconds]);

    return [ seconds, startTimer ] as const;
};

export default useCountdownTimer;
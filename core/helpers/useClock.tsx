import { useState, useEffect } from "react";

function useClock(): number {
    const [timeLeft, setTimeLeft] = useState<number>(30);

    useEffect(() => {
        let setClockInterval: NodeJS.Timeout;

        setTimeout(() => {
            setClockInterval = setInterval(() => {
                setTimeLeft(30 - (Math.floor(Number(new Date()) / 1000) % 30));
            }, 1000);
        }, 1000 - new Date().getMilliseconds());

        return () => {
            clearInterval(setClockInterval);
        };
    }, []);

    return timeLeft;
}

export default useClock;

import {useCallback, useEffect, useState} from "react";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


export default function App() {
    const [sec, setSec] = useState(0);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const change = new Subject();

        interval(10)
            .pipe(takeUntil(change))
            .subscribe(() => {
                if (status === true) {
                    setSec(val => val + 1000);
                }
            });

        return () => {
            change.next();
            change.complete();
        };
    }, [status]);

    const start = () => {
        setStatus(true);
    };

    const stop = () => {
        setStatus(false);
        setSec(0);
    };

    const reset = () => {
        setSec(0);
    };

    let singleClick = false
    let doubleClick
    const wait = (e) => {

        if (doubleClick === true) {
            setStatus(false);
            doubleClick = false;
        } else if (singleClick === false)
            setTimeout(() => {
                doubleClick = true
            }, 1000);

    }

    return (
        <div>
            <span> {new Date(sec).toISOString().slice(11, 19)}</span>

            <button className="start-button" onClick={start}>Start</button>

            <button className="stop-button" onClick={stop}>Stop</button>

            <button onClick={reset}>Reset</button>

            <button onClick={wait}>Wait</button>
        </div>
    );
}


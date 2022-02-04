import {useEffect, useState} from "react";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import './App.css';

export default function App() {
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const change = new Subject();

        interval(10)
            .pipe(takeUntil(change))
            .subscribe(() => {
                if (status === true) {
                    setTime(val => val + 1000);
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
        setTime(0);
    };

    const reset = () => {
        setTime(0);
    };

    const wait = () => {
        setStatus(false);
    };


    return (
        <div className={'main-box'}>
            <div className={'display-box'}>
                <span className={'display'}> {new Date(time).toISOString().slice(11, 19)}</span> <br/>
            </div>

            <div className={'buttons'}>
                <button className={'start-button'} onClick={start}>Start</button>

                <button className={'stop-button'} onClick={stop}>Stop</button>

                <button onClick={reset} className={'reset-button'}>Reset</button>

                <button onDoubleClick={wait}>Wait</button>
            </div>
        </div>
    );
}


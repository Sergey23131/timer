import {useEffect, useState} from "react";
import {buffer, filter, fromEvent, interval, Subject} from "rxjs";
import {debounceTime, map, takeUntil} from "rxjs/operators";
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

    const starts = () => {
        setStatus(true);
    };

    const stop = () => {
        setStatus(false);
        setTime(0);
    };

    const reset = () => {
        setTime(0);
    };

    useEffect(() => {
        const click$ = fromEvent(document.getElementById('waitButton'), 'click');
        const buff$ = click$.pipe(debounceTime(300));

        click$.pipe(
            buffer(buff$),
            map((queue) => queue.length),
            filter((clicks) => clicks === 2)
        )
            .subscribe((value => {
                setStatus(false);
            }))

    }, []);

    return (
        <div className={'main-box'}>
            <div className={'display-box'}>
                <span className={'display'}> {new Date(time).toISOString().slice(11, 19)}</span> <br/>
            </div>

            <div className={'buttons'}>
                <button className={'start-button'} onClick={starts}>Start</button>

                <button className={'stop-button'} onClick={stop}>Stop</button>

                <button className={'reset-button'} onClick={reset}>Reset</button>

                <button id="waitButton">Wait</button>
            </div>
        </div>
    );
}


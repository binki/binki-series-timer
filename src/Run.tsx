import React, {
  useEffect,
  useState,
} from 'react';
import TimerEntryCollection from './TimerEntryCollection';

// Parses the data into TimerEntry and then mounts a component which consumes that.
export default function Run(props:{
  entries: TimerEntryCollection,
  buildEditUri: (data:TimerEntryCollection)=>string,
}) {
  const [runKey, setRunKey] = useState<object>({});
  return (
    <div>
      <div>
        <RunEntries entries={props.entries} runKey={runKey}/>
      </div>
      <div>
        <button onClick={() => {
          setRunKey({});
        }}>Reset</button>
        <button onClick={() => {
            window.location.href = props.buildEditUri(props.entries);
        }}>Edit</button>
      </div>
    </div>
  );
};

// Displays a series of TimerEntry.
function RunEntries(props:{
  entries: TimerEntryCollection,
  runKey: object,
}) {
  const [clock, setClock] = useState<{
    entryIndex: number,
    current: number,
    initial: number,
    runKey: object,
  }>();
  useEffect(() => {
    if (clock !== undefined && clock.runKey !== props.runKey) {
      setClock(undefined);
      return;
    }
    let entryIndex = clock === undefined ? 0 : clock.entryIndex;
    if (entryIndex >= props.entries.length) return;
    const requestId = requestAnimationFrame(requestClock => {
      let initial = clock === undefined ? requestClock : clock.initial;
      let passed = requestClock - initial;
      while (passed > props.entries.get(entryIndex).duration) {
        const duration = props.entries.get(entryIndex).duration;
        passed -= duration;
        initial += duration;
        if (++entryIndex === props.entries.length) break;
      }
      setClock({
        runKey: props.runKey,
        entryIndex,
        current: requestClock,
        initial,
      });
    });
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [clock, props.entries, props.runKey]);
  if (clock === undefined) return <div/>;
  if (clock.entryIndex >= props.entries.length) return <div>Done!</div>;
  const diff = clock.current - clock.initial;
  const duration = props.entries.get(clock.entryIndex).duration;
  return (
    <div style={{
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        fontSize: '25vmin',
        fontFamily: 'monospace',
      }}>{(diff/1000).toFixed(2)} / {(duration/1000).toFixed(2)}</div>
      <div style={{
        fontSize: '25vmin',
        hyphens: 'auto',
      }}>{props.entries.get(clock.entryIndex).text}</div>
    </div>
  );
}

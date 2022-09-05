import React from 'react';

export default function Editor(props:{
  data: string,
  buildRunUri: (data:string)=>string,
  buildUri: (data:string)=>string,
  getDataFromUri: (uri:string)=>string,
}) {
  return (
    <div>
      <p>
        Each line is a time entry of the format «seconds» «description».
        
      </p>
      <div>
        {/* Use key so that the element is reset when navigation occurs. */}
        <textarea defaultValue={props.data} key={props.data} onChange={e => {
            window.history.replaceState({}, '', props.buildUri(e.target.value));
        }}/>
      </div>
      <div>
        <button onClick={e => {
            window.location.href = props.buildRunUri(props.getDataFromUri(window.location.href));
        }}>Run</button>
      </div>
    </div>
  );
};

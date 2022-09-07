import React from 'react';
import TimerEntry from './TimerEntry';

export default function Editor(props:{
  data: string,
  buildRunUri: (data:string)=>string,
  buildUri: (data:string)=>string,
  getDataFromUri: (uri:string)=>string,
}) {
  return (
    <div>
      <p>
        Each line is a time entry of the format «seconds» «description»[ «color»]. Fields are separated by tabs (though, for convenience, the first two fields may instead be separated by a space). It may be easiest to edit in a spreadsheet and copy-paste into this box when done.
      </p>
      <p>
        Supported values for «color» are limited to facilitate users of both dark and light modes. Empty/omitted/unrecognized will be the default foreground text color for the mode (i.e., black in light mode, grey in light mode). Other keywords are: {TimerEntry.supportedColorKeywords.join(', ')}.
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

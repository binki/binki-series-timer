import Editor from './Editor';
import React, {
  useEffect,
} from 'react';
import Run from './Run';
import TimerEntryCollection from './TimerEntryCollection';
import './App.css';

function App() {
  const [href, setHref] = React.useState(window.location.href);
  React.useEffect(() => {
    function handlePopState() {
      setHref(window.location.href);
    }
    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const hashIndex = href.indexOf('#');
  const uriPrefix = hashIndex === -1 ? href + '#' : href.substring(0, hashIndex + 1);
  const hash = hashIndex === -1 ? '' : href.substring(hashIndex + 1);

  const runHashPrefix = 'run/';
  const editorHashPrefix = 'editor/';
  const buildEditUri = (data:string) => {
    return `${uriPrefix}${editorHashPrefix}${encodeURIComponent(data)}`;
  };
  const buildEditUriFromEntries = (entries:TimerEntryCollection) => {
    return buildEditUri(entries.toString());
  };
  const route = hash.startsWith(runHashPrefix) ? {
    render: (entries:TimerEntryCollection) => {
      return <Run entries={entries} buildEditUri={buildEditUriFromEntries}/>;
    },
    prefix: runHashPrefix,
    buildTitle: (entries:TimerEntryCollection) => {
      return entries.title;
    },
  } : {
    render: (entries:TimerEntryCollection) => {
      return <Editor data={decodeURIComponent(hash.substring(editorHashPrefix.length))} buildRunUri={data => `${uriPrefix}${runHashPrefix}${encodeURIComponent(data)}`} buildUri={buildEditUri} getDataFromUri={uri => {
        const hashIndex = uri.indexOf('#');
        if (hashIndex === -1) return '';
        return decodeURIComponent(uri.substring(hashIndex + 1 + editorHashPrefix.length));
      }}/>;
    },
    prefix: editorHashPrefix,
    buildTitle: (entries:TimerEntryCollection) => {
      return `Editing: ${entries.title}`;
    },
  };
  const entries = new TimerEntryCollection(decodeURIComponent(hash.substring(route.prefix.length)));
  const title = route.buildTitle(entries);
  useEffect(() => {
    document.title = title || 'Binki Series Timer';
  }, [title]);

  return (
    <div className="App">
      {route.render(entries)}
    </div>
  );
}

export default App;

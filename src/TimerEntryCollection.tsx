import TimerEntry from './TimerEntry';

export default class TimerEntryCollection {
  private readonly entries: TimerEntry[];
  get length() {
    return this.entries.length;
  }
  readonly title:string;
  constructor(data:string) {
    this.entries = data.split(/[\r\n]+/g).map((line, i) => {
      return new TimerEntry(line, i);
    });
    this.title = (this.entries[0] || {text: ''}).text;
  }

  get(index:number) {
    return this.entries[index];
  }

  toString() {
    return this.entries.join('\r\n');
  }
}

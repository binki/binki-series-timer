import LineParser from './LineParser';

export default class TimerEntry {
  readonly lineIndex: number;
  readonly duration: number;
  readonly text: string;
  readonly color?: string;
  static readonly supportedColorKeywords = [
    'orange',
    'red',
    'maroon',
    'green',
    'blue',
    'deepskyblue',
    'aqua',
    'skyblue',
    'teal',
    'turquoise',
    'purple',
  ];
  constructor(line:string, lineIndex:number) {
    this.lineIndex = lineIndex;
    const parser = new LineParser(line);
    const duration = (1000*parseFloat(parser.nextAnyWhitespace()))|0;
    this.duration = isNaN(duration) || duration < 0 ? 1 : duration;
    this.text = parser.nextTabbed();
    this.color = parser.nextTabbed();
    if (this.color === '') this.color = undefined;
  }

  toString() {
    return [(this.duration/1000).toFixed(3).replace(/\.?0+$/, ''), this.text, this.color].join('\t');
  }
}

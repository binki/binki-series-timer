export default class LineParser {
  private line:string;
  constructor(line:string) {
    this.line = line;
  }

  next(delimeterRegExp:RegExp) {
    const lastLine = this.line;
    const delimiterIndex = lastLine.search(delimeterRegExp);
    if (delimiterIndex === -1) {
      this.line = '';
      return lastLine;
    }
    const execResults = delimeterRegExp.exec(lastLine);
    if (!execResults) throw new Error('RegExp failed to exec() unexpectedly.');
    this.line = lastLine.substring(delimiterIndex + execResults[0].length);
    return lastLine.substring(0, delimiterIndex);
  }

  nextAnyWhitespace() {
    return this.next(/[ \t]/);
  }

  nextTabbed() {
    return this.next(/\t/);
  }
}

class ICBMatch {
    constructor(matches = [], verifications = [], isFullRecordAvailable , icbMatchRecord) {
      this.matches = matches;                     // Array of pairs of strings
      this.verifications = verifications;         // Array of strings
      this.isFullRecordAvailable = isFullRecordAvailable;  // Boolean
      this.icbMatchRecord = icbMatchRecord;       // ICBMatchRecord instance or null
    }
  }

  export default ICBMatch;
  
class SearchResult {
    constructor(source, complete, status, matches, verifications) {
      this.source = source;
      this.complete = complete;
      this.status = status;
      this.matches = matches
      this.verifications = verifications;
      // this.firstNameMatched = firstNameMatched;
      // this.lastNameMatched = lastNameMatched;
    }
  }
  
  export default SearchResult;
  
class SearchResult {
  constructor(source, complete, status, matches, verifications, multiMatches) {
    this.source = source;
    this.complete = complete;
    this.status = status;
    this.matches = matches;
    this.verifications = verifications;
    this.multiMatches = multiMatches; // multiMatches is set here
  }
}

  
  export default SearchResult;
  
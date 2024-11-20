class SearchResult {
  constructor(source, complete, status, icbMatch,  multiMatches) {
    this.source = source;
    this.complete = complete;
    this.status = status;
    this.icbMatch = icbMatch;
    this.multiMatches = multiMatches;
    
     // multiMatches is set here
  }
}

  
  export default SearchResult;
  
class UniqueId {
    constructor(searchSource,idType, idValue) {
      this.searchSource=searchSource;
      this.idType = idType;  // e.g., passport, driving license, etc.
      this.idValue = idValue; // the actual unique ID value
    }
  }
  
  export default UniqueId;
  
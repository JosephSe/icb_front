class UniqueId {
    constructor(idType, idValue) {
      this.idType = idType;  // e.g., passport, driving license, etc.
      this.idValue = idValue; // the actual unique ID value
    }
  }
  
  export default UniqueId;
  
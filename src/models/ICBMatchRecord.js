class ICBMatchRecord {
    constructor(firstName, middleName, lastName, dateOfBirth, address, drivingLicenseNumber, passportNumber, birthCertificate, photo) {
      this.firstName = firstName || ''; // Default to empty string if not provided
      this.middleName = middleName || '';
      this.lastName = lastName || '';
      this.dateOfBirth = dateOfBirth || null; // Default to null if not provided
      this.address = address || '';
      this.drivingLicenseNumber = drivingLicenseNumber || '';
      this.passportNumber = passportNumber || '';
      this.birthCertificate = birthCertificate || '';
      this.photo = photo || '';
    }
    
   
  }
  export default ICBMatchRecord;
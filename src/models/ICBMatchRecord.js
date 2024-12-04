class ICBMatchRecord {
  constructor(firstName, middleName, lastName, dateOfBirth, address, drivingLicenseNumber, passportNumber, birthCertificate, fileName, flag, motherName, motherMaidenName, motherPlaceOfBirth, fatherName, fatherPlaceOfBirth, registrationDistrict, subDistrict, administrativeArea, dateOfRegistration) {
    this.firstName = firstName || ''; // Default to empty string if not provided
    this.middleName = middleName || '';
    this.lastName = lastName || '';
    this.dateOfBirth = dateOfBirth || null; // Default to null if not provided
    this.address = address || '';
    this.drivingLicenseNumber = drivingLicenseNumber || '';
    this.passportNumber = passportNumber || '';
    this.birthCertificate = birthCertificate || '';
    this.fileName = fileName || '';
    this.flag = flag || '';
    this.motherName = motherName || '';
    this.motherMaidenName = motherMaidenName || '';
    this.motherPlaceOfBirth = motherPlaceOfBirth || '';
    this.fatherName = fatherName || '';
    this.fatherPlaceOfBirth = fatherPlaceOfBirth || '';
    this.registrationDistrict = registrationDistrict || '';
    this.subDistrict = subDistrict || '';
    this.administrativeArea = administrativeArea || '';
    this.dateOfRegistration = dateOfRegistration || '';
  }

}
export default ICBMatchRecord;
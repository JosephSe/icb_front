import UniqueId from './UniqueID';
import BioDetails from './BioDetails';
import Address from './Address';

class SearchFilter {
  constructor(searchSources, uniqueId, bioDetails, address) {
    this.searchSources = searchSources;  // Should be an array with LEV, DVLA, IPCS
    this.searchIDTypes = uniqueId;  // an instance of UniqueId
    this.searchBioDetails = bioDetails;  // an instance of BioDetails
    this.address = address;  // an instance of Address

    // Call the validation method after setting up the fields
    this.validateSearchSources();
  }

  // Method to validate search sources
  validateSearchSources() {
    const validSources = ['LEV', 'DVLA', 'IPCS'];

    if (!this.searchSources.every(source => validSources.includes(source))) {
      console.error("Invalid search source value.");
      throw new Error("Invalid search source value. Allowed values are LEV, DVLA, IPCS.");
    }

   
  }
}

export default SearchFilter;

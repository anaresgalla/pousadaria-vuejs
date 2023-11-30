const app = Vue.createApp({
  data() {
    return {
      searchText: '',
      listLodges: [],

      id: '',      
      corporateName: '',
      description: '',
      phoneNumber: '',
      email: '',
      pets: '',
      policies: '',
      checkin: '',
      checkout: '',
      paymentMethod: '',
      address: '',
      averageRating: '',
      zipCode: '',
      maxGuests: '',
      disableFacilities: '',
      bedrooms: '',
      country: '',
      neighbourhood: '',
      state: '',
      
      hideLodgeDetails: true,
    }
  },
  async mounted(){
    this.listLodges = this.getLodges();
   
  }, 

  methods: {
    async getLodges(){
      this.hideLodgeList = false;
      this.hideLodgeDetails = true;
      
      this.currentLodgeId = '';

      let url = 'http://localhost:3000/api/v1/lodges/'
      
      let response = await fetch(url);
      let data = await response.json();
      
      this.listLodges = [];
      data.forEach(item => {
        var lodge = new Object();
        lodge.id = item.id;
        lodge.name = item.name;

        this.listLodges.push(lodge)
      })
    },

    async getLodgeDetails(lodgeId){
      this.hideLodgesList = true;
      this.hideLodgeDetails = false;

      let response = await fetch(`http://localhost:3000/api/v1/lodges/${lodgeId}/`)
      let data = await response.json();
      
      this.currentLodgeId = lodgeId;
      this.lodgeName = data.name;
      this.corporateName = data.corporate_name;
      this.average = data.average;
      this.description = data.description;
      this.policies = data.policies;
      this.phoneNumber = data.phone_number;
      this.pets = data.pets     
      this.address = data.address;
      this.neighborhood = data.neighborhood;
      this.city = data.city;
      this.state = data.state;
      this.zipCode = data.zip_code;
    },

  }
});

app.mount('#app')

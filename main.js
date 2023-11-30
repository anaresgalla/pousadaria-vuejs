const app = Vue.createApp({
  data() {
    return {
      listLodges: [],
      listRooms: [],

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
      hideRoomsList: true,
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
      this.hideRoomsList = false;

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

    async getRooms(lodgeId){
      //this.hideLodgeDetails = false;
      //this.hideRoomsList = false;

      let response = await fetch(`http://localhost:3000/api/v1/lodges/${lodgeId}/rooms`)
      let data = await response.json();

      this.listRooms = [];
      data.forEach(item => {
        var room = new Object();
        room.id = item.id;
        room.name = item.name;
        room.description = item.description;
        room.area = item.area;
        room.ac = item.ac;
        room.balcony = item.balcony;
        room.tv = item.tv;
        room.disabledFacilities = item.disabled_facilities;
        room.closet = item.closet;
        room.bathroom = item.bathroom;
        room.safe = item.safe;
        room.maxGuests = item.max_guests;
        room.standardOvernight = item.standard_overnight;
        room.vacant = item.vacant;

        this.listRooms.push(room)
      })

    }

  }
});

app.mount('#app')

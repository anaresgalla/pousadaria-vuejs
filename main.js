const app = Vue.createApp({
  data() {
    return {
      listLodges: [],
      listRooms: [],
      searchText: '',
      
      bookingDetails: {},     

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
      hideLodgesList: true,
      hideBookingDetails: true,
      
      currentRoomId: '',
      checkinDate: '',
      checkoutDate: '',
      numberGuests: '',
      bookingPrice: '',
      errors: [],
    }
  },

  computed:{
    listResult(){
      if(this.searchText){
        //Procurar pelo contato
        return this.listLodges.filter(lodge => {
          return lodge.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
      }else{
        //Se não encontrar, retornar todos os contatos
        return this.listLodges;
      }
    }
  },

  async mounted(){
    this.listLodges = this.getLodges();   
  }, 

  methods: {
    async getLodges(){
      this.hideLodgesList = false;
      this.hideLodgeDetails = true;
      this.currentLodgeId = '';

      let url = ''
      if(this.searchText) {
        url = `http://localhost:3000/api/v1/lodges/?name=${this.searchText}`
      } else {
        url = `http://localhost:3000/api/v1/lodges/`
      }
      
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
        
        if (!this.bookingDetails[room.id]) {
          this.bookingDetails[room.id] = {
            checkinDate: '',
            checkoutDate: '',
            numberGuests: '',
            bookingPrice: '',
            errors: [],
          };
        }
      })
    },

    async checkRoomAvailability(roomId, roomDetails){
      this.currentRoomId = roomId;
      this.hideBookingDetails = false;
   
      let url = `http://localhost:3000/api/v1/lodges/check_availability/?id=${roomId}&start_date=${roomDetails.checkinDate}&end_date=${roomDetails.checkoutDate}&guests=${roomDetails.numberGuests}`

      try {
        let response = await fetch(url);
        if (response.ok) {
          let data = await response.json();
          this.bookingPrice = '';
          this.errors = [];
          if(data.total_price) {
            this.bookingPrice = data.total_price         
          }
        } else {          
          this.errors = 'Quarto indisponível na data ou número de hóspedes maior que o permitido.';        
        }
      } catch (error) {
       
        console.error('Network error:', error);
        this.errors = ['Erro de rede. Verifique sua conexão.'];
      }
    },  
  }
});

app.mount('#app')
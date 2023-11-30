const app = Vue.createApp({
  data() {
    return {
      listLodges: [],
    }
  },
  async mounted(){
    this.listLodges = this.getLodges();  
  }, 

  methods: {
    async getLodges(){
      
      let url = 'http://localhost:3000/api/v1/lodges/'
      
      let response = await fetch(url);
      let data = await response.json();
      
      this.listLodges = [];
      data.forEach(item => {
        var lodge = new Object();
        lodge.id = item.id;
        lodge.name = item.name;
        lodge.city = item.city;

        this.listLodges.push(lodge)
      })
    },  
  }
});

app.mount('#app')

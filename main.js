
var app = new Vue({
  el: '#app',
  data: {
    query: '',
    items: [],
    processing: false
  },
  methods: {
    showError(error) {
      const html = `<p class="error">${error}</p>`;
      document.querySelector('#results').innerHTML = html;
    },
    render() {
      
    },
    getAuthorNames(authors) {
      if (authors)
        return authors.join(", ")
      return ""
    },
    searchForBooks: function () {
      var self = this
      if (this.query == "") {
        alert("Enter Search Query.")
        return
      }

      this.processing = true
          this.items = []
          axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.query)
              .then(function (response) {
                  self.items = response.data.items
                  self.processing = false;
                  self.render(self.items);
              }).catch(function (error) {
                  self.processing = false
                  self.showError(error.response.data.error);
              })
    }
  }
})
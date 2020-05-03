/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
            <li class="nav-item active">
            <router-link class="nav-link" to="/uploadform">Upload Form <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>    
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

let Form = Vue.component('upload-form',{
    template:
    `
    <div id = 'app'>
        <h1>Upload Form</h1>
        
            <div v-if = "errors.length > 0">
                <ul>
                    <li v-for = "error in errors" class = "alert-danger">
                        {{error.error}}
                    </li>
                </ul> 
            </div>
            <div v-else class = "alert-success">
                {{response.message}}
            </div>
            
        <form id = 'uploadform' enctype = 'multipart/form-data' method = 'POST' @submit.prevent="uploadPhoto" name = 'form'>
            <br><br>
            <label for = 'description'><h5>Description</h5></label>
            <textarea id = 'description' class = 'form-control' name = 'description'></textarea>
            <br>
            <label for = 'photo'><h5>Photo Upload</h5></label>
            <input type = 'file' class="btn btn-primary mb-2" id = 'photo' name = 'photo'>
            <br>
            <input type = 'submit' class="btn btn-primary mb-2" value="Submit">
        </form>
    </div>
    `,
    
    data: function() {
       return {
           response: {},
           errors:[]
       };
    }
    ,
    methods:{
        uploadPhoto: function(){
        let self       = this;
        let uploadForm = document.getElementById('uploadform');
        let form_data  = new FormData(uploadForm);
            fetch("/api/upload", {
                method: 'POST',
                body:form_data,
                headers: {
                        'X-CSRFToken': token
                         },
                        credentials: 'same-origin' 
                })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                if (jsonResponse.Errors == null){
                    self.response = jsonResponse;
                    self.errors   = [];
                    uploadForm.reset() //Reset the form after a successful upload
                    console.log(self.response)
                }
                else{
                    self.errors   = jsonResponse.Errors; 
                    console.log(self.errors)
                }
                })
                .catch(function (error) {
                console.log(error);
            });
        }
    }
});




const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})
// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/",           component: Home },
        { path: "/uploadform", component:Form}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});
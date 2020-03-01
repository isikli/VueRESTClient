<template>
<div id="authors">
<div class="formflds">
<label>First Name</label><input v-debounce:300ms="getAuthors" type="text" v-model="newAuthor.firstName" autofocus/>
<label>Last Name</label><input v-debounce:300ms="getAuthors" type="text" v-model="newAuthor.lastName"/>
<label>Create</label><button v-on:click="createAuthor">&#43;</button>
</div>

<ListAuthors v-bind:authors="authors"  v-on:deleteauthor="deleteAuthor"></ListAuthors>

<ActionResultPane v-bind:reqResult="reqResult"></ActionResultPane>

</div>
</template>


<script>

import axios from 'axios';
import ActionResultPane from './ActionResultPane.vue'
import ListAuthors from './ListAuthors.vue'

export default {
components: {
  ActionResultPane,
  ListAuthors
},
  name: 'books',
	data: function () { return {
		newAuthor: {
			firstName: "",
			lastName: "",
		},
    reqResult:"",
    authors: [],
    BOOKS_URL:"http://localhost:3001/books",
    //AUTHORS_URL:"http://localhost:3001/authors"
    AUTHORS_URL:"https://restapi-server-node-js.herokuapp.com/books/authors"

    }
    },
  mounted: function () {
  let currentObj = this;
  axios
    .get(this.AUTHORS_URL)
    .then(response => (this.authors = response.data)).catch(function (error) {
// handle error
currentObj.reqResult = error;
});
},

	methods: {

  getAuthors: function ()
  {
    let currentObj = this;
    console.log ("getAuthors")
    axios.get(this.AUTHORS_URL+'?firstName='+currentObj.newAuthor.firstName+'&lastName='+currentObj.newAuthor.lastName)
    .then(
    function (response)
    {
     console.log (response);
      if (response)
      {
        currentObj.authors = response.data;
      } else
      {
        currentObj.authors = [];
      }
    }).catch(function (error) {
    console.log (error);
    currentObj.reqResult = error.response;});
    console.log (this.authors);
  },

    load: function ()
    {
      var currentObj = this;
      axios.get(this.AUTHORS_URL)
      .then(response => (currentObj.authors = response.data)).catch(function (error) {
      currentObj.reqResult = error.response;});
    },

    createAuthor: function (e) {
     console.log ('add author');
      e.preventDefault();
      if (this.newAuthor.firstName == '') return;
      if (this.newAuthor.lastName == '') return;
      let currentObj = this;
      axios.post(this.AUTHORS_URL, {
        firstName: this.newAuthor.firstName,
        lastName: this.newAuthor.lastName
        })
      .then( function (response) {
      console.log (response.data.id);
        currentObj.reqResult = response;
        var createdAuthor;
        createdAuthor.authors.id = response.data.id;
        createdAuthor.authors.firstName = response.data.firstName;
        createdAuthor.authors.lastName = response.data.lastName;
        currentObj.authors.push (createdAuthor);

      //  currentObj.newAuthor.firstName = currentObj.newAuthor.lastName = '';
        }).catch(function (error) {
    // handle error
    currentObj.reqResult = error;
  });
  },
  deleteAuthor (id)
  {
    axios.delete (this.AUTHORS_URL+'\\'+id);
  }
}
};

</script>
<style>
.formflds
{
  margin-top: 20px;
  width: 80%;
  text-align: left;
}
</style>

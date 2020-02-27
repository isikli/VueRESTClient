<template>
<div id="authors">
<div class="formflds">
<label>First Name</label><input type="text" v-model="newAuthor.firstName" autofocus/>
<label>Last Name</label><input type="text" v-model="newAuthor.lastName"/>
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
    AUTHORS_URL:"http://localhost:3001/authors"
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
        currentObj.reqResult = response;
        currentObj.newAuthor.firstName = currentObj.newAuthor.lastName = '';
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

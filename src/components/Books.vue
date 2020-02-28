<template>
<div id="books">

<div class="formflds">
<label>Author</label><input v-debounce:300ms="getAuthors" class = "authorid" type="text" v-model="authorName"/>
<ul
  id="autocomplete-results"
  v-show="true"
  class="autocomplete-results"
>
  <li
    class="loading"
    v-if="isLoading"
  >
    Loading results...
  </li>
  <li
    v-else
    v-for="(author, i) in authors"
    :key="i"
    @click="setSelectedAuthor(author)"
    class="autocomplete-result"
  >
    {{ authors [i].firstName +'-'+authors [i].lastName}}
  </li>
  </ul>
</div>

<div class="formflds">
<label>Book Title</label><input class = "title" type="text" ref="title" v-model="newBook.name" autofocus/>
<label>Add</label><button :disabled="isDisabled" v-on:click="addBook">&#43;</button>
</div>



<ListBooks v-bind:books="books"  v-on:removebook="removeBook"></ListBooks>

<div id="reload">
<label>Reload</label><button v-on:click="load">&#43;</button>
</div>

<ActionResultPane v-bind:reqResult="reqResult"></ActionResultPane>

</div>
</template>

<script>

import axios from 'axios';
import ActionResultPane from './ActionResultPane.vue'
import ListBooks from './ListBooks.vue'


export default {
components: {
  ActionResultPane,
  ListBooks
},
  name: 'books',
	data: function () { return {
		newBook: {
			name: "",
			authorId: "",
		},
    authorName:"",
    reqResult:"",
    books: [],
    authors: [],
    isLoading : false,
    BOOKS_URL:"http://localhost:3001/books",
    AUTHORS_URL:"http://localhost:3001/authors"
    }
    },
  mounted: function () {
  let currentObj = this;
  axios
    .get(this.BOOKS_URL)
    .then(response => (this.books = response.data)).catch(function (error) {
// handle error
currentObj.reqResult = error.response;
});
},

computed: {
isDisabled: function(){
console.log ("isDisabled" + this.newBook.authorId);
if (this.newBook.authorId)
{
  return false;
} else {
  return true;
}
}
},

	methods: {
    setSelectedAuthor : function (author)
    {
      this.authorName = author.firstName+"-"+author.lastName;
      this.newBook.authorId = author.id;
      console.log ("setSelectedAuthor" + this.newBook.authorId);
    },

    getAuthors: function ()
    {
      let currentObj = this;
      console.log ('getAuthors: ' +this.AUTHORS_URL);
      this.newBook.authorId = this.newBook.name = "";
      axios.get(this.AUTHORS_URL+'?firstName='+currentObj.authorName)
      .then(
      function (response)
      {
        if (response)
        {
          currentObj.authors = response.data;
        } else
        {
          currentObj.authors = [];
        }
      }).catch(function (error) {
      currentObj.reqResult = error.response;});
      console.log (this.authors);
    },

    load: function ()
    {
      var currentObj = this;
      axios.get(this.BOOKS_URL)
      .then(response => (currentObj.books = response.data)).catch(function (error) {
      currentObj.reqResult = error.response;});
    },
    addBook: function (e) {
     console.log ('add book');
      e.preventDefault();
      if (this.newBook.name == '') return;
      if (this.authorName == '') return;
      let currentObj = this;
      console.log ('add book');

      axios.post(this.BOOKS_URL, {
        name: this.newBook.name,
        authorId: this.newBook.authorId
        })
      .then( function (response) {
      console.log (response);

       currentObj.books.push({
        name: currentObj.newBook.name,
        id: response.data.id
      });
       currentObj.reqResult = response;
        }).catch(function (error) {
    // handle error
    currentObj.reqResult = error;
  });
  },
  removeBook (id)
  {
    axios.delete (this.BOOKS_URL+'\\'+id);
  }
}
};

</script>

<style>
$bdr-color: #ccc;
$btn-size: 20px;
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.formflds
{
  margin-top: 20px;
  width: 80%;
  text-align: left;
}
table {
  table-layout: fixed;
	border-collapse: collapse;
	border-spacing: 0;
	width: 80%;
  margin: 20px;
  border: 1px solid black;
  background-color: #E1E7EE;
}
 td, th {
    border: 1px solid black;
		background-color: #E1E7EE;
	}


	td {
		border-bottom: 1px solid $bdr-color;
		line-height: 1.2;
		text-align: left;
		padding: 0.5rem;
	}
	th {
    background-color: #4CAF50;
		font-size: 0.8em;
		letter-spacing: 1px;
		text-transform: uppercase;
    text-align: left;
    padding: 0.5rem;

	}


.authorid {
font-size: 15px;
width: 24%;
}

.title {
font-size: 15px;
width: 24%;
}

li {
font-size: 15px;
width: 24%;
}
input[type=submit],
button {
	border: 1px solid darken($bdr-color, 15);
	border-radius: 50%;
	background-color: transparent;
	cursor: pointer;
	font-size: 12px;
	font-weight: normal;
	height: $btn-size;
	width: $btn-size;
	padding: 0;
	&:hover {
		border-color: #DF4A12;
	}
}

#reload {
margin-bottom:20px;
width: 80%;

}

label {
margin: 20px;
}

</style>

<template>
<div id="books">
<div class="formflds">
<label>Title</label><input class = "title" type="text" ref="title" v-model="newBook.name" autofocus/>
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
<label>Add</label><button v-on:click="addBook">&#43;</button>
</div>

<table class="books">
		<thead>
			<tr>
				<th>Title</th>
				<th>Authorid </th>
				<th>Delete</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(book,index) in books" v-bind:key="book.id">
				<td>{{ book.name }}</td>
				<td>{{ book.id }}</td>
				<td class="actions">
					<button v-on:click="removeBook(index,book.id)">&times;</button>
				</td>
        </tr>
		</tbody>
</table>

<div id="reload">
<label>Reload</label><button v-on:click="load">&#43;</button>
</div>

<div>
		<label>Action Result:</label>
</div>
<div class="box">
		<p>{{reqResult}}</p>
</div>
</div>
</template>

<script>

import axios from 'axios';

export default {
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
    isLoading : false
    }
    },
  mounted: function () {
  let currentObj = this;
  axios
    .get('http://localhost:3001/books')
    .then(response => (this.books = response.data)).catch(function (error) {
// handle error
currentObj.reqResult = error;
});
},

	methods: {
    setSelectedAuthor : function (author)
    {
      this.authorName = author.firstName+"-"+author.lastName;
      this.newBook.authorId = author.id;
    },

    getAuthors: function ()
    {
      let currentObj = this;
      console.log ('getAuthors: ' + currentObj.authorName);
      axios.get('http://localhost:3001/authors?firstName='+currentObj.authorName)
      .then(
      function (response)
      {
        currentObj.authors = response.data;
        console.log ("response begin");
        console.log (currentObj.authors);
        console.log ("response end");
      }).catch(function (error) {
      currentObj.reqResult = error;});
      console.log (this.authors);
    },

    load: function ()
    {
      var currentObj = this;
      axios.get('http://localhost:3001/books')
      .then(response => (currentObj.books = response.data)).catch(function (error) {
      currentObj.reqResult = error;});
    },
    addBook: function (e) {
     console.log ('add book');
      e.preventDefault();
      if (this.newBook.name == '') return;
      if (this.authorName == '') return;
      let currentObj = this;
      console.log ('add book');

      axios.post('http://localhost:3001/books', {
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
        currentObj.newBook.name = currentObj.newBook.authorId = '';
        }).catch(function (error) {
    // handle error
    currentObj.reqResult = error;
  });
  },
  removeBook (index,id)
  {
    axios.delete ('http://localhost:3001/books/'+id);
    this.books.splice(index,1);
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

.title {
font-size: 12px;
width: 28%;
}

.authorid {
font-size: 12px;
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

.box {
	margin-top: 1em;
	padding: 0.5rem;
	background: #eee;
  width: 80%;
  margin: 20px;
}

</style>

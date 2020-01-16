<template>
<div id="books">

	<table>

		<thead>
			<tr>
				<td><input type="text" ref="title" v-model="newBook.name" autofocus placeholder="Title " /></td>
				<td>
					<input type="text" v-model="newBook.authorId" placeholder="authorid" />
				</td>
				<td class="actions">
					<button v-on:click="addBook">&#43;</button>
				</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(book,index) in books" v-bind:key="book.id">
				<th>{{ book.name }}</th>
				<th>{{ book.id }}</th>
				<th class="actions">
					<button v-on:click="removeBook(index,book.id)">&times;</button>
				</th>
        </tr>

		</tbody>
	</table>

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
			authorId: ""
		},
    reqResult:"",
    books: []
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
    addBook: function (e) {
      e.preventDefault();
      if (this.newBook.name == '') return;
      if (this.newBook.authorId == '') return;
      let currentObj = this;
      axios.post('http://localhost:3001/books', {
        name: this.newBook.name,
        authorId: this.newBook.authorId
        })
      .then( function (response) {
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

body {
	margin: 2em;
}
table {
	border-top: 1px solid #ddd;
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
	thead td {
		background-color: #E1E7EE;
	}
	th,
	td {
		border-bottom: 1px solid $bdr-color;
		line-height: 1.2;
		text-align: left;
		padding: 0.5rem;
	}
	th {
		background: #F5F7Fb;
		font-size: 0.8em;
		letter-spacing: 1px;
		text-transform: uppercase;
	}
}

input[type=text] {
	width: 100%;
	padding: 0.3rem;
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

.actions {
	text-align: right;
	white-space: nowrap;
	width: $btn-size * 4;
}

.box {
	margin-top: 1em;
	padding: 1em;
	background: #eee;
}

textarea {
	font-family: monospace;
	font-size: 12px;
	margin: 0.5em 0 0 0;
	padding: 0.5em;
	width: 100%;
}

.hidden {
	display: none;
}
</style>

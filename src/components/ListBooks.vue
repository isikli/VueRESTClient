<template>
<div id="listbooks">

<table class="books">
		<thead>
			<tr>
				<th>Title</th>
				<th>Bookid </th>
				<th>Author First Name </th>
				<th>Author Last Name </th>
				<th>Delete</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(book,index) in books" v-bind:key="book.id">
				<td>{{ book.name }}</td>
				<td>{{ book.id }}</td>
				<td>{{ book.author.firstName }}</td>
				<td>{{ book.author.lastName }}</td>
				<td class="actions">
					<button v-on:click="removeBook(index,book.id)">;</button>
				</td>
        </tr>
		</tbody>
</table>

</div>
</template>

<script>
export default {
  props: { books: Array },
  name: 'ListBooks',
  methods: {

    removeBook (index, id) {
      this.books.splice(index, 1)
      this.$emit('removebook', id)
    }
  }
}

</script>

<style>
$bdr-color: #ccc;
$btn-size: 20px;
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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

</style>

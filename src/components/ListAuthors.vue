<template>
<div id="listauthors">

<table class="authors">
		<thead>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
        <th>Author Id</th>
				<th>Delete</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(author,index) in authors" v-bind:key="author.id">
				<td>{{ author.firstName }}</td>
				<td>{{ author.lastName }}</td>
        <td>{{ author.id }}</td>
				<td class="actions">
					<button v-on:click="deleteAuthor(index,author.id)">;</button>
				</td>
        </tr>
		</tbody>
</table>

</div>
</template>

<script>
export default {
  props: { authors: Array },
  name: 'ListAuthors',
  methods: {

    deleteAuthor (index, id) {
      this.authors.splice(index, 1)
      this.$emit('deleteauthor', id)
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

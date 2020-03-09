<template>
<div id="ActionResultPane">
		<label>Action Result:</label>
		<p>{{reqResult}}</p>
</div>
</template>

<script>
export default {
  props: { reqResult: String },
  name: 'ActionResultPane'
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
label {
margin: 20px;
}

p {
	margin-top: 1em;
	padding: 0.5rem;
	background: #eee;
  width: 80%;
  margin: 20px;
}

</style>

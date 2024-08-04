<script>

	const source = new EventSource('/osc')

	source.addEventListener('message', e => {
		console.log(e.data)
	}, false)

</script>

<div id="container">
	<div id="circle"></div>
</div>

<style>
	h1 {
		color: purple;
	}

	#container {
		position: relative;
		height: 100vh;	
		width: 100vw;
/*		background: rgba(0, 0, 90, 0.6);*/
	}

	#circle {
		position: absolute;
		background: pink;
		height: 50px;
		width: 50px;
		top: 50%;
		left: 50%;
/*		right: 0;*/
		border-radius: 100%;
	}

</style>
<!-- <h1>Welcome to SvelteKit</h1> -->
<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<script>
	/*import osc from '../../../node_modules/osc/dist/osc-browser.min.js'*/

	// import osc from 'osc'

	// console.log(osc)

	if (!!window.EventSource) {
	    var source = new EventSource('/countdown')

	    source.addEventListener('message', function(e) {
	      document.getElementById('data').innerHTML = e.data
	    }, false)

	    source.addEventListener('open', function(e) {
	      document.getElementById('state').innerHTML = "Connected"
	    }, false)

	    source.addEventListener('error', function(e) {
	      const id_state = document.getElementById('state')
	      if (e.eventPhase == EventSource.CLOSED)
	        source.close()
	      if (e.target.readyState == EventSource.CLOSED) {
	        id_state.innerHTML = "Disconnected"
	      }
	      else if (e.target.readyState == EventSource.CONNECTING) {
	        id_state.innerHTML = "Connecting..."
	      }
	    }, false)
	  } else {
	    console.log("Your browser doesn't support SSE")
	  }


</script>

<div id="container">
	<h1>SSE: <span id="state"></span></h1>
  	<h3>Data: <span id="data"></span></h3>
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
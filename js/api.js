//API to save image and generate image URL in real time

(function(){
	var video = document.getElementById('video'),
		canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		photo = document.getElementById('photo'),
		vendorUrl = window.URL || window.webkitURL;

		navigator.getMedia = navigator.getUserMedia ||
							 navigator.webkitGetUserMedia ||
							 navigator.mozGetUserMedia || 
							 navigator.msGetUserMedia;

		if (navigator.getUserMedia) {
		   navigator.getUserMedia({ audio: false, video: true },
		      function(stream) {
		         video.src = vendorUrl.createObjectURL(stream);
		         video.onloadedmetadata = function(e) {
		 		 video.play();
		         };
		      },
		      function(err) {
		         console.log("The following error occurred: " + err.name);
		      }
		   	);
		} else {
		   	console.log("getUserMedia not supported");
			}

		document.getElementById('capture').addEventListener('click',function(){
			context.drawImage(video,0,0 ,400,300);
			photo.setAttribute('src',canvas.toDataURL('image/png'));

			var activityTimeout = setTimeout(save, 2000);

			function save(){
				var canvas = document.getElementById("canvas");
                var dataURL = canvas.toDataURL("image/png");
                var name = document.getElementById("user").value;
                name = name.toLowerCase();

               if(name!='')
               {
					 $.ajax({
	                    type: "POST", 
	                    url: "includes/genapi.php", 
	                    data: { img: dataURL,name: name }      
	                }).done(function(msg){
	                	document.getElementById("myInput").value = msg; 
	                	//Get you responce image from  " msg " variable
	                 	//alert(query); 
	            
	                });
            	} else {
            		alert('Error : Username Empty');
            		console.log('Error : Username Empty');
            	}
			}

		});



})();

function copy() {
	var copyText = document.getElementById("myInput");
 	copyText.select();
 	document.execCommand("Copy");
 	console.log('Copied');
 	alert("URL copied : " + copyText.value);
}
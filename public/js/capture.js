var commentsApp = new Vue({
	el: '#requestHeaderDiv',
	data : {

		},
	  methods: {
			fetchCientInfo() {
				// console.log(document.getElementById("feedbackComment").value);
	      fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/client.php')
	      .then(response => response.json())
	      .then (json => {
					console.log("headers");
          this.readHeaders();
				})
	      .catch( function(err){
	        console.log(err)
	      })
	    },
			readHeaders() {
				//TODO: fetch request response headers
        var req = new XMLHttpRequest();
        req.open('GET', document.location, false);
        req.send(null);

        // associate array to store all values
        var data = new Object();

        // get all headers in one call and parse each item
        var headers = req.getAllResponseHeaders().toLowerCase();
        var aHeaders = headers.split('\n');
        var i =0;
        for (i= 0; i < aHeaders.length; i++) {
            var thisItem = aHeaders[i];
            var key = thisItem.substring(0, thisItem.indexOf(':'));
            var value = thisItem.substring(thisItem.indexOf(':')+1);
            data[key] = value;
        }

        // get referer
        var referer = document.referrer;
        data["Referer"] = referer;

        //get useragent
        var useragent = navigator.userAgent;
        data["UserAgent"] = useragent;


        //extra code to display the values in html
        var display = "";
        for(var key in data) {
            if (key != "")
        	display += "<b>" + key + "</b> : " + data[key] + "<br>";
        }
        document.getElementById("dump").innerHTML =  display;
	    }
	  },
		created() {
			this.fetchCientInfo();
      this.readHeaders();
			// this.addComment();
			// this.checkData();
		}
	})

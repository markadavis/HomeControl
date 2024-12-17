var http = require("http"),
	url = require("url"),
	httpProxy = require('http-proxy'),
	path = require("path"),
	fs = require("fs"),
	port = process.argv ? process.argv.length > 2 ? process.argv[2] : 8080 : 8080,

	////////////////////////////////////////////////////////////////////////////
	// Adjust this settings to your needs for proxying the backend requests   //
	////////////////////////////////////////////////////////////////////////////
	aProxies = [{
		prefix: "/russoundProxy/",	// the prefix you use to call your backend functions via the proxy server
		host: "192.168.168.100",	// the host of your backend server
		port: ""					// port of your backend server - default is 80
	}, {
		prefix: "/hdbasetProxy/",	// the prefix you use to call your backend functions via the proxy server
		host: "192.168.68.101",		// the host of your backend server
		port: ""					// port of your backend server - default is 80
	}, {
		prefix: "/russoundScan/",	// the prefix you use to call your backend functions via the proxy server
		host: "192.168.68.n",		// the host of your backend server
		port: ""					// port of your backend server - default is 80
	}];

var proxy = httpProxy.createProxyServer();

http.createServer(function(request, response) {

	var uri = url.parse(request.url).pathname,
		filename = path.join(process.cwd(), uri);

	var aFoundProxy = aProxies.filter(function(oProxy) {
		return uri.indexOf(oProxy.prefix) === 0;
	});

	var proxy_cfg = aFoundProxy.length === 0 ? null : aFoundProxy[0];

	if (proxy_cfg && uri.indexOf(proxy_cfg.prefix) === 0) {
		proxy.on("error", function(err, req, res) {
			// console.log("backend error");
			console.error(err);
		});
		proxy.on("proxyRes", function(proxyRes, req, res) {
			console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
		});
		proxy.on("close", function(req, socket, head) {
			// view disconnected websocket connections
			console.log('Client disconnected');
		});

		if (proxy_cfg.prefix === "/russoundScan/" ) {

			for(var i = 21; i < 255; i++) {
				var sHost = proxy_cfg.host.replace("n", i.toString());

				request.headers.host = proxy_cfg.host;

				request.url = request.url.slice(proxy_cfg.prefix.length);

				proxy.web(request, response, {
					target: "http://" + sHost + (proxy_cfg.port ? ":" + proxy_cfg.port : "") + "/"
				});
			}
			
		} else {
			
		}

	} else {
		var sFilename = filename;

		fs.exists(sFilename, function(exists) {
			if (!exists) {
				response.writeHead(404, {
					"Content-Type": "text/plain"
				});
				response.write(sFilename + " - 404 Not Found\n");
				response.end();
				return;
			}

			if (fs.statSync(sFilename).isDirectory()) {
					sFilename += "/index.html";
			}

			fs.readFile(sFilename, "binary", function(err, file) {
				if (err) {
					response.writeHead(500, {
						"Content-Type": "text/plain"
					});
					response.write(err + "\n");
					response.end();
					return;
				}

				response.writeHead(200);
				response.write(file, "binary");
				response.end();
			});
		});
	}
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

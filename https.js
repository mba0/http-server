const https = require('https');
const path = require('path');
const fs = require('fs');
var sec = { key: fs.readFileSync('./key.pem'), cert: fs.readFileSync('./cert.pem') };
const port = process.argv[2] || 65536;
const addr = "1.1.1.1";

var packet = `server|${addr}\nport|${port}\ntype|1\n#maint|Server\n\n\nbeta_server|127.0.0.1\nbeta_port|17091\nbeta_type|1\nbeta2_server|127.0.0.1\nbeta2_port|${port}\nbeta2_type|1\nmeta|${Math.floor(Date.now() / 1000)}\nRTENDMARKERBS1001`;

var server = https.createServer(sec, function (request, response) {
  console.log(`\u001b[32mA new connection has made from: ${request.connection.remoteAddress}`);
  let pathname = `.${parsedUrl.pathname}`;
  const ext = path.parse(pathname).ext;
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };

  if(request.url === "/growtopia/server_data.php")
  {
    response.write(packet, function (err) {
      if (err)
          console.log(err);      
  });
  response.end();
  response.destroy();
  }
  else
  {
    if( (request.url.indexOf("/cache") || request.url.indexOf("/0098")) !== -1)
    {
      console.log(`\u001b[32mA new connection has made from: ${request.connection.remoteAddress}`);
      fs.exists(pathname, function (exist) {
      if(!exist) {
        response.statusCode = 301;
        response.writeHead(301, {
        Location: `https://ubistatic-a.akamaihd.net/0098/28378${request.url}`
      }).end();
      return;
    }
    fs.readFile(pathname, function(err, data) {
      if(err){
        response.statusCode = 404;
        response.end(`err`);
      }
      else {
        response.setHeader('Content-type', map[ext] || 'text/plain' );
        response.end(data);
        }
      });
      
    });    
  }
  else
  {
    response.statusCode = 301;
    response.end();
  }
}

});

server.listen(parseInt(port));


server.on("listening", function () { return console.log("[+] started"); });

console.log(`Server listening on port ${port}`);

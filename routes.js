const http = require('http');
const fs = require('fs');

class RoutesController {

    initialise(req, res) {
        if(req.url === '/'){
            res.write('<html>')
            res.write('<head><title></title></head>')
            res.write('<body> <form action="/message" method="POST"><input name="message" type="text"/> <button type="submit">Send</button></form> </body>')
            res.write('</html>')
            return res.end();
        }
        if(req.url === '/message' && req.method == 'POST'){
            const body = [];
            // When data
            req.on('data', (chunk) => {
                body.push(chunk);
            });
        
            // When data ends event listener
            return req.on('end', async () => {
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
                try {
                    await fs.writeFile('message.txt', message);
                    res.writeHead(302, {
                        'Location': '/'
                    });
                    return res.end();
                } catch (error) {
                    console.log(error);
                }    
            });
        }  
    }
}

module.exports = new RoutesController();


const WebSocket  = require('ws')

const server = new WebSocket.Server({
    port: 8080
})

server.on('open',function open(){
    console.log('server connected')
})
server.on('close',function close(){
    console.log('server disconnected');
})
server.on('connection',function connection(ws,req){
    const ip = req.connection.remoteAddress
    const port = req.connection.remotePort
    const clientName = ip + port
    console.log('%s is connected',clientName);

    //发送信息给客户端
    ws.send(`Welcome${clientName}`)
    ws.on('message',function incoming(msg){
        console.log(`received: %s from %s`,msg,clientName)
        //广播信息给所有客户端
        server.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(`${clientName}->${msg}`)
            }
        })
    })
})

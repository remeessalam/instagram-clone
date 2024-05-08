const axios = require('./axios')


const socketServer = (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('online', (data) => {
        console.log(data, socket.id, 'online')
        data.userId !== '' && axios.post('/registerOnline', { userId: data.userId, socketId: socket.id }).
            then(data => console.log('online'))
            .catch(err => console.log(err))
    })

    socket.on("join_room", ({ roomId }) => {
        socket.join(roomId);
        console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
    });

    socket.on('client-to-server', (chat) => {
            console.log(chat,socket.id,'hffyyuhgkfj')
        socket.to(chat.roomId).emit('server-to-client', chat);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
}


module.exports = socketServer
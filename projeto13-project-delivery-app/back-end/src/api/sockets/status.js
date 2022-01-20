module.exports = (io) => io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);
    socket.emit('new');
    socket.on('xablau', () => {
      console.log('xablau server');
    });
  });
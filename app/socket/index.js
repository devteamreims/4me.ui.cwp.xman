import {
  socketConnected,
  socketDisconnected
} from '../actions/socket';

let mySocket;

// Global socketIo object event handler
export function setupSocketIo(dispatch, socketIo) {
  console.log('Initializing socket.io');

  mySocket = socketIo;

  socketIo.on('connect', function(socket) {
    console.log('Connected to server !');
    dispatch(socketConnected());
  });

  socketIo.on('disconnect', (socket) => dispatch(socketDisconnected()));

  attachHandlerToSocket(dispatch, socketIo);

  return mySocket;
}


export function getSocket() {
  return mySocket;
}

export function setSubscriptionFilter(data) {
  let {sectors = [], verticalFilter = false} = data;

  const socket = getSocket();

  if(!socket || !socket.emit) {
    console.error('xmanSocket: setSubscriptionFilter: Socket is undefined !!');
    return;
  }

  if(_.isEmpty(sectors)) {
    verticalFilter = false;
  }

  if(socket && socket.emit) {
    console.log('Changing socket subscription !');
    console.log({sectors, verticalFilter});
    socket.emit('set_subscription_filter', {sectors, verticalFilter});
  }
}

export function sendXmanAction(flightId, status) {
  const socket = getSocket();

  if(!socket || !socket.emit) {
    console.error('xmanSocket: sendXmanAction: Socket is undefined !!');
    return;
  }

  console.log(`Socket: Updating flight with id ${flightId}`);
  socket.emit('set_action', Object.assign({}, {flightId}, status));
  
}

import {
  removeFlights,
  addFlights,
  updateFlights
} from '../actions/flight-list';

export function attachHandlerToSocket(dispatch, socket) {
  socket.on('add_flights', (data) => {
    console.log('XMAN Socket : add_flights');
    console.log(data);

    dispatch(addFlights(data));
  });

  socket.on('remove_flights', (data) => {
    console.log('XMAN Socket : remove_flights');
    console.log(data);

    dispatch(removeFlights(data));
  });

  socket.on('update_flights', (data) => {
    console.log('UPDATE_FLIGHTS');
    console.log(data);

    dispatch(updateFlights(data));
  });

}
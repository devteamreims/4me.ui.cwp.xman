/**
 * @ngdoc overview
 * @name 4me.ui.cwp.xman.api
 * @description
 * A single service called xman.api which provides api urls for the whole organ
 */

const api = {
  rootPath: 'http://' + window.location.hostname + ':3101',
  xman: {
    getAll: '/xman',
    setCurrentStatus: (flightId) => `/xman/${flightId}/setCurrentStatus`
  },
  socket: 'http://' + window.location.hostname + ':3101'
};

angular.module('4me.ui.cwp.xman.api', [])
.constant('cwp.xman.api', api);

export default api;

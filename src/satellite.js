'use strict';
/**
 * @ngdoc service
 * @name angular-satellite
 * @description
 * # nsSatellite
 * Satellite Service in the astro(Naut Soft)ware library.
 */

angular.module('angular-satellite', [
    'angular-satellite.twoLineElement',
    'angular-satellite.geodetic',
    'angular-satellite.satellite'
])
    .service('nsSatelliteService', [
        '$log',
        'nsSatelliteFactory',
        function ($log, nsSatelliteFactory) {

            $log.debug('nsSatelliteFactory: Init');
            $log.debug(nsSatelliteFactory.get());


            //public methods & properties

            //private methods and properties - should ONLY expose methods and properties publicly (via the 'return' object) that are supposed to be used; everything else (helper methods that aren't supposed to be called externally) should be private.

            return {

            };
        }
    ]);
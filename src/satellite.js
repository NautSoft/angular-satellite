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
    'angular-satellite.geodetic'
])
    .factory('nsSatellite',['nsTwoLineElementFactory',
        function (nsTwoLineElementFactory) {

            //public methods & properties
            var self ={
                tle: nsTwoLineElementFactory.get()
            };

            //private methods and properties - should ONLY expose methods and properties publicly (via the 'return' object) that are supposed to be used; everything else (helper methods that aren't supposed to be called externally) should be private.

            return self;
        }
    ]);
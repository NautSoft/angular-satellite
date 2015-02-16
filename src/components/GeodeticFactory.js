/**
 * Created by michael on 2/15/15.
 */
'use strict';

/**
 *
 * @ngdoc service
 * @name angular-satellite.nsGeodeticFactory
 * @description
 * Component factory for use in nsSatellite.
 */
angular.module('angular-satellite.geodetic', [])
    .factory('nsGeodeticFactory', ['$log', 'NS_ELLIPSOID',
        function ($log, ellipsoid) {

            /**
             * @name angular-satellite.Geodetic
             * @object
             * @param lat   {number|null}
             * @param lon   {number|null}
             * @param alt   {number|null}
             * @param theta {number|null}
             *
             * @description
             * Geodetic object used for the location calculations
             *
             * @constructor
             */
            function Geodetic(lat, lon, alt, theta) {
                var _ellipsoid = ellipsoid.WGS84;
                this.lat    = lat   || 0.0;
                this.lon    = lon   || 0.0;
                this.alt    = alt   || 0.0;
                this.theta  = theta || 0.0;
            }

            /**
             *
             * @type {number}
             */
            Geodetic.prototype.lat   = null;

            /**
             *
             * @type {number}
             */
            Geodetic.prototype.lon   = null;

            /**
             *
             * @type {number}
             */
            Geodetic.prototype.alt   = null;

            /**
             *
             * @type {number}
             */
            Geodetic.prototype.theta = null;

            /**
             *
             * @returns angular-satellite.geodetic
             */
            Geodetic.prototype.clone = function() {
                return new Geodetic(this.lat, this.lon, this.alt, this.theta);
            };

            Geodetic.prototype.getCartesian3 = function() {

                return Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.alt);
            };

            Geodetic.prototype.getAsArray = function() {
                $log.debug('Geodetic: getAsArray [' + this.lat+','+this.lon+','+this.alt+']');
                return [this.lon, this.lat, Math.round(this.alt*1000)];
            };

            // Public API here
            return {
                /**
                 *
                 * @param obj {Geodetic|null}
                 * @returns {museumOfFlightApp.GeodeticService.Geodetic}
                 */
                get: function (obj) {
                    return new Geodetic(obj);
                }
            };
        }
    ]);

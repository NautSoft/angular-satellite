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
    .factory('nsGeodeticFactory', ['$log', 'NS_ELLIPSOIDS',
        function ($log, NS_ELLIPSOIDS) {

            /**
             * @name angular-satellite.Geodetic
             * @object
             * @param {number} latitude        [latitude  = 0.0]
             * @param {number} longitude       [longitude = 0.0]
             * @param {number} altitude        [altitude  = 0.0]
             * @param {number} theta           [theta     = 0.0]
             * @param {boolean} radians        [radians   = true]
             * @param {boolean} metric         [metric    = true]
             * @param {nsEllipsoid} ellipsoid  [ellipsoid = WSG84]
             *
             * @description
             * Geodetic object used for the location calculations
             *
             * @constructor
             */
            function Geodetic(latitude, longitude, altitude, theta, radians, metric, ellipsoid) {

                var _self      = this,
                    _ellipsoid = ellipsoid || NS_ELLIPSOIDS.WGS84,
                    _radians   = radians   || true,
                    _metric    = metric    || true;

                this.latitude  = latitude  || 0.0;
                this.longitude = longitude || 0.0;
                this.altitude  = altitude  || 0.0;
                this.theta     = theta     || 0.0;

                function _clone() {
                    return new Geodetic(
                        _self.latitude, _self.longitude, _self.altitude, _self.theta,
                        _radians, _metric, _ellipsoid);
                }

                _self.clone = _clone;
            }

            /**
             * @type {number}
             */
            Geodetic.prototype.latitude   = null;

            /**
             * @type {number}
             */
            Geodetic.prototype.longitude  = null;

            /**
             * @type {number}
             */
            Geodetic.prototype.altitude   = null;

            /**
             * @type {number}
             */
            Geodetic.prototype.theta      = null;

            /**
             * @returns angular-satellite.Geodetic
             * @constant
             */
            Geodetic.prototype.clone = function() {};

            /**
             * @returns {[longitude, latitude, altitude]}
             * @constant
             */
            Geodetic.prototype.toArray = function() {
                return [this.longitude, this.latitude, this.altitude];
            };

            // Public API here
            return {
                /**
                 * @returns angular-satellite.Geodetic
                 * @param {number} latitude        [latitude  = 0.0]
                 * @param {number} longitude       [longitude = 0.0]
                 * @param {number} altitude        [altitude  = 0.0]
                 * @param {number} theta           [theta     = 0.0]
                 * @param {boolean} radians        [radians   = true]
                 * @param {boolean} metric         [metric    = true]
                 * @param {nsEllipsoid} ellipsoid  [ellipsoid = WSG84]
                 */
                get: function (latitude, longitude, altitude, theta, radians, metric, ellipsoid) {
                    return new Geodetic(latitude, longitude, altitude, theta, radians, metric, ellipsoid);
                }
            };
        }
    ]);

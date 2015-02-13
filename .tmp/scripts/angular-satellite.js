'use strict';
/**
 * @ngdoc factory
 * @name angular-satellite
 * @description
 * # nsSatellite
 * Satellite Service in the astro(Naut Soft)ware library.
 */

angular.module('angular-satellite', [
    'angular-satellite.twoLineElement'
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
    ]);;'use strict';

/**
 * @ngdoc service
 * @name angular-satellite.nsTwoLineElementFactory
 * @description
 * Component Factory for use in nsSatellite.
 */
angular.module('angular-satellite.twoLineElement', [])
    .factory('nsTwoLineElementFactory', [
        function () {

            /**
             * @name angular-satellite.TwoLineElement
             * @object
             * @param tleString {string|null}
             *
             * @description
             * Parsed Two Line Element object.
             * @see http://www.celestrak.com/NORAD/documentation/tle-fmt.asp for
             * an explanation of what a Two Line Element is.
             *
             * @constructor
             */
            function TwoLineElement(tleString) {

                var _name       = '',
                    _catNum     = 0,
                    _setNum     = 0,
                    _designator = '',
                    _year       = 0,
                    _refEpoch   = 0.0,
                    _incl       = 0.0,
                    _raan       = 0.0,
                    _eccn       = 0.0,
                    _argPer     = 0.0,
                    _meanAn     = 0.0,
                    _meanMo     = 0.0,
                    _drag       = 0.0,
                    _ndDot6     = 0.0,
                    _bStar      = 0.0,
                    _orbitNum   = 0;

                /**
                 *
                 * @returns {string}
                 */
                this.getCommonName = function() {
                    return _name;
                };

                /**
                 * @returns {number}
                 */
                this.getCatalogNumber = function() {
                    return _catNum;
                };

                /**
                 * @returns {number}
                 */
                this.getSetNumber = function() {
                    return _setNum;
                };

                /**
                 * @returns {string}
                 */
                this.getDesignator = function() {
                    return _designator;
                };

                /**
                 * @returns {number}
                 */
                this.getYear = function() {
                    return _year;
                };

                /**
                 * @returns {number}
                 */
                this.getReferanceEpoch = function() {
                    return _refEpoch;
                };

                /**
                 * @returns {number}
                 */
                this.getInclination = function() {
                    return _incl;
                };

                /**
                 * @returns {number}
                 */
                this.getRightAscensionOfAscendingNode = function() {
                    return _raan;
                };

                /**
                 * @returns {number}
                 */
                this.getEccentricity = function() {
                    return _eccn;
                };

                /**
                 * @returns {number}
                 */
                this.getArgumentOfPerigee = function() {
                    return _argPer;
                };

                /**
                 * @returns {number}
                 */
                this.getMeanAnomaly = function() {
                    return _meanAn;
                };

                /**
                 * @returns {number}
                 */
                this.getMeanMotion = function() {
                    return _meanMo;
                };

                /**
                 * @returns {number}
                 */
                this.getDrag = function() {
                    return _drag;
                };

                /**
                 * @returns {number}
                 */
                this.getBahnLatitude = function() {
                    return _ndDot6;
                };

                /**
                 * @returns {number}
                 */
                this.getBStar = function() {
                    return _bStar;
                };

                /**
                 * @returns {number}
                 */
                this.getOrbitNumber = function() {
                    return _orbitNum;
                };

                /**
                 * @param tleString {string}
                 * @throws tleString must be a string
                 */
                function _loadTLE(tleString) {
                    if (!angular.isString(tleString)) {
                        throw 'TwoLineElement: tleString must be a string or null';
                    }

                    var parts   = tleString.split('\n'),
                        line,
                        temp;

                    _name       = parts.length === 3 ? parts.shift() : 'unspecified';

                    // Line 1
                    line        = parts.shift();

                    _catNum     =                 Number(line.substring( 2, 7) );
                    _designator =                        line.substring( 9,17);
                    _year       =                 Number(line.substring(18,20) );
                    _refEpoch   =                 Number(line.substring(20,32) );
                    _drag       =                 Number(line.substring(33,43) );

                    temp        =        1.0e-5 * Number(line.substring(44,50) );
                    _ndDot6     = temp / Math.pow(10.0, (line.substring(51,52) - '0'));

                    temp        =        1.0e-5 * Number(line.substring(53,59) );
                    _bStar      = temp / Math.pow(10.0, (line.substring(60,61) - '0'));
                    _setNum     =                 Number(line.substring(64,68) );

                    // Line 2
                    line        = parts.shift();

                    _incl       =           Number(line.substring( 8,16) );
                    _raan       =           Number(line.substring(17,25) );
                    _eccn       = 1.0e-07 * Number(line.substring(26,33) );
                    _argPer     =           Number(line.substring(34,42) );
                    _meanAn     =           Number(line.substring(43,51) );
                    _meanMo     =           Number(line.substring(52,63) );
                    _orbitNum   =           Number(line.substring(63,68) );
                }

                this.loadTLE = _loadTLE;

                if (angular.isDefined(tleString)) {
                    _loadTLE(tleString);
                }
            }

            /**
             *
             * @type {string}
             */
            TwoLineElement.prototype['class'] = 'TwoLineElement';

            // Public API here
            return {
                get: function (tleString) {
                    return new TwoLineElement(tleString);
                }
            };
        }
    ])
;

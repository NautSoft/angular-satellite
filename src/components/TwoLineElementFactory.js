'use strict';

/**
 *
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
             * @param {string} tle [tle = '']
             *
             * @description
             * Parsed Two Line Element object.
             * @see http://www.celestrak.com/NORAD/documentation/tle-fmt.asp for
             * an explanation of what a Two Line Element is.
             *
             * @constructor
             */
            function TwoLineElement(tle) {

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
                 * @returns {string}
                 * @const
                 */
                this.getCommonName = function() {
                    return _name;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getCatalogNumber = function() {
                    return _catNum;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getSetNumber = function() {
                    return _setNum;
                };

                /**
                 * @returns {string}
                 * @const
                 */
                this.getDesignator = function() {
                    return _designator;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getYear = function() {
                    return _year;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getReferanceEpoch = function() {
                    return _refEpoch;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getInclination = function() {
                    return _incl;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getRightAscensionOfAscendingNode = function() {
                    return _raan;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getEccentricity = function() {
                    return _eccn;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getArgumentOfPerigee = function() {
                    return _argPer;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getMeanAnomaly = function() {
                    return _meanAn;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getMeanMotion = function() {
                    return _meanMo;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getDrag = function() {
                    return _drag;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getBahnLatitude = function() {
                    return _ndDot6;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getBStar = function() {
                    return _bStar;
                };

                /**
                 * @returns {number}
                 * @const
                 */
                this.getOrbitNumber = function() {
                    return _orbitNum;
                };

                /**
                 * @param {string} tle - Two Line Element String
                 * @throws tle must be a string
                 * @private
                 */
                function _load(tle) {
                    if (!angular.isString(tle)) {
                        throw 'TwoLineElement: tle must be a string or null';
                    }

                    var parts   = tle.split('\n'),
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

                this.load = _load;

                if (angular.isDefined(tle)) {
                    _load(tle);
                }
            }

            /**
             * @param {string} tle
             * @const
             */
            TwoLineElement.prototype.load = function (tle) {};

            /**
             * @type {string}
             * @const
             */
            TwoLineElement.prototype['class'] = 'TwoLineElement';

            // Public API here
            return {
                get: function (tle) {
                    return new TwoLineElement(tle);
                }
            };
        }
    ])
;

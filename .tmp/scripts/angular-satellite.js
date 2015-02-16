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
//TODO: add ngdoc comments
angular.module('angular-satellite')
    .constant('ellipsoid', {
        /**
         * @example:
         * ellipsoid name: {
         *     year: published year (Gregorian Calendar),
         *     radius: {
         *         equatorial: radius in meters around equator
         *         polar: radius in meters around poles
         *     },
         *     inverseFlattening: flattening factor
         * }
         */
        WGS84: {
            year: 1984,
            radius: {
                equatorial: 6378137,
                polar: 6356752.3142
            },
            inverseFlattening: 298.257223563
        },
        Maupertuis: {
            year: 1738,
            radius: {
                equatorial: 6397300,
                polar: 6363806.283
            },
            inverseFlattening: 191
        },

        Plessis: {
            year: 1817,
            radius: {
                equatorial: 6376523.0,
                polar: 6355862.9333
            },
            inverseFlattening: 308.64
        },

        Everest: {
            year: 1830,
            radius: {
                equatorial: 6377299.365,
                polar: 6356098.359
            },
            inverseFlattening: 300.80172554
        }


// TODO: finish converting the historical ellipsoid definitions to objects
//Everest 1830 Modified (1967)	6,377,304.063	6,356,103.0390	300.8017	West Malaysia & Singapore
//Everest 1830 (1967 Definition)	6,377,298.556	6,356,097.550	300.8017	Brunei & East Malaysia
//Airy (1830)	6,377,563.396	6,356,256.909	299.3249646	Britain
//Bessel (1841)	6,377,397.155	6,356,078.963	299.1528128	Europe, Japan
//Clarke (1866)	6,378,206.4	6,356,583.8	294.9786982	North America
//Clarke (1878)	6,378,190	6,356,456	293.4659980	North America
//Clarke (1880)	6,378,249.145	6,356,514.870	293.465	France, Africa
//Helmert (1906)	6,378,200	6,356,818.17	298.3
//Hayford (1910)	6,378,388	6,356,911.946	297	USA
//International (1924)	6,378,388	6,356,911.946	297	Europe
//Krassovsky (1940)	6,378,245	6,356,863.019	298.3	USSR, Russia, Romania
//WGS66 (1966)	6,378,145	6,356,759.769	298.25	USA/DoD
//Australian National (1966)	6,378,160	6,356,774.719	298.25	Australia
//New International (1967)	6,378,157.5	6,356,772.2	298.24961539
//GRS-67 (1967)	6,378,160	6,356,774.516	298.247167427
//South American (1969)	6,378,160	6,356,774.719	298.25	South America
//WGS-72 (1972)	6,378,135	6,356,750.52	298.26	USA/DoD
//GRS-80 (1979)	6,378,137	6,356,752.3141	298.257222101	Global ITRS[2]
//IERS (1989)	6,378,136	6,356,751.302	298.257
//IERS (2003)[3]	6,378,136.6	6,356,751.9	298.25642
    });

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
    .factory('nsGeodeticFactory', ['$log',
        function ($log) {

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
                var _ellipsoid = 1;
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

            Geodetic.prototype.commonName = '';
            Geodetic.prototype.lon = null;


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

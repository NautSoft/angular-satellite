'use strict';

/**
 *
 * @ngdoc service
 * @name angular-satellite.nsTwoLineElementFactory
 * @description
 * Component Factory for use in nsSatellite.
 */
angular.module('angular-satellite.twoLineElement', [])
    .factory('nsTwoLineElementFactory', ['NS_ORBIT_TYPE',
        function (NS_ORBIT_TYPE) {

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
                var self = this;

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
                 * @private
                 */
                this.load = function (tle) {
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
                };

                /**
                 *
                 * @returns {{epoch: number, xndt2o: number, xndd6o: number, bstar: number,
                 *           xincl: number, xnodeo: number, eo: number, omegao: number,
                 *           xmo: number, xno: number, ephemeris: (NEAR_EARTH|DEEP_SPACE)}}
                 * @notes:
                 * Selects the appropriate ephemeris type to be used for predictions
                 * according to the data in the TLE It also processes values in the
                 * tle set so that they are appropriate for the sgp4/sdp4 routines
                 */
                this.selectEphemeris = function () {
                    var satData = {
                        epoch: 0,
                        xndt2o: 0,
                        xndd6o: 0,
                        bstar: 0,
                        xincl: 0,
                        xnodeo: 0,
                        eo: 0,
                        omegao: 0,
                        xmo: 0,
                        xno: 0,
                        ephemeris: NS_ORBIT_TYPE.NEAR_EARTH
                    };

                    var ao, xnodp, dd1, dd2, delo, temp, a1, del1, r1;

                    // Pre-process tle set
                    satData.xnodeo = NSMath.toRadians(this.getRightAscensionOfAscendingNode());
                    satData.omegao = NSMath.toRadians(this.getArgumentOfPerigee());
                    satData.xmo    = NSMath.toRadians(this.getMeanAnomaly());
                    satData.xincl  = NSMath.toRadians(this.getInclination());
                    temp = NSMath.PI_.X2 / NSMath.TIME.MIN_PER_DAY / NSMath.TIME.MIN_PER_DAY;

                    satData.xno     = NSMath.getMeanMotion() * temp * NSMath.TIME.MIN_PER_DAY;
                    satData.xndt2o  = this.getDrag() * temp;
                    satData.xndd6o  = this.getBahnLatitude() * temp / NSMath.TIME.MIN_PER_DAY;
                    satData.bstar   = this.getBStar() / NSMath.AE;

                    // Period > 225 minutes is deep space
                    dd1     = (NSMath.EARTH.XKE / satData.xno);
                    dd2     = NSMath.TWO_THIRDS;
                    a1      = Math.pow(dd1, dd2);
                    r1      = Math.cos(satData.xincl);
                    dd1     = 1.0 - this.getEccentricity() * this.getEccentricity();
                    temp    = NSMath.CK2 * 1.5 * (r1 * r1 * 3.0 - 1.0) / Math.pow(dd1, 1.5);
                    del1    = temp / (a1 * a1);
                    ao      = a1 * (1.0 - del1 * (NSMath.TWO_THIRDS * 0.5 + del1 * (del1 * 1.654320987654321 + 1.0) ) );
                    delo    = temp / (ao * ao);
                    xnodp   = satData.xno / (delo + 1.0);

                    // Select a deep-space/near-earth ephemeris
                    satData.ephemeris =
                        (NSMath.PI_.X2 / xnodp / NSMath.TIME.MIN_PER_DAY) < 0.15625
                        ? NS_ORBIT_TYPE.NEAR_EARTH : NS_ORBIT_TYPE.DEEP_SPACE;

                    return satData;
                };

                // Initialize
                if (tle) {
                    self.load(tle);
                }
            }

            /**
             * @type {string}
             * @const
             */
            TwoLineElement.prototype['class'] = 'TwoLineElement';

            // Public API here
            return {
                $get: function (tle) {
                    return new TwoLineElement(tle);
                }
            };
        }
    ])
;

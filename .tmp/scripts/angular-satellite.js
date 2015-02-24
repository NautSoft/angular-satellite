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
//TODO: add ngdoc comments
angular.module('angular-satellite')
    .constant('NS_ORBIT_TYPE', {
        DEEP_SPACE: 'nsSatelliteDeepSpaceOrbit',
        NEAR_EARTH: 'nsSatelliteNearEarthOrbit'
    })

    .constant('NS_ELLIPSOIDS', {

    /**
     * @name nsEllipsoid
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
        inverseFlattening: 298.257223563,
        'class': 'nsEllipsoid'
    },

    Maupertuis: {
        year: 1738,
        radius: {
            equatorial: 6397300,
            polar: 6363806.283
        },
        inverseFlattening: 191,
        'class': 'nsEllipsoid'
    },

    Plessis: {
        year: 1817,
        radius: {
            equatorial: 6376523.0,
            polar: 6355862.9333
        },
        inverseFlattening: 308.64,
        'class': 'nsEllipsoid'
    },

    Everest: {
        year: 1830,
        radius: {
            equatorial: 6377299.365,
            polar: 6356098.359
        },
        inverseFlattening: 300.80172554,
        'class': 'nsEllipsoid'
    }
})

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
;

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

'use strict';

/**
 * Math functions.
 *
 * @namespace
 * @alias NSMath
 */
var NSMath = {
    EPSILON: {
        /**
         * 0.1
         * @type {number}
         * @constant
         */
        _1: 1.0e-1,

        /**
         * 0.01
         * @type {number}
         * @constant
         */
        _2: 1.0e-2,

        /**
         * 0.001
         * @type {number}
         * @constant
         */
        _3: 1.0e-3,

        /**
         * 0.0001
         * @type {number}
         * @constant
         */
        _4: 1.0e-4,

        /**
         * 0.00001
         * @type {number}
         * @constant
         */
        _5: 1.0e-5,

        /**
         * 0.000001
         * @type {number}
         * @constant
         */
        _6: 1.0e-6,

        /**
         * 0.0000001
         * @type {number}
         * @constant
         */
        _7: 1.0e-7,

        /**
         * 0.00000001
         * @type {number}
         * @constant
         */
        _8: 1.0e-8,

        /**
         * 0.000000001
         * @type {number}
         * @constant
         */
        _9: 1.0e-9,

        /**
         * 0.000000001
         * @type {number}
         * @constant
         */
        _10: 1.0e-10
    },

    EARTH: {
        /**
         * μ = GM = 3.986004418e14
         * @type {number}
         * @constant
         */
        MU: 3.986004418e14,

        /**
         * 1.00273790934
         * Earth rotations/sidereal day
         * @type {number}
         * @constant
         */
        OMEGA_E: 1.00273790934,

        /**
         * 1.0122292801892716288
         * SGP4 density
         * @type {number}
         * @constant
         */
        SPG4_DENSITY: 1.0122292801892716288,

        /**
         * 3.35281066474748e-3
         * Flattening Factor
         * @type {number}
         * @constant
         */
        SPG4_FLATTENING: 3.35281066474748e-3,

        /**
         * 0.07436691613317
         * 60.0 / sqrt(RADIUSEARTHKM^3/MU)
         * @type {number}
         * @constant
         */
        XKE: 7.436691613317e-2,

        /**
         * 13.44683969695931
         * sqrt(RADIUSEARTHKM^3/MU) / 60.0
         * @type {number}
         * @constant
         */
        TUMIN: 13.44683969695931,

        /**
         * 0.001082616
         * The second gravitational zonal harmonic of the Earth
         * @type {number}
         * @constant
         */
        J2:  1.082616e-3,

        /**
         * -0.00000253881
         * The third gravitational zonal harmonic of the Earth
         * @type {number}
         * @constant
         */
        J3: -2.53881e-6,

        /**
         * -0.00000165597
         * The fourth gravitational zonal harmonic of the Earth
         * @type {number}
         * @constant
         */
        J4: -1.65597e-6,

        /**
         * -2.34506972e-3
         * J3 / J2
         * @type {number}
         * @constant
         */
        J3_OVER_J2: -2.34506972e-3
    },

    LUNAR: {
        /**
         * 1737400.0
         * @type {number}
         * @constant
         */
        RADIUS: 1.737400e6
    },

    /**
     * 3.14159265358979323846
     * The one and only PI
     * @type {number}
     * @constant
     */
    PI: Math.PI,

    PI_: {
        /**
         * 1.5707963267948966192
         * @type {number}
         * @constant
         */
        OVER_TWO: Math.PI / 2,

        /**
         * 6.2831853071795864769
         * @type {number}
         * @constant
         */
        X2: 2 * Math.PI,

        /**
         * 4.7123889803846898577
         * @type {number}
         * @constant
         */
        X3_OVER_TWO: (3 * Math.PI) / 2
    },

    SOLAR: {
        /**
         *
         * @type {number}
         * @constant
         */
        RADIUS: 6.955e8
    },

    TIME: {
        /**
         *
         * @type {number}
         * @constant
         */
        MIN_PER_DAY: 1440,

        /**
         *
         * @type {number}
         * @constant
         */
        SEC_PER_DAY: 86400
    }
};

/**
 * 3.333333e-1 = 1/3
 * @type {number}
 * @constant
 */
NSMath.TWO_THIRDS = 1 / 3;

/**
 * 6.666666e-1 = 2/3
 * @type {number}
 * @constant
 */
NSMath.TWO_THIRDS = 2 / 3;

/**
 * 1.0
 * @type {number}
 * @constant
 */
NSMath.AE = 1.0;

/**
 * 1.49597870691e8
 * Astronomical unit - km (IAU 76)
 * @type {number}
 * @constant
 */
NSMath.AU = 1.49597870691e8;

/**
 * 5.413079e-4
 * @type {number}
 * @constant
 */
NSMath.CK2 = 5.413079e-4;

/**
 * 6.2098875E-7
 * @type {number}
 * @constant
 */
NSMath.CK4 = 6.2098875E-7;

/**
 * 1.8802791590152706439e-9
 * (( 120.0 - 78.0) / RADIUSEARTHKM )^4
 * @type {number}
 * @constant
 */
NSMath.QZMS2T = 1.8802791590152706439e-9;

/**
 * 7.292115e-5
 * @type {number}
 * @constant
 */
NSMath.MFACTOR = 7.292115e-5;
'use strict';

/**
 * @ngdoc service
 * @name angular-satellite.nsSatelliteFactory
 * @description
 * # SatelliteService
 * Component factory for use in the nsSatelliteService
 */
angular.module('angular-satellite.satellite')
    .constant('LOCATION_PROCESSING_FLAGS', {
        ALL_FLAGS:                    -1,
        SGP_INITIALIZED_FLAG:   0x000001,	/* not used */
        SGP4_INITIALIZED_FLAG:  0x000002,
        SDP4_INITIALIZED_FLAG:  0x000004,
        SGP8_INITIALIZED_FLAG:  0x000008,	/* not used */
        SDP8_INITIALIZED_FLAG:  0x000010,	/* not used */
        SIMPLE_FLAG:       	    0x000020,
        DEEP_SPACE_EPHEM_FLAG:  0x000040,
        LUNAR_TERMS_DONE_FLAG:  0x000080,
        NEW_EPHEMERIS_FLAG:     0x000100,	/* not used */
        DO_LOOP_FLAG:           0x000200,
        RESONANCE_FLAG:         0x000400,
        SYNCHRONOUS_FLAG:       0x000800,
        EPOCH_RESTART_FLAG:     0x001000,
        VISIBLE_FLAG:           0x002000,
        SAT_ECLIPSED_FLAG:      0x004000
    })
    .factory('nsSatelliteFactory',[
        '$log', 'nsTwoLineElementFactory', 'nsGeodeticFactory', 'ApplicationTLEService',
        'PREDICT_APP_FLAGS', 'NS_MATH_CONSTANTS',
        function ($log, TwoLineElementService, GeodeticService, ApplicationTLEService,
                  PREDICT_APP_FLAGS, NS_MATH_CONSTANTS) {

            var _flags = 0;

            /**
             *
             * @param date
             * @returns {number}
             * @private
             */
            function _makeDaynum(date) {
                // of days since 31Dec79 00:00:00 UTC (daynum 0)
                var seconds  = (date || new Date()).getTime() / 1000,
                    uSeconds = seconds % 1;

                return ((seconds - uSeconds) / 86400.0) - 3651.0;
            }

            /**
             *
             * @param epoch
             * @returns {number}
             * @private
             */
            function _julianDateOfEpoch(epoch) {
                // The function Julian_Date_of_Epoch returns the Julian Date of
                // an epoch specified in the format used in the NORAD two-line
                // element sets. It has been modified to support dates beyond
                // the year 1999 assuming that two-digit years in the range 00-56
                // correspond to 2000-2056. Until the two-line element set format
                // is changed, it is only valid for dates through 2056 December 31.

                // Valid 1957 through 2056

                var year, day;

                day = (epoch*1E-3%1)*1E3;
                year = epoch*1E-3 - (epoch*1E-3%1);

                if (year<57) {
                    year=year+2000;
                } else {
                    year=year+1900;
                }
                return _julianDateOfYear( year ) + day;
            }

            /**
             *
             * @param year
             * @returns {*}
             * @private
             */
            function _julianDateOfYear(year) {
                // The function Julian_Date_of_Year calculates the Julian Date
                // of Day 0.0 of {year}. This function is used to calculate the
                // Julian Date of any date by using Julian_Date_of_Year, DOY,
                // and Fraction_of_Day.

                // Astronomical Formulae for Calculators, Jean Meeus,
                // pages 23-25. Calculate Julian Date of 0.0 Jan year

                //rounding is used for forcing integer values like the C code
                var A, B, i;
                var jdoy;

                year = year - 1;
                i =  Math.round( (year/100)-0.5);
                A =  i;
                i =  Math.round( (A/4)-0.5);
                B =  2 - A + i;
                i =  Math.round( (365.25*year)-0.5);
                i += Math.round( (30.6001*14) -0.5);
                jdoy = i + 1720994.5 + B;
                return jdoy;
            }

            /**
             *
             * @param jd
             * @returns {number}
             * @private
             */
            function _thetaGJD(jd) {
                // Reference:  The 1992 Astronomical Almanac, page B6.
                var UT, TU, GMST;

                UT = (jd + 0.5) % 1;
                jd = jd - UT;
                TU = (jd - 2451545.0) / 36525;
                GMST = 24110.54841 + TU * (8640184.812866 + TU * (0.093104 - TU * 6.2E-6) );
                GMST = (GMST + secondsPerDay * omegaE * UT) % secondsPerDay;
                return (_math.TWO_PI * GMST / secondsPerDay);
            }

            /**
             *
             * @param x {number}
             * @returns {number}
             * @private
             */
            function _fMod2p(x) {
                // Returns mod 2PI of argument
                var value = x,
                    i = Math.round( (value/_math.TWO_PI) - 0.5);

                value -= (i * _math.TWO_PI);

                return value < 0.0 ? value += _math.TWO_PI : value;
            }

            /**
             *
             * @param action
             * @param flag
             * @private
             */
            function _callbackFlag(action, flag) {
                switch (action) {
                    case 'set': {
                        _setFlag(flag);
                        break;
                    }
                    case 'clear': {
                        _clearFlag(flag);
                    }
                }
            }

            /**
             *
             * @param flag {PREDICT_APP_FLAGS}
             * @returns {boolean}
             * @private
             */
            function _isFlagSet(flag){
                return !!( _flags & flag );
            }

            /**
             *
             * @param flag {}
             * @returns {boolean}
             */
            function _isFlagClear(flag) {
                return !!( ~_flags & flag);
            }

            /**
             *
             * @param flag {}
             * @private
             */
            function _setFlag(flag) {
                _flags |= flag;
            }

            /**
             *
             * @param flag {PREDICT_APP_FLAGS}
             * @private
             */
            function _clearFlag(flag) {
                _flags &= ~flag;
            }

            function Satellite() {
                this.tle =      TwoLineElementService.get();
                this.appTLE =   ApplicationTLEService.get();
                this.geodetic = GeodeticService.get();

                this.velocity =            new _ces.Cartesian4();
                this.position =            new _ces.Cartesian4();
                this.observationPosition = new _ces.Cartesian4();

                this.jul_utc =   0;
                this.jul_epoch = 0;
                this.daynum =    0;
                this.tsince =    0;
                this.age =       0;

                this.ephem  = '';
                this.io_lat = 'N';
                this.io_lon = 'E';

                this.currentLocation = null;
            }

            /**
             *
             * @param atTime {Date|null}
             * @returns {*}
             */
            Satellite.prototype.locate = function (atTime) {
                //$log.debug('Satellite locate : ' + atTime);
                this.daynum = _makeDaynum(angular.isDate(atTime) ? atTime : new Date() );

                this._preCalc();
                this._calc();
                return this.geodetic;
            };

            /**
             *
             * @param startTime
             * @param endTime
             * @param incrementSeconds
             * @returns {Array} of Geodetics
             */
            Satellite.prototype.locateRange = function (startTime, endTime, incrementSeconds) {
                $log.debug('Satellite locate range: ' + startTime + ' -> ' + endTime);

                var end = endTime.getTime();
                var increment = incrementSeconds * 1000;//convert to microseconds
                var container = [];

                for (var current = startTime.getTime(); current <= end; current += increment) {
                    container.push( this.locate(new Date(current)) );
                }

                return container;
            };

            /**
             *
             * @private
             */
            Satellite.prototype._preCalc = function () {
                // This function copies TLE data from PREDICT's sat structure
                // to the SGP4/SDP4's single dimensioned tle structure, and
                // prepares the tracking code for the update.

                this.appTLE.name     = this.tle.name;
                this.appTLE.idesg    = this.tle.designator;
                this.appTLE.catnr    = this.tle.catnum;
                this.appTLE.epoch    = (1000.0 * this.tle.year) + this.tle.refepoch;
                this.appTLE.xndt2o   = this.tle.drag;
                this.appTLE.xndd6o   = this.tle.nddot6;
                this.appTLE.bstar    = this.tle.bstar;
                this.appTLE.xincl    = this.tle.incl;
                this.appTLE.xnodeo   = this.tle.raan;
                this.appTLE.eo       = this.tle.eccn;
                this.appTLE.omegao   = this.tle.argper;
                this.appTLE.xmo      = this.tle.meanan;
                this.appTLE.xno      = this.tle.meanmo;
                this.appTLE.revnum   = this.tle.orbitnum;

                _clearFlag(PREDICT_APP_FLAGS.ALL_FLAGS);

                // Select ephemeris type.  This function will set or clear the
                // DEEP_SPACE_EPHEM_FLAG depending on the TLE parameters of the
                // satellite.  It will also pre-process tle members for the
                // ephemeris functions SGP4 or SDP4, so this function must
                // be called each time a new tle set is used.
                this.appTLE.selectEphemeris(_callbackFlag);
            };

            /**
             *
             * @private
             */
            Satellite.prototype._calc = function () {
                this.jul_utc = this.daynum + 2444238.5;
                this.geodetic = GeodeticService.get();

                // Convert satellite's epoch time to Julian
                // and calculate time since epoch in minutes

                this.jul_epoch = _julianDateOfEpoch(this.appTLE.epoch);
                this.tsince = (this.jul_utc - this.jul_epoch) * minutesPerDay;
                this.age = this.jul_utc - this.jul_epoch;

                // Copy the ephemeris type in use to ephem string.
                this.ephem = _isFlagSet(PREDICT_APP_FLAGS.DEEP_SPACE_EPHEM_FLAG) ? 'SDP4' : 'SGP4';
                // Call NORAD routines according to deep-space flag.

                this[ _isFlagSet(PREDICT_APP_FLAGS.DEEP_SPACE_EPHEM_FLAG) ? '_sdp4' : '_sgp4' ]();
                // Scale position and velocity vectors to km and km/sec

                // Converts the satellite's position and velocity
                // vectors from normalized values to km and km/sec
                _ces.Cartesian4.multiplyByScalar(this.position, earthsRadiusKM, this.position);
                _ces.Cartesian4.multiplyByScalar(this.velocity, earthsRadiusKM * minutesPerDay / secondsPerDay, this.velocity);

                // Calculate satellite Lat North, Lon East and Alt.
                this._calculateLatLonAlt();//jul_utc, &pos, &sat_geodetic);

                //convert to degrees from radians
                this.geodetic.lat   = _math.toDegrees(this.geodetic.lat);
                this.geodetic.lon   = _math.toDegrees(this.geodetic.lon);
                this.geodetic.theta = _ces.Cartesian4.magnitude(this.velocity);

                _clearFlag(PREDICT_APP_FLAGS.ALL_FLAGS);
            };

            /**
             *
             * @private
             */
            Satellite.prototype._sgp4 = function () {
                // This function is used to calculate the position and velocity
                // of near-earth (period < 225 minutes) satellites. tsince is
                // time since epoch in minutes, tle is a pointer to a tle_t
                // structure with Keplerian orbital elements and pos and vel
                // are vector_t structures returning ECI satellite position and
                // velocity. Use Convert_Sat_State() to convert to km and km/s.

                var aodp, aycof, c1, c4, c5, cosio, d2, d3, d4, delmo,
                    omgcof, eta, omgdot, sinio, xnodp, sinmo, t2cof, t3cof, t4cof,
                    t5cof, x1mth2, x3thm1, x7thm1, xmcof, xmdot, xnodcf, xnodot, xlcof;

                var cosuk, sinuk, rfdotk, vx, vy, vz, ux, uy, uz, xmy, xmx, cosnok,
                    sinnok, cosik, sinik, rdotk, xinck, xnodek, uk, rk, cos2u, sin2u,
                    u, sinu, cosu, betal, rfdot, rdot, r, pl, elsq, esine, ecose, epw,
                    cosepw, x1m5th, xhdot1, tfour, sinepw, capu, ayn, xlt, aynl, xll,
                    axn, xn, beta, xl, e, a, tcube, delm, delomg, templ, tempe, tempa,
                    xnode, tsq, xmp, omega, xnoddf, omgadf, xmdf, a1, a3ovk2, ao,
                    betao, betao2, c1sq, c2, c3, coef, coef1, del1, delo, eeta, eosq,
                    etasq, perigee, pinvsq, psisq, qoms24, s4, temp, temp1, temp2,
                    temp3, temp4, temp5, temp6, theta2, theta4, tsi;

                var i;

                // Initialization

                if (_isFlagClear(PREDICT_APP_FLAGS.SGP4_INITIALIZED_FLAG)) {
                    _setFlag(PREDICT_APP_FLAGS.SGP4_INITIALIZED_FLAG);

                    // Recover original mean motion (xnodp) and
                    // semi-major axis (aodp) from input elements.

                    a1 = Math.pow(xke / this.appTLE.xno, twoThirds);
                    cosio = Math.cos(this.appTLE.xincl);
                    theta2 = cosio * cosio;
                    x3thm1 = 3 * theta2 - 1.0;
                    eosq = this.appTLE.eo * this.appTLE.eo;
                    betao2 = 1.0 - eosq;
                    betao = Math.sqrt(betao2);
                    del1 = 1.5 * ck2 * x3thm1 / (a1 * a1 * betao * betao2);
                    ao = a1 * (1.0 - del1 * (0.5 * twoThirds + del1 * (1.0 + 134.0 / 81.0 * del1)));
                    delo = 1.5 * ck2 * x3thm1 / (ao * ao * betao * betao2);
                    xnodp = this.appTLE.xno / (1.0 + delo);
                    aodp = ao / (1.0 - delo);

                    // For perigee less than 220 kilometers, the "simple"
                    // flag is set and the equations are truncated to linear
                    // variation in sqrt a and quadratic variation in mean
                    // anomaly.  Also, the c3 term, the delta omega term, and
                    // the delta m term are dropped.

                    if ((aodp * (1 - this.appTLE.eo) / ae) < (220 / earthsRadiusKM + ae)) {
                        _setFlag(PREDICT_APP_FLAGS.SIMPLE_FLAG);
                    } else {
                        _clearFlag(PREDICT_APP_FLAGS.SIMPLE_FLAG);
                    }
                    // For perigees below 156 km, the
                    // values of s and qoms2t are altered.

                    s4 = s;
                    qoms24 = qoms2t;
                    perigee = (aodp * (1 - this.appTLE.eo) - ae) * earthsRadiusKM;

                    if (perigee < 156.0) {
                        if (perigee <= 98.0) {
                            s4 = 20;
                        } else {
                            s4 = perigee - 78.0;
                        }
                        qoms24 = Math.pow((120 - s4) * ae / earthsRadiusKM, 4);
                        s4 = s4 / earthsRadiusKM + ae;
                    }

                    pinvsq = 1 / (aodp * aodp * betao2 * betao2);
                    tsi = 1 / (aodp - s4);
                    eta = aodp * this.appTLE.eo * tsi;
                    etasq = eta * eta;
                    eeta = this.appTLE.eo * eta;
                    psisq = Math.abs(1 - etasq);
                    coef = qoms24 * Math.pow(tsi, 4);
                    coef1 = coef / Math.pow(psisq, 3.5);
                    c2 = coef1 * xnodp * (aodp * (1 + 1.5 * etasq + eeta * (4 + etasq)) + 0.75 * ck2 * tsi / psisq * x3thm1 * (8 + 3 * etasq * (8 + etasq)));
                    c1 = this.appTLE.bstar * c2;
                    sinio = Math.sin(this.appTLE.xincl);
                    a3ovk2 = -xj3 / ck2 * Math.pow(ae, 3);
                    c3 = coef * tsi * a3ovk2 * xnodp * ae * sinio / this.appTLE.eo;
                    x1mth2 = 1 - theta2;

                    c4 = 2 * xnodp * coef1 * aodp * betao2 * (eta * (2 + 0.5 * etasq) + this.appTLE.eo * (0.5 + 2 * etasq) - 2 * ck2 * tsi / (aodp * psisq) * (-3 * x3thm1 * (1 - 2 * eeta + etasq * (1.5 - 0.5 * eeta)) + 0.75 * x1mth2 * (2 * etasq - eeta * (1 + etasq)) * Math.cos(2 * this.appTLE.omegao)));
                    c5 = 2 * coef1 * aodp * betao2 * (1 + 2.75 * (etasq + eeta) + eeta * etasq);

                    theta4 = theta2 * theta2;
                    temp1 = 3 * ck2 * pinvsq * xnodp;
                    temp2 = temp1 * ck2 * pinvsq;
                    temp3 = 1.25 * ck4 * pinvsq * pinvsq * xnodp;
                    xmdot = xnodp + 0.5 * temp1 * betao * x3thm1 + 0.0625 * temp2 * betao * (13 - 78 * theta2 + 137 * theta4);
                    x1m5th = 1 - 5 * theta2;
                    omgdot = -0.5 * temp1 * x1m5th + 0.0625 * temp2 * (7 - 114 * theta2 + 395 * theta4) + temp3 * (3 - 36 * theta2 + 49 * theta4);
                    xhdot1 = -temp1 * cosio;
                    xnodot = xhdot1 + (0.5 * temp2 * (4 - 19 * theta2) + 2 * temp3 * (3 - 7 * theta2)) * cosio;
                    omgcof = this.appTLE.bstar * c3 * Math.cos(this.appTLE.omegao);
                    xmcof = -twoThirds * coef * this.appTLE.bstar * ae / eeta;
                    xnodcf = 3.5 * betao2 * xhdot1 * c1;
                    t2cof = 1.5 * c1;
                    xlcof = 0.125 * a3ovk2 * sinio * (3 + 5 * cosio) / (1 + cosio);
                    aycof = 0.25 * a3ovk2 * sinio;
                    delmo = Math.pow(1 + eta * Math.cos(this.appTLE.xmo), 3);
                    sinmo = Math.sin(this.appTLE.xmo);
                    x7thm1 = 7 * theta2 - 1;

                    if (_isFlagClear(PREDICT_APP_FLAGS.SIMPLE_FLAG)) {
                        c1sq = c1 * c1;
                        d2 = 4 * aodp * tsi * c1sq;
                        temp = d2 * tsi * c1 / 3;
                        d3 = (17 * aodp + s4) * temp;
                        d4 = 0.5 * temp * aodp * tsi * (221 * aodp + 31 * s4) * c1;
                        t3cof = d2 + 2 * c1sq;
                        t4cof = 0.25 * (3 * d3 + c1 * (12 * d2 + 10 * c1sq));
                        t5cof = 0.2 * (3 * d4 + 12 * c1 * d3 + 6 * d2 * d2 + 15 * c1sq * (2 * d2 + c1sq));
                    }
                }

                /* Update for secular gravity and atmospheric drag. */
                xmdf = this.appTLE.xmo + xmdot * this.tsince;
                omgadf = this.appTLE.omegao + omgdot * this.tsince;
                xnoddf = this.appTLE.xnodeo + xnodot * this.tsince;
                omega = omgadf;
                xmp = xmdf;
                tsq = this.tsince * this.tsince;
                xnode = xnoddf + xnodcf * tsq;
                tempa = 1 - c1 * this.tsince;
                tempe = this.appTLE.bstar * c4 * this.tsince;
                templ = t2cof * tsq;

                if (_isFlagClear(PREDICT_APP_FLAGS.SIMPLE_FLAG)) {
                    delomg = omgcof * this.tsince;
                    delm = xmcof * (Math.pow(1 + eta * Math.cos(xmdf), 3) - delmo);
                    temp = delomg + delm;
                    xmp = xmdf + temp;
                    omega = omgadf - temp;
                    tcube = tsq * this.tsince;
                    tfour = this.tsince * tcube;
                    tempa = tempa - d2 * tsq - d3 * tcube - d4 * tfour;
                    tempe = tempe + this.appTLE.bstar * c5 * (Math.sin(xmp) - sinmo);
                    templ = templ + t3cof * tcube + tfour * (t4cof + this.tsince * t5cof);
                }

                a = aodp * Math.pow(tempa, 2);
                e = this.appTLE.eo - tempe;
                xl = xmp + omega + xnode + xnodp * templ;
                beta = Math.sqrt(1 - e * e);
                xn = xke / Math.pow(a, 1.5);

                // Long period periodics
                axn = e * Math.cos(omega);
                temp = 1 / (a * beta * beta);
                xll = temp * xlcof * axn;
                aynl = temp * aycof;
                xlt = xl + xll;
                ayn = e * Math.sin(omega) + aynl;

                // Solve Kepler's Equation
                capu = _fMod2p(xlt - xnode);
                temp2 = capu;
                i = 0;

                do {
                    sinepw = Math.sin(temp2);
                    cosepw = Math.cos(temp2);
                    temp3 = axn * sinepw;
                    temp4 = ayn * cosepw;
                    temp5 = axn * cosepw;
                    temp6 = ayn * sinepw;
                    epw = (capu - temp4 + temp3 - temp2) / (1 - temp5 - temp6) + temp2;

                    if (Math.abs(epw - temp2) <= e6a) {
                        break;
                    }
                    temp2 = epw;

                } while (i++ < 10);

                // Short period preliminary quantities
                ecose = temp5 + temp6;
                esine = temp3 - temp4;
                elsq = axn * axn + ayn * ayn;
                temp = 1 - elsq;
                pl = a * temp;
                r = a * (1 - ecose);
                temp1 = 1 / r;
                rdot = xke * Math.sqrt(a) * esine * temp1;
                rfdot = xke * Math.sqrt(pl) * temp1;
                temp2 = a * temp1;
                betal = Math.sqrt(temp);
                temp3 = 1 / (1 + betal);
                cosu = temp2 * (cosepw - axn + ayn * esine * temp3);
                sinu = temp2 * (sinepw - ayn - axn * esine * temp3);
                u = _math.actan(sinu, cosu);
                sin2u = 2 * sinu * cosu;
                cos2u = 2 * cosu * cosu - 1;
                temp = 1 / pl;
                temp1 = ck2 * temp;
                temp2 = temp1 * temp;

                // Update for short periodic
                rk = r * (1 - 1.5 * temp2 * betal * x3thm1) + 0.5 * temp1 * x1mth2 * cos2u;
                uk = u - 0.25 * temp2 * x7thm1 * sin2u;
                xnodek = xnode + 1.5 * temp2 * cosio * sin2u;
                xinck = this.appTLE.xincl + 1.5 * temp2 * cosio * sinio * cos2u;
                rdotk = rdot - xn * temp1 * x1mth2 * sin2u;
                rfdotk = rfdot + xn * temp1 * (x1mth2 * cos2u + 1.5 * x3thm1);

                // Orientation vectors
                sinuk = Math.sin(uk);
                cosuk = Math.cos(uk);
                sinik = Math.sin(xinck);
                cosik = Math.cos(xinck);
                sinnok = Math.sin(xnodek);
                cosnok = Math.cos(xnodek);
                xmx = -sinnok * cosik;
                xmy = cosnok * cosik;
                ux = xmx * sinuk + cosnok * cosuk;
                uy = xmy * sinuk + sinnok * cosuk;
                uz = sinik * sinuk;
                vx = xmx * cosuk - cosnok * sinuk;
                vy = xmy * cosuk - sinnok * sinuk;
                vz = sinik * cosuk;

                /* Position and velocity */
                this.position.x = rk * ux;
                this.position.y = rk * uy;
                this.position.z = rk * uz;
                this.velocity.x = rdotk * ux + rfdotk * vx;
                this.velocity.y = rdotk * uy + rfdotk * vy;
                this.velocity.z = rdotk * uz + rfdotk * vz;
            };

            /**
             *
             * @private
             */
            Satellite.prototype._sdp4 = function () {
                $log.error('SDP4 functionality has not been converted for use in this application');
            };

            /**
             *
             * @private
             */
            Satellite.prototype._calculateLatLonAlt = function () {
                // Procedure Calculate_LatLonAlt will calculate the geodetic
                // position of an object given its ECI position pos and time.
                // It is intended to be used to determine the ground track of
                // a satellite.  The calculations  assume the earth to be an
                // oblate spheroid as defined in WGS '72.
                // Reference:  The 1992 Astronomical Almanac, page K12.

                var r, e2, phi, c, sp;

                this.geodetic.theta = _math.actan(this.position.y, this.position.x);
                this.geodetic.lon = _fMod2p(this.geodetic.theta - _thetaGJD(this.jul_utc) );

                r = Math.sqrt( (this.position.x * this.position.x) + (this.position.y*this.position.y));

                e2 = f * (2 - f);
                this.geodetic.lat = _math.actan(this.position.z, r);

                do {
                    phi = this.geodetic.lat;
                    sp = Math.sin(phi);
                    c = 1 / Math.sqrt(1 - e2 * (sp*sp));
                    this.geodetic.lat = _math.actan(this.position.z + earthsRadiusKM * c * e2 * sp, r);

                } while (Math.abs(this.geodetic.lat - phi) >= 1E-10);

                this.geodetic.alt = r / Math.cos(this.geodetic.lat) - earthsRadiusKM * c;

                if (this.geodetic.lat  > _math.PI_OVER_TWO) {
                    this.geodetic.lat -= _math.TWO_PI;
                }
            };

            /**
             * Four-quadrant arcTan function
             * @param sinX
             * @param cosX
             * @returns {number}
             */
            _math.actan = function(sinX, cosX) {
                if (cosX === 0.0) {
                    return (sinX > 0.0) ? _math.PI_OVER_TWO : _math.THREE_PI_OVER_TWO;
                }

                if (cosX > 0.0) {
                    return (sinX > 0.0) ? Math.atan(sinX / cosX) : this.TWO_PI + Math.atan(sinX / cosX);
                }

                return (this.PI + Math.atan(sinX / cosX));
            };

            // Public API
            return {
                get: function () {
                    return new Satellite();
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
    .factory('nsTwoLineElementFactory', ['NS_MATH_CONSTANTS',
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

            TwoLineElement.prototype.selectEphemeris = function () {
                // Selects the appropriate ephemeris type to be used //
                // for predictions according to the data in the TLE  //
                // It also processes values in the tle set so that   //
                // they are appropriate for the sgp4/sdp4 routines   //

                var ao, xnodp, dd1, dd2, delo, temp, a1, del1, r1;

                // Preprocess tle set
                this.xnodeo = Math.toRadians(this.xnodeo);
                this.omegao = _math.toRadians(this.omegao);
                this.xmo    = _math.toRadians(this.xmo);
                this.xincl  = _math.toRadians(this.xincl);

                temp = _math.TWO_PI / minutesPerDay / minutesPerDay;
                this.xno = this.xno * temp * minutesPerDay;
                this.xndt2o = this.xndt2o * temp;
                this.xndd6o = this.xndd6o * temp / minutesPerDay;
                this.bstar /= ae;

                // Period > 225 minutes is deep space
                dd1 = (xke / this.xno);
                dd2 = twoThirds;
                a1 = Math.pow(dd1, dd2);
                r1 = Math.cos(this.xincl);
                dd1 = (1.0 - this.eo * this.eo);
                temp = ck2 * 1.5 * (r1 * r1 * 3.0 - 1.0) / Math.pow(dd1, 1.5);
                del1 = temp / (a1 * a1);
                ao = a1 * (1.0 - del1 * (twoThirds * 0.5 + del1 * (del1 * 1.654320987654321 + 1.0) ) );
                delo = temp / (ao * ao);
                xnodp = this.xno / (delo + 1.0);

                // Select a deep-space/near-earth ephemeris
                if (angular.isFunction(flagCallback)) {
                    flagCallback(
                        _math.TWO_PI / xnodp / minutesPerDay >= 0.15625 ? 'set' : 'clear',
                        PREDICT_APP_FLAGS.DEEP_SPACE_EPHEM_FLAG
                    );
                }

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

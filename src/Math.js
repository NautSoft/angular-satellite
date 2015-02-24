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
         * @type {Number}
         * @constant
         */
        _1: 1.0e-1,

        /**
         * 0.01
         * @type {Number}
         * @constant
         */
        _2: 1.0e-2,

        /**
         * 0.001
         * @type {Number}
         * @constant
         */
        _3: 1.0e-3,

        /**
         * 0.0001
         * @type {Number}
         * @constant
         */
        _4: 1.0e-4,

        /**
         * 0.00001
         * @type {Number}
         * @constant
         */
        _5: 1.0e-5,

        /**
         * 0.000001
         * @type {Number}
         * @constant
         */
        _6: 1.0e-6,

        /**
         * 0.0000001
         * @type {Number}
         * @constant
         */
        _7: 1.0e-7,

        /**
         * 0.00000001
         * @type {Number}
         * @constant
         */
        _8: 1.0e-8,

        /**
         * 0.000000001
         * @type {Number}
         * @constant
         */
        _9: 1.0e-9,

        /**
         * 0.0000000001
         * @type {Number}
         * @constant
         */
        _10: 1.0e-10
    },

    EARTH: {
        /**
         * μ = GM = 3.986004418e14
         * @type {Number}
         * @constant
         */
        MU: 3.986004418e14,

        /**
         * 1.00273790934
         * Earth rotations/sidereal day
         * @type {Number}
         * @constant
         */
        OMEGA_E: 1.00273790934,

        /**
         * 1.0122292801892716288
         * SGP4 density
         * @type {Number}
         * @constant
         */
        SPG4_DENSITY: 1.0122292801892716288,

        /**
         * 3.35281066474748e-3
         * Flattening Factor
         * @type {Number}
         * @constant
         */
        SPG4_FLATTENING: 3.35281066474748e-3,

        /**
         * 0.07436691613317
         * 60.0 / sqrt(RADIUSEARTHKM^3/MU)
         * @type {Number}
         * @constant
         */
        XKE: 7.436691613317e-2,

        /**
         * 13.44683969695931
         * sqrt(RADIUSEARTHKM^3/MU) / 60.0
         * @type {Number}
         * @constant
         */
        TUMIN: 13.44683969695931,

        /**
         * 0.001082616
         * The second gravitational zonal harmonic of the Earth
         * @type {Number}
         * @constant
         */
        J2:  1.082616e-3,

        /**
         * -0.00000253881
         * The third gravitational zonal harmonic of the Earth
         * @type {Number}
         * @constant
         */
        J3: -2.53881e-6,

        /**
         * -0.00000165597
         * The fourth gravitational zonal harmonic of the Earth
         * @type {Number}
         * @constant
         */
        J4: -1.65597e-6,

        /**
         * -2.34506972e-3
         * J3 / J2
         * @type {Number}
         * @constant
         */
        J3_OVER_J2: -2.34506972e-3
    },

    LUNAR: {
        /**
         * 1737400.0
         * @type {Number}
         * @constant
         */
        RADIUS: 1.737400e6
    },

    /**
     * 3.14159265358979323846
     * The one and only PI
     * @type {Number}
     * @constant
     */
    PI: Math.PI,

    PI_: {
        /**
         * 1.5707963267948966192
         * @type {Number}
         * @constant
         */
        OVER_TWO: Math.PI / 2,

        /**
         * 6.2831853071795864769
         * @type {Number}
         * @constant
         */
        X2: 2 * Math.PI,

        /**
         * 4.7123889803846898577
         * @type {Number}
         * @constant
         */
        X3_OVER_TWO: (3 * Math.PI) / 2
    },

    SOLAR: {
        /**
         *
         * @type {Number}
         * @constant
         */
        RADIUS: 6.955e8
    },

    TIME: {
        /**
         * 1440
         * @type {Number}
         * @constant
         */
        MIN_PER_DAY: 1440,

        /**
         * 86400
         * @type {Number}
         * @constant
         */
        SEC_PER_DAY: 86400
    }
};

/**
 * 3.333333e-1 = 1/3
 * @type {Number}
 * @constant
 */
NSMath.TWO_THIRDS = 1 / 3;

/**
 * 6.666666e-1 = 2/3
 * @type {Number}
 * @constant
 */
NSMath.TWO_THIRDS = 2 / 3;

/**
 * 1.0
 * @type {Number}
 * @constant
 */
NSMath.AE = 1.0;

/**
 * 1.49597870691e8
 * Astronomical unit - km (IAU 76)
 * @type {Number}
 * @constant
 */
NSMath.AU = 1.49597870691e8;

/**
 * 5.413079e-4
 * @type {Number}
 * @constant
 */
NSMath.CK2 = 5.413079e-4;

/**
 * 6.2098875E-7
 * @type {Number}
 * @constant
 */
NSMath.CK4 = 6.2098875E-7;

/**
 * 1.8802791590152706439e-9
 * (( 120.0 - 78.0) / RADIUSEARTHKM )^4
 * @type {Number}
 * @constant
 */
NSMath.QZMS2T = 1.8802791590152706439e-9;

/**
 * 7.292115e-5
 * @type {Number}
 * @constant
 */
NSMath.MFACTOR = 7.292115e-5;

/**
 * Math.PI / 180.0 = 57.2957795
 * radians in a degree.
 * @type {Number}
 * @constant
 */
NSMath.RADIANS_PER_DEGREE = Math.PI / 180.0;

/**
 * 180.0 / Math.PI = 1.745329251994330e-2
 * degrees in a radian.
 * @type {Number}
 * @constant
 */
NSMath.DEGREES_PER_RADIAN = 180.0 / Math.PI;

/**
 * Converts degrees to radians.
 * @param {Number} degrees
 * @returns {Number} in radians.
 */
NSMath.toRadians = function(degrees) {
    if (!(degrees = parseInt(degrees)) ||
        isNaN(degrees)) {
        throw 'degrees is required.';
    }
    return degrees * NSMath.RADIANS_PER_DEGREE;
};

/**
 * Converts radians to degrees.
 * @param {Number} radians
 * @returns {Number} angle in degrees.
 */
NSMath.toDegrees = function(radians) {
    if (!(radians = parseInt(radians)) ||
        isNaN(radians)) {
        throw 'radians is required.';
    }

    return radians * NSMath.DEGREES_PER_RADIAN;
};
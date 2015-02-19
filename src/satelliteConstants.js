//TODO: add ngdoc comments
angular.module('angular-satellite')
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

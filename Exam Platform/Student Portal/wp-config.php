<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u344159190_gxK3g' );

/** Database username */
define( 'DB_USER', 'u344159190_X3UiS' );

/** Database password */
define( 'DB_PASSWORD', 'QMGIfKrzkj' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'n!,PrP)euWH.{#5T^GH5F]-=%(Rm~mOfh+qs<a+b.=lXlZ2XPwi98.+#1Sv-,.ut' );
define( 'SECURE_AUTH_KEY',   'yPV`-sb7l?>65t|Z`WPDdTd);N-_1]:HttWM]ULBn}yIAFYz/MvLVB$ta(2h~h8{' );
define( 'LOGGED_IN_KEY',     'xrjPf>V_nz*VtS2Vc9jFMA52j.1f*(UlbH~+8zYdp7>@by.(dpO<P}g{.JN4e>1%' );
define( 'NONCE_KEY',         'H{OTQ1Tez[PeTA!`9:RgmD5F~K+w$c+>LP@uK 5bBx?W>~ k_<N#N(My1G7r,^fx' );
define( 'AUTH_SALT',         'AC|FLgMo;uXZ~po=Y9jML*hT((PodT#~Y5RgoOz}l p|,;(/OgdVtaULJ#*ZXp)h' );
define( 'SECURE_AUTH_SALT',  't+TD6Lo[>TxN(NIzv1;]QY#2Ana|IN6d=2+@6GVSZE#LDKBK&hyXuf)UM.6F m=w' );
define( 'LOGGED_IN_SALT',    'LWmQ8R&`bUpP(0/iE:!yI4d^t.X>+R,BG:P&,3o`z3,63!lONbfi:%_7Nk%eH/ I' );
define( 'NONCE_SALT',        'K<jlbU+EjjmOl2-@4lg1j=#AoL}tHbe<Jk#XkkNDJjMhL ~` mSmXK>Vl#PA>EBC' );
define( 'WP_CACHE_KEY_SALT', 'l.9JbA?<@[uW@Pd9 Qg;7~=N|RaAkMep}n{$<0stV0zgjd.,8=hXSsv.R_0ai1?7' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'FS_METHOD', 'direct' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

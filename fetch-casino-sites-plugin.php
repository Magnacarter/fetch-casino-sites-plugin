<?php
/**
 * The plugin bootstrap file
 *
 * @link              https://github.com/Magnacarter/fetch-casino-sites-plugin
 * @since             1.0.0
 * @package           Raketech/fetch-sites
 *
 * @wordpress-plugin
 * Plugin Name:       Fetch Casino Sites
 * Plugin URI:        
 * Description:       Fetch casino sites from external API and display them on a specific post/page.
 * Version:           1.0.0
 * Author:            Adam Carter
 * Author URI:        https://github.com/Magnacarter/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       fetch-casino-sites-plugin
 * Domain Path:       /languages
 */
namespace Raketech\fetch_sites;
use Raketech\fetch_sites;

if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Cheatin&#8217?' );
}

$plugin_url = plugin_dir_url( __FILE__ );
define( 'RAKETECH_PLUGIN_URL', $plugin_url );
define( 'RAKETECH_PLUGIN_DIR', plugin_dir_path( __DIR__ ) );
define( 'RAKETECH_PLUGIN_VER', '1.0.0' );

/**
 * Class Init_Plugin
 */
class Init_Plugin {

	/**
	 * @var $instance
	 */
	private static $instance;

	/**
	 * Construct function
	 *
	 * @return void
	 */
	public function __construct() {
		// if ( is_admin ) {
		// 	add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
		// }

		// Load public scripts and styles
		add_action( 'wp_enqueue_scripts', array( $this, 'public_scripts' ) );

		register_activation_hook( __FILE__, array( $this, 'activate_plugin' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate_plugin' ) );
		register_uninstall_hook( __FILE__, array( $this, 'uninstall_plugin' ) );

		self::init_autoloader();
	}

	/**
	 * Enqueue public scripts and styles
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function public_scripts() {
		wp_enqueue_style(   'raketech_styles', RAKETECH_PLUGIN_URL . '/plugin-styles.css', array(), RAKETECH_PLUGIN_VER );
		//wp_enqueue_script(  'raketech_script',        RAKETECH_PLUGIN_URL . 'assets/js/pub-script.js', array( 'jquery' ), RAKETECH_PLUGIN_VER, false );
	}

	/**
	 * Enqueue admin scripts and styles
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function admin_scripts() {
		// wp_enqueue_style(  'wpbb_admin_styles', RAKETECH_PLUGIN_URL . 'assets/css/admin.css', RAKETECH_PLUGIN_VER );
		// wp_enqueue_media();
	}

	/**
	 * Plugin activation handler
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function activate_plugin() {
		self::init_autoloader();
		flush_rewrite_rules();
	}

	/**
	 * The plugin is deactivating.  Delete out the rewrite rules option.
	 *
	 * @since 1.0.1
	 *
	 * @return void
	 */
	public function deactivate_plugin() {
		delete_option( 'rewrite_rules' );
	}

	/**
	 * Uninstall plugin handler
	 *
	 * @since 1.0.1
	 *
	 * @return void
	 */
	public function uninstall_plugin() {
		delete_option( 'rewrite_rules' );
	}

	/**
	 * Kick off the plugin by initializing the plugin files.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public static function init_autoloader() {

	}

	/**
	 * Return active instance of Init_Plugin, create one if it doesn't exist
	 *
	 * @return object $instance
	 */
	public static function get_instance() {
		if ( empty( self::$instance ) ) {
			$class = __CLASS__;
			self::$instance = new $class;
		}
		return self::$instance;
	}
}
Init_Plugin::get_instance();
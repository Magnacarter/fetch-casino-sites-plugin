<?php
/**
 * Class Site List
 */
namespace Raketech\Site_List;

new Site_List();

/**
 * Class Site_List
 */
class Site_List {

	/**
	 * Construct function
	 *
	 * @return void
	 */
	public function __construct() {
		add_filter( 'the_content', [$this, 'show_list'], 1 );
    }

	public function show_list( $content ) {
		$markup = file_get_contents( RAKETECH_PLUGIN_DIR . 'fetch-casino-sites-plugin/views/casino-list.php' );
		return $content .= $markup;
	}
}
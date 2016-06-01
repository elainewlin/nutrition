<?php 
/*
Plugin Name: FoodParser
Description: Easily add nutrition labels to your Wordpress posts from Google or Calorie Count.
Author: Elaine Lin
Author URI: http://www.foodparser.com
*/

/**
 * Apply styles to the visual editor
 */ 

add_filter('mce_css', 'foodparser_mce_css');
function foodparser_mce_css($url) {
 
    if ( !empty($url) )
        $url .= ',';
 
    // Retrieves the plugin directory URL
    // Change the path here if using different directories
    $url .= plugin_dir_url(__FILE__) . 'foodparser-style.css';
 
    return $url;
}
 
// add_action( 'wp_ajax_plugin_slug_insert_dialog', 'plugin_slug_insert_gistpen_dialog' );

// function plugin_slug_insert_gistpen_dialog() {
//     $url = plugin_dir_url(__FILE__) . 'form.php'
//     die(include $url);
// }
/* Learn TinyMCE style format options at http://www.tinymce.com/wiki.php/Configuration:formats */
 
/*
 * Add custom stylesheet to the website front-end with hook 'wp_enqueue_scripts'
 */
add_action('wp_enqueue_scripts', 'foodparser_post_css');
 
/*
 * Enqueue stylesheet, if it exists.
 */
function foodparser_post_css() {
    $styleUrl = plugin_dir_url(__FILE__) . 'foodparser-style.css'; // Customstyle.css is relative to the current file
    wp_enqueue_style( 'myCustomStyles', $styleUrl );
}

add_action('admin_head', 'foodparser_add_nutrition_button'); 

function foodparser_add_nutrition_button() {
	add_filter('mce_external_plugins', 'foodparser_add_plugin');
	add_filter('mce_buttons', 'foodparser_show_button');
}

function foodparser_add_plugin($plugin_array){
	$plugin_array['foodparser_nutrition_button'] = plugins_url('/foodparser-modal-popup.js', __FILE__); //nutrition_button is the plugin we're going to create
	$plugin_array['foodparser_add_file'] = plugins_url('/foodparser-modal-popup.js', __FILE__);
	return $plugin_array;
} //we need to store the js for the button in a file with the name datapress_button_code in the same file as this one

function foodparser_show_button($buttons){ //$buttons is an array of buttons that is passed when mce_buttons is called
	array_push($buttons, 'foodparser_nutrition_button'); //nutrition_button is the id of the button we're going to create
	return $buttons;
}
?>
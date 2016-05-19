<?php 
/*
Plugin Name: Easy Nutrition Label
Description: Easily add nutrition labels to your Wordpress posts from Google or Calorie Count.
Author: Elaine Lin
Author URI: http://www.foodparsed.com
*/

/**
 * Apply styles to the visual editor
 */ 

add_filter('mce_css', 'plugin_mce_css');
function plugin_mce_css($url) {
 
    if ( !empty($url) )
        $url .= ',';
 
    // Retrieves the plugin directory URL
    // Change the path here if using different directories
    $url .= plugin_dir_url(__FILE__) . 'nutrition-style.css';
 
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
add_action('wp_enqueue_scripts', 'plugin_post_css');
 
/*
 * Enqueue stylesheet, if it exists.
 */
function plugin_post_css() {
    $styleUrl = plugin_dir_url(__FILE__) . 'nutrition-style.css'; // Customstyle.css is relative to the current file
    wp_enqueue_style( 'myCustomStyles', $styleUrl );
}

add_action('admin_head', 'nutrition_buttons'); 

function nutrition_buttons() {
	add_filter('mce_external_plugins', 'add_plugins');
	add_filter('mce_buttons', 'show_nutrition_button');
}

function add_plugins($plugin_array){
	$plugin_array['nutrition_button'] = plugins_url('/nutrition_popup.js', __FILE__); //nutrition_button is the plugin we're going to create
	$plugin_array['add_file'] = plugins_url('/nutrition_popup.js', __FILE__);
	return $plugin_array;
} //we need to store the js for the button in a file with the name datapress_button_code in the same file as this one

function show_nutrition_button($buttons){ //$buttons is an array of buttons that is passed when mce_buttons is called
	array_push($buttons, 'nutrition_button'); //nutrition_button is the id of the button we're going to create
	return $buttons;
}
?>
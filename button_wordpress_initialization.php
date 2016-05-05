<?php 
/*
Plugin Name: Test Modal
Plugin URI: http://www.speckygeek.com
Description: Add custom styles in your posts and pages content using TinyMCE WYSIWYG editor. The plugin adds a Styles dropdown menu in the visual post editor.
Based on TinyMCE Kit plug-in for WordPress
http://plugins.svn.wordpress.org/tinymce-advanced/branches/tinymce-kit/tinymce-kit.php
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
    $url .= plugin_dir_url(__FILE__) . 'editor-styles.css';
 
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
    $styleUrl = plugin_dir_url(__FILE__) . 'editor-styles.css'; // Customstyle.css is relative to the current file
    wp_enqueue_style( 'myCustomStyles', $styleUrl );
}

add_action('admin_head', 'datapress_buttons'); 

function datapress_buttons() {
	add_filter('mce_external_plugins', 'add_plugins');
	add_filter('mce_buttons', 'show_datapress_button');
}

function add_plugins($plugin_array){
	$plugin_array['exhibit_button'] = plugins_url('/modal.js', __FILE__); //exhibit_button is the plugin we're going to create
	$plugin_array['add_file'] = plugins_url('/modal.js', __FILE__);
	return $plugin_array;
} //we need to store the js for the button in a file with the name datapress_button_code in the same file as this one

function show_datapress_button($buttons){ //$buttons is an array of buttons that is passed when mce_buttons is called
	array_push($buttons, 'exhibit_button'); //exhibit_button is the id of the button we're going to create
	return $buttons;
}

add_action( 'wp_ajax_plugin_slug_insert_dialog', 'plugin_slug_insert_gistpen_dialog' );

function plugin_slug_insert_gistpen_dialog() {
    $url = plugins_url('/form.php', __FILE__); 
    die(include $url);

}
?>
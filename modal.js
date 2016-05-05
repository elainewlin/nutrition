
//Adds a button to the TinyMCE toolbar with the exhibit logo
(function($) { 
	//pretty sure that this line adds your function to tinymce's plugin list
    $("table").click(function() {
        console.log("Hello world!");
    })
    tinymce.PluginManager.add('exhibit_button', function( editor, url ) {
	//and this line adds the actual button
	editor.addButton( 'exhibit_button', { 
		title: 'Add nutritional information', 
		image: url + '/foodparsed-pear.png',
        cmd: 'plugin_command'
		
    }); 
    var insertShortcode = function() {
        editor.insertContent(`
            <table id="nutritionfacts" class="mceNonEditable">
                <tbody><tr>
                    <td align="center" class="header">Nutrition Facts</td>
                </tr>
                <tr>
                    <td bgcolor="#000000"></td>
                </tr>
                <tr>
                    <td>Amount Per Serving</td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Calories</b>
                            <span id="calories">230</span>
                        </div>
                        <div class="dv">Calories from Fat 
                            <span id="fat-calories">56</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><div class="dv">% Daily Value</div></td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Total Fat</b> 
                            <span id="fat-grams">6.2g</span>
                        </div>
                        <div class="dv">
                            <span id="fat-dv">10%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="indent">
                        <div class="labellight">Saturated Fat 
                            <span id="saturated-grams">3.5g</span>
                        </div>
                        <div class="dv">
                            <span id="saturated-dv">17%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="indent">
                        <div class="labellight"><i>Trans</i> Fat 
                            <span id="trans-grams">0.0g</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Cholesterol</b> 
                            <span id="cholesterol-grams">22mg</span>
                        </div>
                        <div class="dv">
                            <span id="cholesterol-dv">7%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Sodium</b> 
                            <span id="sodium-grams">618mg</span>
                        </div>
                        <div class="dv">
                            <span id="sodium-dv">26%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Total Carbohydrates</b> 
                            <span id="carb-grams">32.2g</span>
                        </div>
                        <div class="dv">
                            <span id="carb-dv">11%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="indent">
                        <div class="labellight">Dietary Fiber 
                            <span id="fiber-grams">5.2g</span>
                        </div>
                        <div class="dv">
                            <span id="fiber-dv">21%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="indent">
                        <div class="labellight">Sugars 
                            <span id="sugar-grams">3.3g</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Protein</b> 
                            <span id="protein-grams">11.4g</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#000000"></td>
                </tr>
                <tr>
                    <td>
                        <div class="label">Vitamin A 
                            <span id="a-dv">10%</span>
                        </div>
                        <div class="dv">Vitamin C 19%</div>
                    </td>
                </tr>
                <tr>
                    <td>
                      <div class="label">Calcium 22%</div>
                      <div class="dv">Iron 13%</div>
                    </td>
                </tr>      
            </tbody></table>
            `);
    }
    editor.addCommand( 'plugin_command', function() {
            // Calls the pop-up modal
            editor.windowManager.open({
                // Modal settings
                title: 'Insert Shortcode',
                width: $( window ).width() * 0.7,
                // minus head and foot of dialog box
                height: ($( window ).height() - 36 - 50) * 0.7,
                inline: 1,
                id: 'plugin-slug-insert-dialog',
                buttons: [{
                    text: 'Insert',
                    id: 'plugin-slug-button-insert',
                    class: 'insert',
                    onclick: function( e ) {
                        insertShortcode();
                    },
                },
                {
                    text: 'Cancel',
                    id: 'plugin-slug-button-cancel',
                    onclick: 'close'
                }],
            });

        });
	}); 


})(jQuery);

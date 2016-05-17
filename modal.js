
//Adds a button to the TinyMCE toolbar with the exhibit logo
(function($) { 
	//pretty sure that this line adds your function to tinymce's plugin list

    tinymce.PluginManager.add('exhibit_button', function( editor, url ) {
	//and this line adds the actual button
	editor.addButton( 'exhibit_button', { 
		title: 'Add nutritional information', 
		image: url + '/foodparsed-pear.png',
        cmd: 'plugin_command'
		
    }); 
    String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
    var getSubstring = function(str, char1, char2) {
        return str.substring(str.lastIndexOf(char1)+1,str.lastIndexOf(char2));
    }
    var insertShortcode = function(nutritionString) {
        var r = ^d+(\.d{1,2})?$;
        var nutrition = nutritionString.split("\n");
        console.log(nutrition);
        for(i in nutrition) {
            var entry = nutrition[i];
            console.log(entry);
            if(entry.contains("Calories")) {
                calories = entry.match(r);
                console.log(entry + "SJDKFKLSDJFLKSDJKLF");
                console.log(calories);
            }
        }
  
        calories = 123123;
        fat = 65;
        fatP = 10;
        saturated = 20;
        saturatedP = 10;
        trans = 1;
        cholesterol = 300;
        cholesterolP = 4;
        sodium = 619
        sodiumP = 1;
        carbs = 1;
        carbsP = 1;
        fiber = 1;
        fiberP = 1;
        sugar = 1;
        protein = 1;
        vitaminA = 1;
        vitaminC = 1;
        calcium = 1;
        iron = 1;
        editor.insertContent(`
            <table id="nutritionfacts">
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
                            <span id="calories">`+calories+`</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><div class="dv">% Daily Value</div></td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Total Fat</b> 
                            <span id="fat-grams">`+fat+`g</span>
                        </div>
                        <div class="dv">
                            <span id="fat-dv">`+fatP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="indent">
                        <div class="labellight">Saturated Fat 
                            <span id="saturated-grams">`+saturated+`g</span>
                        </div>
                        <div class="dv">
                            <span id="saturated-dv">`+saturatedP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="indent">
                        <div class="labellight"><i>Trans</i> Fat 
                            <span id="trans-grams">`+trans+`g</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Cholesterol</b> 
                            <span id="cholesterol-grams">`+cholesterol+`mg</span>
                        </div>
                        <div class="dv">
                            <span id="cholesterol-dv">`+cholesterolP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Sodium</b> 
                            <span id="sodium-grams">`+sodium+`mg</span>
                        </div>
                        <div class="dv">
                            <span id="sodium-dv">`+sodiumP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Total Carbohydrates</b> 
                            <span id="carb-grams">`+carbs+`g</span>
                        </div>
                        <div class="dv">
                            <span id="carb-dv">`+carbsP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="indent">
                        <div class="labellight">Dietary Fiber 
                            <span id="fiber-grams">`+fiber+`g</span>
                        </div>
                        <div class="dv">
                            <span id="fiber-dv">`+fiberP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="indent">
                        <div class="labellight">Sugars 
                            <span id="sugar-grams">`+sugar+`g</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="label"><b>Protein</b> 
                            <span id="protein-grams">`+protein+`g</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#000000"></td>
                </tr>
                <tr>
                    <td>
                        <div class="label">Vitamin A 
                            <span id="a-dv">`+vitaminA+`%</span>
                        </div>
                        <div class="dv">Vitamin C `+vitaminC+`%</div>
                    </td>
                </tr>
                <tr>
                    <td>
                      <div class="label">Calcium `+calcium+`%</div>
                      <div class="dv">Iron `+iron+`%</div>
                    </td>
                </tr>      
            </tbody></table>
            `);
    }
    editor.addCommand( 'plugin_command', function() {

            //Calls the pop-up modal
            var alterText = function(e) {
                return e + "jaklsdjfkld";
            }
            editor.windowManager.open({
                // Modal settings
                title: 'Insert Shortcode',
                width: $( window ).width() * 0.7,
                // minus head and foot of dialog box
                height: $( window ).height() * 0.5,
                inline: 1,
                id: 'plugin-slug-insert-dialog',
                body: [
                    {type: 'textbox',
                    multiline: true,
                    minHeight: 200,
                    name: 'nutrition',
                    label: 'Insert nutritional information'
                        },
                    ],
                onsubmit: function(e) {
                   // editor.insertShortcode(e.data.nutrition);
                    insertShortcode(e.data.nutrition);
                }
            });

        });
	}); 


})(jQuery);

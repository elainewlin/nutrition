
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

    var getNum = function(str) {
        var num = /[^0-9\.]+/;
        var split = str.split(num);
        if(split[1] != "") {
            return split[1];
        }
        else {
            return split[0];
        }
    }

    var getPercent = function(str) {
        var parts = str.split("g");
        var num = getNum(parts[0]);
        var percent = getNum(parts[1]);
        return [num, percent];
    }

    var getVitamins = function(str) {
        var parts = str.split("%");
        var num = getNum(parts[0]);
        var percent = getNum(parts[1]);
        return [num, percent];

    }

    var insertShortcode = function(nutritionString) {
        nutritionString = nutritionString.replace(/,/g,"");
        fat = "0.0";
        fatP = 0;
        saturated = "0.0";
        saturatedP = 0;
        trans = "0.0";
        cholesterol = 0;
        cholesterolP = 0;
        sodium = 0;
        sodiumP = 0;
        carbs = "0.0";
        carbsP = 0;
        fiber = "0.0";
        fiberP = 0;
        sugar = "0.0";
        protein = "0.0";
        vitaminA = 0;
        vitaminC = 0;
        calcium = 0;
        iron = 0;

        var nutrition = nutritionString.split('\n');
        for(i in nutrition) {
            var entry = nutrition[i];
            console.log(entry);
            if(entry.contains("Calories")) {
                calories = getNum(entry);
            }
            if(entry.contains("Trans")) {
                trans = getNum(entry);
            }
            if(entry.contains("Sugar")) {
                sugar = getNum(entry);
            }
            if(entry.contains("Protein")) {
                protein = getNum(entry);
            }
            if(entry.contains("Total Fat")) {
                fat = getPercent(entry)[0];
                fatP = getPercent(entry)[1];
            }
            if(entry.contains("Saturated")) {
                saturated = getPercent(entry)[0];
                saturatedP = getPercent(entry)[1];
            }
            if(entry.contains("Cholesterol")) {
                cholesterol = getPercent(entry)[0];
                cholesterolP = getPercent(entry)[1];
            }
            if(entry.contains("Sodium")) {
                sodium = getPercent(entry)[0];
                sodiumP = getPercent(entry)[1];
            }
            if(entry.contains("Carbohydrate")) {
                carbs = getPercent(entry)[0];
                carbsP = getPercent(entry)[1];
            }
            if(entry.contains("Dietary")) {
                fiber = getPercent(entry)[0];
                fiberP = getPercent(entry)[1];
            }
            if(entry.contains("Vitamin A")) {
                vitaminA = getVitamins(entry)[0];
                vitaminC = getVitamins(entry)[1];
            }
            if(entry.contains("Calcium")) {
                calcium = getVitamins(entry)[0];
                iron = getVitamins(entry)[1];
            }
        }
  
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
                    }
                ],
                onsubmit: function(e) {
                   // editor.insertShortcode(e.data.nutrition);
                    insertShortcode(e.data.nutrition);
                }
            });

        });
	}); 


})(jQuery);

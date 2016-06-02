//Adds a button to the TinyMCE toolbar with the exhibit logo
(function($) { 
	//pretty sure that this line adds your function to tinymce's plugin list
    tinymce.PluginManager.add('foodparser_nutrition_button', function( editor, url ) {
	//and this line adds the actual button
	editor.addButton( 'foodparser_nutrition_button', { 
		title: 'Add nutritional information', 
		image: url + '/foodparser-pear.png',
        cmd: 'foodparser_open_modal'
    }); 

    String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

    var foodparserGetNum = function(str) {
        var num = /[^0-9\.]+/;
        var split = str.split(num);
        if(split[1] != "") {
            return split[1];
        }
        else {
            return split[0];
        }
    }

    var foodparserGetPercent = function(str) {
        var parts = str.split("g");
        var num = foodparserGetNum(parts[0]);
        var percent = foodparserGetNum(parts[1]);
        return [num, percent];
    }

    var foodparserGetVitamins = function(str) {
        var parts = str.split("%");
        var num = foodparserGetNum(parts[0]);
        var percent = foodparserGetNum(parts[1]);
        return [num, percent];
    }

    var foodparserInsertNutrition = function(nutritionString) {
        nutritionString = nutritionString.replace(/,/g,"");
        calories = 0;
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
            if(entry.contains("Calories")) {
                calories = foodparserGetNum(entry);
            }
            if(entry.contains("Trans")) {
                trans = foodparserGetNum(entry);
            }
            if(entry.contains("Sugar")) {
                sugar = foodparserGetNum(entry);
            }
            if(entry.contains("Protein")) {
                protein = foodparserGetNum(entry);
            }
            if(entry.contains("Total Fat")) {
                fat = foodparserGetPercent(entry)[0];
                fatP = foodparserGetPercent(entry)[1];
            }
            if(entry.contains("Saturated")) {
                saturated = foodparserGetPercent(entry)[0];
                saturatedP = foodparserGetPercent(entry)[1];
            }
            if(entry.contains("Cholesterol")) {
                cholesterol = foodparserGetPercent(entry)[0];
                cholesterolP = foodparserGetPercent(entry)[1];
            }
            if(entry.contains("Sodium")) {
                sodium = foodparserGetPercent(entry)[0];
                sodiumP = foodparserGetPercent(entry)[1];
            }
            if(entry.contains("Carbohydrate")) {
                carbs = foodparserGetPercent(entry)[0];
                carbsP = foodparserGetPercent(entry)[1];
            }
            if(entry.contains("Dietary")) {
                fiber = foodparserGetPercent(entry)[0];
                fiberP = foodparserGetPercent(entry)[1];
            }
            if(entry.contains("Vitamin A")) {
                vitaminA = foodparserGetVitamins(entry)[0];
                vitaminC = foodparserGetVitamins(entry)[1];
            }
            if(entry.contains("Calcium")) {
                calcium = foodparserGetVitamins(entry)[0];
                iron = foodparserGetVitamins(entry)[1];
            }
        }
  
     editor.insertContent(`
          <table id="foodparser_nutrition" border="1">
                <tbody><tr>
                    <td align="center" class="foodparser_header">Nutrition Facts</td>
                </tr>
                <tr>
                    <td bgcolor="#000000"></td>
                </tr>
                <tr>
                    <td>Amount Per Serving</td>
                </tr>
                <tr>
                    <td>
                        <div class="foodparser_label"><b>Calories</b>
                            <span id="foodparser_calories">`+calories+`</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><div class="foodparser_dv">% Daily Value</div></td>
                </tr>
                <tr>
                    <td>
                        <div class="foodparser_label"><b>Total Fat</b> 
                            <span id="foodparser_fat-grams">`+fat+`g</span>
                        </div>
                        <div class="foodparser_dv">
                            <span id="foodparser_fat-dv">`+fatP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="foodparser_indent">
                        <div class="foodparser_labellight">Saturated Fat 
                            <span id="foodparser_saturated-grams">`+saturated+`g</span>
                        </div>
                        <div class="foodparser_dv">
                            <span id="foodparser_saturated-dv">`+saturatedP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="foodparser_indent">
                        <div class="foodparser_labellight"><i>Trans</i> Fat 
                            <span id="foodparser_trans-grams">`+trans+`g</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="foodparser_label"><b>Cholesterol</b> 
                            <span id="foodparser_cholesterol-grams">`+cholesterol+`mg</span>
                        </div>
                        <div class="foodparser_dv">
                            <span id="foodparser_cholesterol-dv">`+cholesterolP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="foodparser_label"><b>Sodium</b> 
                            <span id="foodparser_sodium-grams">`+sodium+`mg</span>
                        </div>
                        <div class="foodparser_dv">
                            <span id="foodparser_sodium-dv">`+sodiumP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="foodparser_label"><b>Total Carbohydrates</b> 
                            <span id="foodparser_carb-grams">`+carbs+`g</span>
                        </div>
                        <div class="foodparser_dv">
                            <span id="foodparser_carb-dv">`+carbsP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="foodparser_indent">
                        <div class="foodparser_labellight">Dietary Fiber 
                            <span id="foodparser_fiber-grams">`+fiber+`g</span>
                        </div>
                        <div class="foodparser_dv">
                            <span id="foodparser_fiber-dv">`+fiberP+`%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="foodparser_indent">
                        <div class="foodparser_labellight">Sugars 
                            <span id="foodparser_sugar-grams">`+sugar+`g</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="foodparser_label"><b>Protein</b> 
                            <span id="foodparser_protein-grams">`+protein+`g</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#000000"></td>
                </tr>
                <tr>
                    <td>
                        <div class="foodparser_label">Vitamin A 
                            <span id="foodparser_a-dv">`+vitaminA+`%</span>
                        </div>
                        <div class="foodparser_dv">Vitamin C `+vitaminC+`%</div>
                    </td>
                </tr>
                <tr>
                    <td>
                      <div class="foodparser_label">Calcium `+calcium+`%</div>
                      <div class="foodparser_dv">Iron `+iron+`%</div>
                    </td>
                </tr>      
            </tbody></table>
        `);
    }
    editor.addCommand( 'foodparser_open_modal', function() {
        editor.windowManager.open({
            // Modal settings
            title: 'Insert nutritional information',
            width: $( window ).width() * 0.7,
            // minus head and foot of dialog box
            height: $( window ).height() * 0.5,
            inline: 1,
            body: [
                {
                    type   : 'container',
                    name   : 'container',
                    html   : 'Copy/paste nutrition label text from <a href="https://www.caloriecount.com/cc/recipe_analysis.php">Calorie Count</a> or Google. Step by step instructions can be found on <a href="http://foodparsed.com/easy-nutrition-label-plug-in/">FoodParsed</a>.'
                },
                {
                    type: 'textbox',
                    multiline: true,
                    minHeight: $( window ).height() * 0.4,
                    name: 'foodparser_nutrition',
                }
            ],
            onsubmit: function(e) {
                foodparserInsertNutrition(e.data.foodparser_nutrition);
            }
        });
    });
	}); 
})(jQuery);

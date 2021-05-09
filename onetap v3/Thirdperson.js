/*
*
* Title: Improved thirdperson.
* Author: sonka#4484
* Description: Change the thirdperson distance.
*
*/

UI.AddSliderInt("Thirdperson", 50, 500);

function set_distance () {
    var distance = UI.GetValue("Misc", "Javascript", "Script Items", "Thirdperson")
   
    UI.SetValue("Visual", "World", "View", "Thirdperson", distance)
}

Cheat.RegisterCallback("Draw", "set_distance");
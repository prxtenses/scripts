/*
*
* Title: Aspect Ratio
* Author: sonka#4484
* Description: Change aspectratio using slider.
*
*/

UI.AddLabel("<---------------------------------------->");
UI.AddSliderFloat( "Aspect Ratio", 0.0, 5.0 );
UI.AddLabel("<---------------------------------------->");

function aspectratio( ) {
menu_val = UI.GetValue("Aspect Ratio");
string_menu_val = menu_val.toString();

Convar.SetString ("r_aspectratio", string_menu_val );
}

Cheat.RegisterCallback( "FrameStageNotify", "aspectratio" );
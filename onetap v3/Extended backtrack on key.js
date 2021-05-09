/*
*
* Title: Extended backtrack on key
* Author: sonka#4484
* Description: Enable extended backtrack on key.
*
*/

UI.AddHotkey( "Extended backtrack on key" );

function extendedonkey()
{
	const hotkey = UI.IsHotkeyActive("Script items", "Extended backtrack on key");

	if (hotkey)
	{
		UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Extended backtracking", true);
	}
	else 
	{
		UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Extended backtracking", false);
	}
}

Global.RegisterCallback("CreateMove", "extendedonkey");
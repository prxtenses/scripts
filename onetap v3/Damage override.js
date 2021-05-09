/*
*
* Title: Damage override on bind
* Author: sonka#4484
* Description: Change damage override on key.
*
*/

UI.AddCheckbox("Display indicator")
UI.AddHotkey("Heavy Pistol Override")
UI.AddSliderInt("Heavy Pistol Mindmg", 0, 130)
UI.AddHotkey("Scout Override")
UI.AddSliderInt("Scout Mindmg", 0, 130)
UI.AddHotkey("AWP Override")
UI.AddSliderInt("AWP Mindmg", 0, 130)
UI.AddHotkey("Auto Override")
UI.AddSliderInt("Auto Mindmg", 0, 130)

const screen_size = Global.GetScreenSize();
var stored = false;
var x_offset = 0;
var y_offset = 0;

UI.AddSliderInt("mindamage x", 0, screen_size[0]);
UI.AddSliderInt("mindamage y", 0, screen_size[1]);

UI.AddSliderInt("font size", 0, 17);
UI.SetEnabled("Script items", "font size", true);

UI.SetEnabled("Script items", "mindamage x", true);
UI.SetEnabled("Script items", "mindamage y", true);

var heavy_cache = UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
var scout_cache = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
var awp_cache = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
var auto_cache = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")

const in_bounds = function(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

function isActive(a)
{
    return UI.IsHotkeyActive("Script items", a)
}

function setValue(cat, value)
{
    UI.SetValue("Rage", cat.toUpperCase(), "Targeting", "Minimum damage", value)
}

function isHeavyPistol(name)
{
    if (name == "r8 revolver" || name == "desert eagle")
    {
        return true
    }
}

function isAutoSniper(name)
{
    if(name == "scar 20" || weapon_name == "g3sg1")
    {
        return true
    }
}

function onCM()
{
    heavy_value = UI.GetValue("Script items", "Heavy Pistol Mindmg")
    scout_value = UI.GetValue("Script items", "Scout Mindmg")
    awp_value = UI.GetValue("Script items", "AWP Mindmg")
    auto_value = UI.GetValue("Script items", "Auto Mindmg")
    weapon_name = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    
    if (isActive("Heavy Pistol Override") && isHeavyPistol(weapon_name))
    {
        setValue("HEAVY PISTOL", heavy_value)
    }
    else{
        setValue("HEAVY PISTOL", heavy_cache)
    }
    
    if (isActive("Scout Override") && weapon_name == "ssg 08")
    {
        setValue("SCOUT", scout_value)
    }
    else{
        setValue("SCOUT", scout_cache)
    }

    if (isActive("AWP Override") && weapon_name == "awp")
    {
        setValue("AWP", awp_value)
    }
    else{
        setValue("AWP", awp_cache)
    }

    if (isActive("Auto Override") && isAutoSniper(weapon_name))
    {
        
        setValue("AUTOSNIPER", auto_value)
    }
    else
    {
        setValue("AUTOSNIPER", auto_cache)
    } 
}

function indicator()
{
	fontsize = UI.GetValue("Script items", "font size")
    font = Render.AddFont("Tahoma", fontsize, 600 )
    screen = Render.GetScreenSize()
    wep = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    const x = UI.GetValue("Script items", "mindamage x"),
		  y = UI.GetValue("Script items", "mindamage y");
    heavy ="" + UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage")
    scout ="" +UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
    awp ="" +UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
    auto ="" +UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
    var str = ""
	
    if (UI.GetValue("Script items", "Display indicator") && Entity.IsValid(Entity.GetLocalPlayer()) && Entity.IsAlive(Entity.GetLocalPlayer()))
    {
        if (isHeavyPistol(wep))
        {
            str = heavy
        }
        else if(wep == "ssg 08")
        {
            str = scout
        }
        else if(wep == "awp")
        {
            str = awp
        }
        else if (isAutoSniper(wep))
        {
            str = auto
        }
    }
    
    if (str == "" + 0)
    {
        str = "DYNAMIC"
    }
    Render.StringCustom(x + 1, y + 1, 0, str + "", [0,0,0,255], font)
    Render.StringCustom(x, y, 0, str + "", [255,255,255,255], font)
}

Cheat.RegisterCallback("Draw", "indicator")
Cheat.RegisterCallback("CreateMove", "onCM")
--local variables for API  
local client_userid_to_entindex, client_set_event_callback, client_screen_size, client_trace_bullet, client_unset_event_callback, client_color_log, client_reload_active_scripts, client_scale_damage, client_get_cvar, client_camera_position, client_create_interface, client_random_int, client_latency, client_set_clan_tag, client_find_signature, client_log, client_timestamp, client_delay_call, client_trace_line, client_register_esp_flag, client_get_model_name, client_system_time, client_visible, client_exec, client_key_state, client_set_cvar, client_unix_time, client_error_log, client_draw_debug_text, client_update_player_list, client_camera_angles, client_eye_position, client_draw_hitboxes, client_random_float = client.userid_to_entindex, client.set_event_callback, client.screen_size, client.trace_bullet, client.unset_event_callback, client.color_log, client.reload_active_scripts, client.scale_damage, client.get_cvar, client.camera_position, client.create_interface, client.random_int, client.latency, client.set_clan_tag, client.find_signature, client.log, client.timestamp, client.delay_call, client.trace_line, client.register_esp_flag, client.get_model_name, client.system_time, client.visible, client.exec, client.key_state, client.set_cvar, client.unix_time, client.error_log, client.draw_debug_text, client.update_player_list, client.camera_angles, client.eye_position, client.draw_hitboxes, client.random_float
local entity_get_local_player, entity_is_enemy, entity_get_bounding_box, entity_get_all, entity_set_prop, entity_is_alive, entity_get_steam64, entity_get_classname, entity_get_player_resource, entity_get_esp_data, entity_is_dormant, entity_get_player_name, entity_get_game_rules, entity_get_origin, entity_hitbox_position, entity_get_player_weapon, entity_get_players, entity_get_prop = entity.get_local_player, entity.is_enemy, entity.get_bounding_box, entity.get_all, entity.set_prop, entity.is_alive, entity.get_steam64, entity.get_classname, entity.get_player_resource, entity.get_esp_data, entity.is_dormant, entity.get_player_name, entity.get_game_rules, entity.get_origin, entity.hitbox_position, entity.get_player_weapon, entity.get_players, entity.get_prop
local globals_realtime, globals_absoluteframetime, globals_chokedcommands, globals_oldcommandack, globals_tickcount, globals_commandack, globals_lastoutgoingcommand, globals_curtime, globals_mapname, globals_tickinterval, globals_framecount, globals_frametime, globals_maxplayers = globals.realtime, globals.absoluteframetime, globals.chokedcommands, globals.oldcommandack, globals.tickcount, globals.commandack, globals.lastoutgoingcommand, globals.curtime, globals.mapname, globals.tickinterval, globals.framecount, globals.frametime, globals.maxplayers
local ui_new_slider, ui_new_combobox, ui_reference, ui_set_visible, ui_new_textbox, ui_new_color_picker, ui_new_checkbox, ui_mouse_position, ui_new_listbox, ui_new_multiselect, ui_is_menu_open, ui_new_hotkey, ui_set, ui_update, ui_menu_size, ui_name, ui_menu_position, ui_set_callback, ui_new_button, ui_new_label, ui_new_string, ui_get = ui.new_slider, ui.new_combobox, ui.reference, ui.set_visible, ui.new_textbox, ui.new_color_picker, ui.new_checkbox, ui.mouse_position, ui.new_listbox, ui.new_multiselect, ui.is_menu_open, ui.new_hotkey, ui.set, ui.update, ui.menu_size, ui.name, ui.menu_position, ui.set_callback, ui.new_button, ui.new_label, ui.new_string, ui.get
--end of local variables

--function colorlog
local function multicolor_log(...)
    args = { ... }
    len = #args
    for i = 1, len do
        arg = args[i]
        r, g, b = unpack(arg)

        msg = {}

        if #arg == 3 then
            table.insert(msg, " ")
        else
            for i = 4, #arg do
                table.insert(msg, arg[i])
            end
        end
        msg = table.concat(msg)

        if len > i then
            msg = msg .. "\0"
        end

        client.color_log(r, g, b, msg)
    end
end

-- steamid protection starts here // ty mex
local PanoramaJS = panorama.open()
local MyPersonaAPI = PanoramaJS.MyPersonaAPI
local LOG_ID64 = MyPersonaAPI.GetXuid()
local LOCK

-- add steamids here since ppl can only buy lifetime
local whitelist = {
    ["REDACTED"] = true,
    ["REDACTED"] = true
}

-- simple system i guess
if whitelist[LOG_ID64] then
    LOCK = false
else
    LOCK = true
end

if LOCK then
    multicolor_log({ 52, 137, 235, '[☁] ' }, { 255, 255, 255, 'You are not whitelisted | Error: ' }, { 119, 235, 52, 'Your CSGO Steam ID is not allowed' })
    return 
else
    multicolor_log({ 52, 137, 235, '[☁] ' }, { 255, 255, 255, 'Succesfully loaded: ' }, { 119, 235, 52, 'KOMBITICK.lua' })
    multicolor_log({ 52, 137, 235, '[☁] ' }, { 255, 255, 255, 'Welcome back, '       }, { 119, 235, 52, 'user'          })
    multicolor_log({ 52, 137, 235, '[☁] ' }, { 255, 255, 255, 'Made by: '            }, { 119, 235, 52, 'sonka#0001'    })

    --start of references
    local screenx, screeny = client.screen_size()
    local double_tap, double_tap_key = ui.reference("Rage","Other","Double tap")
    local fakeducking = ui.reference("RAGE", "Other", "Duck peek assist")
    local amount = ui.reference("aa", "Fake lag", "Amount")
    local limit = ui.reference("aa", "Fake lag", "Limit")
    local variance = ui.reference("aa", "Fake lag", "Variance")
    local box, key = ui.reference( "Rage", "Other", "Quick peek assist" )
    local min_dmg = ui_reference('Rage', 'Aimbot', 'Minimum damage')
    --end of references

    --start of checkboxes/hotkeys
    ui_new_label("aa", "anti-aimbot angles", "   -------------[Misc.]--------------")
    local exploit = ui.new_checkbox("aa", "anti-aimbot angles", "ideal Tick")
    local exploit_key = ui.new_hotkey("aa", "anti-aimbot angles", "ideal Tick Key", true)
    ui.new_textbox("aa", "anti-aimbot angles", "ideal Tick color")
    local color_picker = ui.new_color_picker('aa', 'anti-aimbot angles', 'ideal Tick color picker', 255, 255, 255, 255)
    ui_new_label("aa", "anti-aimbot angles", "--------------[Kombitick]--------------")

    -- steamid protection ends here // ty mex

    --start of function
    function mainfunction()

    	-- if is alive check
    	if not entity.is_alive(entity.get_local_player()) then
      	  	return
    	end

    	-- getstate = idealtick, idealtick key
    	local getstate = ui.get(exploit) and ui.get(exploit_key) and not ui.get(fakeducking)

    	-- variance go from 4 to 9
   		local variancerandom = math.random(4, 9)

        -- define colorpicker as r, g, b
        local red, green, blue, alpha = ui.get(color_picker)

    	-- store old damage
    	stored_dmg = ui_get(min_dmg)

    	-- set to true
    	ui.set(key, getstate and 'Always on' or 'On hotkey')
    	ui.set(double_tap_key, getstate and 'Always on' or 'toggle')

    	-- set min damage to 1
    	ui.set(min_dmg, getstate and 1 or stored_dmg)
    	ui.set(limit, getstate and 1 or 15)
    	ui.set(variance, getstate and variancerandom or 15)
    
    	-- render text
    	renderer.text(screenx/2-20, screeny/2-20, red, green, blue, getstate and alpha or 0, "-", nil, "KOMBITICK")
	end
    --end of function

    --event callback
    client.set_event_callback("paint", mainfunction)
end

-- Made by sonka#4484
-- Do not remove this
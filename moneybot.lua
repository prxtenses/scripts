local lastflicktime = client.get_curtime()
local FLICK_INTERVAL_MIN = 0.3 -- Minimum interval between flicks
local FLICK_INTERVAL_MAX = 0.7 -- Maximum interval between flicks
local currentflickinterval = math.random(FLICK_INTERVAL_MIN, FLICK_INTERVAL_MAX)

local function breaker(cmd)
    -- Get the local player entity
    local localplayer = entity_list.get_local_player()
    if not localplayer then return end

    -- Calculate player speed to determine if standing still
    local velocityX = localplayer:get_velocity()
    local velocityY = localplayer:get_velocity()
    local speed = math.sqrt(velocityX * velocityX + velocityY * velocityY)

    if speed < 3.0 then -- Trigger logic only if standing still
        -- Apply standing micromovements
        local microOffsetSide = math.sin(client.get_curtime() * 10) * 2 -- Oscillate sidemove between -2 and 2
        local microOffsetForward = math.sin(client.get_curtime() * 5) * 1 -- Oscillate forwardmove slightly between -1 and 1
        cmd.sidemove = cmd.sidemove + microOffsetSide
        cmd.forwardmove = cmd.forwardmove + microOffsetForward

        -- Check if it's time to apply a yaw flick
        local curtime = client.get_curtime()
        if curtime - lastflicktime >= currentflickinterval then
            -- Apply a small random yaw flick
            local flickamount = math.random(-35, 35)
            cmd.viewangles.yaw = cmd.viewangles.yaw + flickamount

            -- Update the last flick time
            lastflicktime = curtime

            -- Randomize the next flick interval for added unpredictability
            currentflickinterval = math.random(FLICK_INTERVAL_MIN * 100, FLICK_INTERVAL_MAX * 100) / 100
        end
    end
end
-- Function start
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
-- End of function

-- Example I
--         v

multicolor_log({52, 137, 235, '[Welcome] '}, {255, 255, 255, 'Welcome back, '}, {119, 235, 52, 'user!'})
--              color          text           color           text               color          text
/* Pretty useful */
    
var username = Cheat.GetUsername()

/* Clear */

Cheat.ExecuteCommand("clear")

/* String format */

    /* Big thanks to "april" for releasing this */

const format = function(string, values) {
    const array = string.split("%");
    const final_string = array[0];

    if (array.length - 1 != values.length)
        throw new Error("[Format] The amount of placeholders does not match the amount of values.");

    for (var i = 1; i < array.length; i++) 
        final_string += values[i - 1] + array[i];

    return final_string;
}

/* Sleep function */

function runAfterMs(callback, ms) {
    if (callback != undefined && ms != undefined) {
         if (this["_run_after_ms_callbacks"] == undefined)
             this["_run_after_ms_callbacks"] = []
          this["_run_after_ms_callbacks"].push({ func: callback, millis: ms, start: Globals.Realtime() })
        }
        else {
            for (i = 0; i < this["_run_after_ms_callbacks"].length; i++) {
                var diff = Globals.Realtime() - this["_run_after_ms_callbacks"][i].start
                if (diff >= this["_run_after_ms_callbacks"][i].millis / 1000) {
                this["_run_after_ms_callbacks"][i].func()
                this["_run_after_ms_callbacks"].splice(i, 1)
                i--
            }
        }
    }
    if (this["run_after_ms_registered"] == undefined) {
        this["run_after_ms_registered"] = true
        Cheat.RegisterCallback("Draw", "runAfterMs")
    }
}

/* Print logs */

runAfterMs(function () 
{
    /* [LOGS] Succesfully loaded */

    Cheat.PrintColor([52, 137, 235, 255], "[☁] ")
    Cheat.PrintColor([255, 255, 255, 255], "Sucessfuly loaded, ​")
    Cheat.PrintColor([119, 235, 52, 255 ], __filename)
    Cheat.PrintColor([255, 255, 255, 255], "!" + "\n")

    /* [LOGS] Welcome back */
    Cheat.PrintColor([52, 137, 235, 255], "[☁] ")
    Cheat.PrintColor([255, 255, 255, 255], "Welcome back, ​")
    Cheat.PrintColor([119, 235, 52, 255 ], username)
    Cheat.PrintColor([255, 255, 255, 255], "!" + "\n")

    /* Next line */

    Cheat.PrintColor([255, 255, 255, 255], "\n")

}, 1000)

/* Start Menu things */

UI.AddSubTab(["Config", "SUBTAB_MGR"], "Debug");

UI.AddCheckbox(["Config", "Debug", "Debug"], "Log doubletap speed")
UI.AddCheckbox(["Config", "Debug", "Debug"], "Show desync angle")
UI.AddCheckbox(["Config", "Debug", "Debug"], "Get current viewangles")
UI.AddCheckbox(["Config", "Debug", "Debug"], "Draw velocity")
UI.AddCheckbox(["Config", "Debug", "Debug"], "Log movement")
UI.AddCheckbox(["Config", "Debug", "Debug"], "Print all onetap functions")

/* Log doubletap speed function */

    /* Big thanks to "depresso" for releasing this function */

var start = 0
var end = 0

function doubletaplog() {

    if (UI.GetValue(["Config", "Debug", "Debug", "Log doubletap speed"]))
    {
        var local = Entity.GetLocalPlayer()
        if (Entity.GetEntityFromUserID(Event.GetInt("userid")) != local)
            return
        var time = Globals.Tickcount()
        if (start == 0) {
            start = time
        }
        else {
            end = time
            var delta = end - start
            var info = Entity.GetCCSWeaponInfo(local)
            if (info == undefined) {
                return
            }

            // DT Speed
            const dtspeed = format("%", [delta])

            // FPS
            var fps = Math.floor(1 / Global.Frametime());
            const loggedfps = format("%", [fps])

            // PING

            ping = "" + Math.round(Entity.GetProp(Entity.GetLocalPlayer(), 'CPlayerResource', 'm_iPing'))
            if (ping == "NaN") {
                ping = "0";
            }
            const loggedping = format("%", [ping])

            if (delta < Math.round(info.cycle_time / Globals.TickInterval())) {

                /* Console */

                Cheat.PrintColor([52, 137, 235, 255], "[☁] ")
                Cheat.PrintColor([255, 255, 255, 255], "DT Speed: ​")
                Cheat.PrintColor([119, 235, 52, 255], dtspeed)
                Cheat.PrintColor([52, 137, 235, 255], " <|> ")
                Cheat.PrintColor([255, 255, 255, 255], "Logged FPS: ")
                Cheat.PrintColor([119, 235, 52, 255], loggedfps)
                Cheat.PrintColor([52, 137, 235, 255], " <|> ")
                Cheat.PrintColor([255, 255, 255, 255], "Logged MS: ")
                Cheat.PrintColor([119, 235, 52, 255], loggedping)
                Cheat.PrintColor([255, 255, 255, 255], "\n")

                /* Event logs */

                Cheat.PrintLog("< DT Speed: " + dtspeed + "\n", [255, 255, 255, 255])

            }
            start = end
        }
    }
}

/* Desync angle */

function desynclog() {

    if (UI.GetValue(["Config", "Debug", "Debug", "Show desync angle"]))
    {
        /* Get screensize */
        var screensize = Render.GetScreenSize();
        var y = screensize[1] / 2;

       /* Get font */ 
        var font = Render.GetFont("Verdana.ttf", 18, true);

        /* Render the string */
        Render.String(10, y - 14, 0, "dsy: " + parseInt(Local.GetFakeYaw()), [255, 255, 255, 255], font);
    }
}

/* Show viewangles */

function viewangles() {
    if (UI.GetValue(["Config", "Debug", "Debug", "Get current viewangles"]))
    {
        /* Get local viewangles */
        var viewAngles = Local.GetViewAngles();

        const currentviewangles = format("%", [viewAngles])

        /* Console logs */

        Cheat.PrintColor([52, 137, 235, 255], "[☁] ")
        Cheat.PrintColor([255, 255, 255, 255], "Current viewangles: ")
        Cheat.PrintColor([119, 235, 52, 255], currentviewangles)
        Cheat.PrintColor([255, 255, 255, 255], "\n")

        /* I had to put this because there's no UI.Button
        in onetap, so this will look like a button. When
        you turn it on, it will print your current viewangles
        then It will desactivate */

        UI.SetValue(["Config", "Debug", "Debug", "Get current viewangles"], 0);
    }
}

/* Get Velocity */

function getVelocity() {
    velocity = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_vecVelocity[0]");
    speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
    return speed;
}

function velocity() {
    if (UI.GetValue(["Config", "Debug", "Debug", "Draw velocity"])) {

        /* Get screensize */
        var screensize = Render.GetScreenSize();
        var y = screensize[1] / 2;

        /* Get font */
        var font = Render.GetFont("Verdana.ttf", 18, true);

        /* Render the string */
        Render.String(100, y - 14, 0, "- vel: " + getVelocity().toFixed(0), [255, 255, 255, 255], font);

    }
}

/* Get Movement */

    /* Big thanks to 'signal' for releasing this */

function GetMovement()
{
    /* Get movement */
    var movement = UserCMD.GetMovement();

    forward = movement[0];
    side = movement[1];
    up = movement[2];

    const forwardside = format("%", [forward])
    const sideside = format("%", [side])
    const upside = format("%", [up])

    /* Console logs */

    if (UI.GetValue(["Config", "Debug", "Debug", "Log movement"])) {
        Cheat.PrintColor([52, 137, 235, 255], "[☁] ")
        Cheat.PrintColor([255, 255, 255, 255], "Forward: ")
        Cheat.PrintColor([119, 235, 52, 255], forwardside)
        Cheat.PrintColor([255, 255, 255, 255], "\n")
        Cheat.PrintColor([255, 255, 255, 255], "Side: ")
        Cheat.PrintColor([119, 235, 52, 255], sideside)
        Cheat.PrintColor([255, 255, 255, 255], "\n")
        Cheat.PrintColor([255, 255, 255, 255], "Up: ")
        Cheat.PrintColor([119, 235, 52, 255], upside)
        Cheat.PrintColor([255, 255, 255, 255], "\n")

        UI.SetValue(["Config", "Debug", "Debug", "Log movement"], 0);
    }
}

/* Print all onetap functions */

    /* Big thanks to "depresso" for releasing this function AGAIN */

function allfunctions() 
{
    if (UI.GetValue(["Config", "Debug", "Debug", "Print all onetap functions"])) 
    {
        var mainArray = []
        var search = this
        mainArray = Object.keys(search)
        var time = performance.now()
        for (i = 0; i < mainArray.length; i++) {
            if (performance.now() - time > 50 || mainArray[i].includes("mainArray") || mainArray[i].includes("search"))
                break
    
            Cheat.Print(mainArray[i])
            var type = typeof search[mainArray[i]]

            if (type == "object") {
                Cheat.Print(":")
                var array = Object.keys(search[mainArray[i]])
                for (x in array) {
                    mainArray.splice(i + 1, 0, "    " + mainArray[i] + "." + array[x] + "")
                }
            }

            if(type == "string") {
                Cheat.Print(":\n    " + search[mainArray[i]])
            }

            Cheat.Print("\n")

            UI.SetValue(["Config", "Debug", "Debug", "Print all onetap functions"], 0);
        }
    }
}

/* Callbacks */

    /* Some callback's could be done in just one "Draw" but why not create a lot of functions ? */

Cheat.RegisterCallback("weapon_fire", "doubletaplog")
Cheat.RegisterCallback("Draw", "desynclog")
Cheat.RegisterCallback("Draw", "viewangles")
Cheat.RegisterCallback("Draw", "velocity")
Cheat.RegisterCallback("CreateMove", "GetMovement"); // signal - UserCMD functions can only be called from CreateMove callback.
Cheat.RegisterCallback("Draw", "allfunctions")
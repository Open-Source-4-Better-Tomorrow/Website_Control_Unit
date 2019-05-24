var _counter = 0;


function getCurrentIteration() {
    return _counter;
}



var _debugger = {
    count : function(message) {
        var message_string = message + getCurrentIteration();

        var currentdate = new Date();
        var log = createPaddinng_I_1L(message_string) + "| " +
                                                                currentdate.getDate() +"/" +
                                                                (currentdate.getMonth()+1)  + "/" +
                                                                currentdate.getFullYear() + " @ " +
                                                                currentdate.getHours() + ":" +
                                                                currentdate.getMinutes() + ":" +
                                                                currentdate.getSeconds() + ":" +
                                                                formatMiliseconds_I_1L(currentdate.getMilliseconds());

        console.log(log);


        // change number of iterations of this loop to provide shorter or longer "load" times :-)
        for(var i = 0; i < 900000; i++) {
            var d = new Date();
            var e = d.getTimezoneOffset();
        }



        /**
         * Local helper functions
        */

        function createPaddinng_I_1L(message_string) {
            var padding;

            var message_available_width = 180;

            var message_length = Math.abs(message_available_width - message_string.length);

            padding = new Array(message_length + 1).join('.');

            return message_string + padding;
        }

        function formatMiliseconds_I_1L(milliseconds) {
            var milis = "";

            if(milliseconds.toString().length < 3) {
                for(var i = 0; i < 3 - milliseconds.toString().length; i++)
                    milis += "0";
            }

            milis += milliseconds;

            return milis;
        }
    },

    check : function(flag) {
        if(flag && _counter == 10)
            throw Error("This was examplary usage of current state of \"Website Control Unit, a.k.a Progressive Website Mechanism\"");
        else {
            console.log("-----------------------------------------------------------------------------------------------------------------------");
            _counter++;
        }
    }
};
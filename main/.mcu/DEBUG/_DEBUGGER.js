var _counter = 0;

function getCurrentIteration() {
    return _counter;
}

function createPadding(message_string) {
    var padding;

    var message_available_width = 180;

    var message_length = Math.abs(message_available_width - message_string.length);

    padding = new Array(message_length + 1).join('.');

    return message_string + padding;
}

function getCurrentLogTime() {
    var today = new Date();

    var logTime =   "| " +
                    today.getDate() +"/" +
                    (today.getMonth()+1)  + "/" +
                    today.getFullYear() + " @ " +
                    formatDatePart_I_1L(today.getHours(), 2, "0") + ":" +
                    formatDatePart_I_1L(today.getMinutes(), 2, "0") + ":" +
                    formatDatePart_I_1L(today.getSeconds(), 2, "0") + ":" +
                    formatDatePart_I_1L(today.getMilliseconds(), 3, "0");

    return logTime;



    /**
     * Local helper functions
    */
    function formatDatePart_I_1L(datepart, datepartWidth, datepartFiller) {
        var milis = "";

        if(datepart.toString().length < datepartWidth) {
            for(var i = 0; i < datepartWidth - datepart.toString().length; i++)
                milis += datepartFiller;
        }

        milis += datepart;

        return milis;
    }
}


var _debugger = {
    count : function(message) {
        var message_string = message + getCurrentIteration();

        var log = createPadding(message_string) + getCurrentLogTime();

        console.log(log);


        // change number of iterations of this loop to provide shorter or longer "load" times :-)
        for(var i = 0; i < 900000; i++) {
            var d = new Date();
            var e = d.getTimezoneOffset();
        }
    },

    check : function(flag) {
        if(flag && _counter == 10)
            throw Error("This was examplary usage of current state of \"Website Control Unit, a.k.a Progressive Website Mechanism\"");
        else {
            var message_string = "-----------------------------------------------------------------------------------------------------------------------" + getCurrentIteration();

            var log = createPadding(message_string) + getCurrentLogTime();

            console.log(log);

            _counter++;
        }
    }
};
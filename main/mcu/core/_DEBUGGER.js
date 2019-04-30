var _counter = 0;


function getCurrentIteration() {
    return _counter;
}



var _debugger = {
    count : function(message) {
        console.log(message + getCurrentIteration());

        for(var i = 0; i < 900000; i++) {
            var d = new Date();
            var e = d.getTimezoneOffset();
        }
    },

    check : function(flag) {
        if(flag && _counter == 10)
            throw Error("This was examplary usage of current state of \"Hamburger Mechanism\"");
        else {
            console.log("-----------------------------------------------------------------------------------------------------------------------");
            _counter++;
        }
    }
}
/* eslint-disable no-empty */

// show progress animation while loading libraries
var _animationIntervalHandler;
(function () {
    var _progressCounter = 1;

    setTimeout(function () {
        document.getElementsByClassName("progress_" + _progressCounter)[0].style.backgroundColor = "#C10C06"; /* positive red */
        document.getElementsByClassName("progress_" + (_progressCounter + 1))[0].style.backgroundColor = "white";
        document.getElementsByClassName("progress_" + (_progressCounter + 2))[0].style.backgroundColor = "white";

        _progressCounter++;
    }, 0);

    _animationIntervalHandler = setInterval(function () {
        try {
            switch (_progressCounter) {
                case 1:
                    document.getElementsByClassName("progress_" + _progressCounter)[0].style.backgroundColor = "#C10C06"; /* positive red */
                    document.getElementsByClassName("progress_" + (_progressCounter + 1))[0].style.backgroundColor = "white";
                    document.getElementsByClassName("progress_" + (_progressCounter + 2))[0].style.backgroundColor = "white";
                    break;

                case 2:
                    document.getElementsByClassName("progress_" + (_progressCounter - 1))[0].style.backgroundColor = "white";
                    document.getElementsByClassName("progress_" + _progressCounter)[0].style.backgroundColor = "#C10C06"; /* positive red */
                    document.getElementsByClassName("progress_" + (_progressCounter + 1))[0].style.backgroundColor = "white";
                    break;

                case 3:
                    document.getElementsByClassName("progress_" + (_progressCounter - 2))[0].style.backgroundColor = "white";
                    document.getElementsByClassName("progress_" + (_progressCounter - 1))[0].style.backgroundColor = "white";
                    document.getElementsByClassName("progress_" + _progressCounter)[0].style.backgroundColor = "#C10C06"; /* positive red */
                    break;
            }

            _progressCounter++;
            if (_progressCounter === 4) _progressCounter = 1;
        } catch (error) {

        }
    }, 300);
})();
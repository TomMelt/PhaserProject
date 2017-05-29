var style;

// this is a wrapped function
(function () {

    var defaultColor = "#c8371b",
    highlightColor = "#810000";

    style = {
        navitem: {
            base: {
                font: '40pt SF Compact rounded',
                align: 'left'
            },
            default: {
                fill: defaultColor
            },
            hover: {
                fill: highlightColor
            }
        }
    };

    for (var key in style.navitem) {
        if (key !== "base") {
        Object.assign(style.navitem[key], style.navitem.base)
        }
    }

})();

// the trailing () triggers the function call immediately

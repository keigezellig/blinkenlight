/**
 * Created by developer on 7/20/15.
 */
function BlinkenLight(paper, x, y, radius, colorOn, colorOff, glowColor, tooltipText, clickHandler)
{
    var circleElement = paper.circle(x, y, radius).click(clickHandler);
    if (clickHandler)
    {
        circleElement.hover(function ()
            {
                draw_tooltip(circleElement, 1, tooltipText, x, y);
            },
            function ()
            {
                draw_tooltip(circleElement, 0);
            });
    }

    var radius = radius;
    var paper = paper;

    var colorOn = colorOn;
    var colorOff = colorOff;
    var glowColor = glowColor;
    var interval = 0;
    var intervalId;
    var switchState = false;


    this.setInterval = function (intervalInMilliseconds)
    {
        interval = intervalInMilliseconds;
    }

    this.turnOn = function ()
    {
        switchState = true;
        draw();
    }

    this.turnOff = function ()
    {
        switchState = false;
        draw();
    }

    this.start = function ()
    {
        intervalId = setInterval(function ()
        {
            switchState = !switchState;
            draw();
        }, interval);

    }

    this.stop = function ()
    {
        clearInterval(intervalId);
    }


    var draw_tooltip = function (object, show, text, x, y)
    {
        if (show == 0)
        {
            popup.remove();
            popup_txt.remove();
            transparent_txt.remove();
            return;
        }
        //draw text somewhere to get its dimensions and make it transparent
        transparent_txt = paper.text(100, 100, text).attr({fill: "transparent"});

        //get text dimensions to obtain tooltip dimensions
        var txt_box = transparent_txt.getBBox();

        //draw text
        popup_txt = paper.text(x + txt_box.width, y - txt_box.height - 5, text).attr({
            fill: "black",
            font: "20px sans-serif"
        });

        var bb = popup_txt.getBBox();

        //draw path for tooltip box
        popup = paper.path(
            // 'M'ove to the 'dent' in the bubble
            "M" + (x) + " " + (y) +
                // 'v'ertically draw a line 5 pixels more than the height of the text
            "v" + -(bb.height + 5) +
                // 'h'orizontally draw a line 10 more than the text's width
            "h" + (bb.width + 10) +
                // 'v'ertically draw a line to the bottom of the text
            "v" + bb.height +
                // 'h'orizontally draw a line so we're 5 pixels fro thge left side
            "h" + -(bb.width + 5) +
                // 'Z' closes the figure
            "Z").attr({fill: "yellow"});

        //finally put the text in front
        popup_txt.toFront();

    }

    var draw = function ()
    {
        if (switchState)
        {
            circleElement.attr("fill", colorOn);
            circleElement.attr("stroke", colorOn);

            if (circleElement.theGlow)
            {
                circleElement.theGlow.remove();
            }

            circleElement.theGlow = circleElement.glow(
                {
                    color: glowColor,
                    width: radius + 10,
                    opacity: 0.8,
                    fill: true
                });
        }
        else
        {
            if (circleElement.theGlow)
            {
                circleElement.theGlow.remove();
            }

            circleElement.theGlow = circleElement.glow(
                {
                    color: glowColor,
                    width: radius + 10,
                    opacity: 0.4,
                    fill: true
                });

            circleElement.attr("fill", colorOff);
            circleElement.attr("stroke", colorOff);
        }
    }
}
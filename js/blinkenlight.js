/**
 * Created by developer on 7/20/15.
 */
function BlinkenLight (paper, x, y, radius, colorOn, colorOff, glowColor, clickHandler)
{
    var circleElement = paper.circle(x, y, radius).click(clickHandler);


    var colorOn = colorOn;
    var colorOff = colorOff;
    var glowColor = glowColor;
    var interval = 0;
    var intervalId;
    var switchState = false;


    BlinkenLight.prototype.setInterval = function(intervalInMilliseconds)
    {
        interval = intervalInMilliseconds;
    }

    BlinkenLight.prototype.turnOn = function()
    {
        switchState = true;
        draw();
    }

    BlinkenLight.prototype.turnOff = function()
    {
        switchState = false;
        draw();
    }

    BlinkenLight.prototype.start = function()
    {
        intervalId = setInterval (function()
        {
            switchState = !switchState;
            draw();
        }, interval );

    }

    BlinkenLight.prototype.stop = function()
    {
        clearInterval(intervalId);
    }



    var draw = function()
    {
        if (switchState)
        {
            circleElement.attr("fill",colorOn);
            circleElement.attr("stroke",colorOn);

            if(circleElement.theGlow) {
                circleElement.theGlow.remove();
            }

            circleElement.theGlow = circleElement.glow(
                {
                    color: glowColor,
                    width: 100,
                    opacity: 0.8,
                    fill: true
                });
        }
        else
        {
            if(circleElement.theGlow) {
                circleElement.theGlow.remove();
            }

            circleElement.theGlow = circleElement.glow(
                {
                    color: glowColor,
                    width: 100,
                    opacity: 0.4,
                    fill: true
                });

            circleElement.attr("fill",colorOff);
            circleElement.attr("stroke",colorOff);
        }


    }


}
import { RgbaColorPicker } from "react-colorful";
import { useState, useEffect } from "react";

function ColorSelector({color, setColor, selectedColor, primary, secondary, tertiary, accent}) {
    //use state for RGBAColorPicker
    const [hexColor, setHexColor] =useState("#ffffff")


    function handleColorSet(e) {
        setColor(e)
        let newHex = rgbToHex(e.r, e.g, e.b)
        setHexColor(newHex)
    }

    //colors to Hex
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    function rgbToHex(r, g, b) {
        let r2 = 0
        let g2 = 0
        let b2 = 0

            r2 = parseInt(r, 10)
            g2 = parseInt(g, 10)
            b2 = parseInt(b, 10)

        return "#" + componentToHex(r2) + componentToHex(g2) + componentToHex(b2);
    }

    //colors to RGB
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
        });
    
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
        } : null;
    }

    //sets color values when a swatch is revisited
    useEffect(() => {
        if(selectedColor === "primary") {
            setColor(colorObjectify(primary))
        } else if (selectedColor === "secondary") {
            setColor(colorObjectify(secondary))
        } else if (selectedColor === "tertiary") {
            setColor(colorObjectify(tertiary))
        } else if (selectedColor === "accent") {
            setColor(colorObjectify(accent))
        }
    }, [selectedColor])


    //converts colors back to objects
    function colorObjectify(color) {
        let seperation = color.split(" ");
        let colorObj = {
            r: parseInt(seperation[1], 10),
            g: parseInt(seperation[3], 10),
            b: parseInt(seperation[5], 10),
            a: parseFloat(seperation[7], 10)
        }
        return colorObj
    }

    //Utility functions
    //handles manual RGB changes
    function handleColorChange(e){
        if(e.target.id === "a" && e.target.value <= 1 && e.target.value >= 0){
        let newColor = {...color,[e.target.id]: e.target.value}
        setColor(newColor)
        let newHexColor = rgbToHex(newColor.r, newColor.g, newColor.b)
        setHexColor(newHexColor)
        } else if(e.target.value <= 255 && e.target.value > -1 && e.target.id !== "a") {
        let newColor = {...color,[e.target.id]: e.target.value}
        setColor(newColor)
        let newHexColor = rgbToHex(newColor.r, newColor.g, newColor.b)
        setHexColor(newHexColor)
        } 
    }

    //handles manual hex entries
    function handleHexColorChange(e) {
        setHexColor(e.target.value)

        let newRGBColor = hexToRgb(e.target.value)
        if(newRGBColor === null) {
            setColor({r: 255, g: 255, b: 255, a: 1})
        } else {
            setColor({...newRGBColor, a: 1})
        }
    }


    return (
        <div>
            <div className="RgbaPicker">
            <RgbaColorPicker color={color} onChange={handleColorSet} />
            </div>
            <div className="color-detail-conatiner">
                    <div className="red colorValue">
                        <label htmlFor="r">Red Value</label>
                        <br/>
                        <input id="r" value={color.r} onChange={handleColorChange}/>
                    </div>
                    <div className="green colorValue">
                        <label htmlFor="g">Green Value</label>
                        <br/>
                        <input id="g" value={color.g} onChange={handleColorChange}/>
                    </div>
                    <div className="blue colorValue">
                        <label htmlFor="b">Blue Value</label>
                        <br/>
                        <input id="b" value={color.b} onChange={handleColorChange}/>
                    </div>
                    <div className="transparency colorValue">
                        <label htmlFor="a">Transparency</label>
                        <br/>
                        <input id="a" value={color.a} onChange={handleColorChange}/>
                    </div>
                    <div className="Hex colorValue">
                        <label htmlFor="hex">Hex Value</label>
                        <br/>
                        <input id="hex" value={hexColor} onChange={handleHexColorChange}/>
                    </div>
            </div>
        </div>
    )
}

export default ColorSelector;
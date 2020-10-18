(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        setInterval(updateClock, 10);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var l = "";

            if (h < 12) {
                l = "EL"
            }
            else {
                l = "PL"
            }

            if (h < 1) {
                h = 12;
            }
            else if (h < 13) {
                h = h;
            }
            else {
                h = (h-12);
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + l;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        var linn = document.getElementById("linn");
        var vorm1 = document.getElementById("fname");
        var vorm2 = document.getElementById("lname");
        var radbut1 = document.getElementById("r1");
        var radbut2 = document.getElementById("r2");
        var summa = 0;
        var hasNumber = /\d/;
        
        if (vorm1.value === "") {
            
            alert("Palun sisestage oma eesnimi");
            
            vorm1.focus();
            
            return;
            
            
        }
        if (vorm2.value === "") {
            
            alert("Palun sisestage oma perekonnanimi");
            
            vorm2.focus();
            
            return;
            
            
        }

        if (hasNumber.test(vorm1.value) === true || hasNumber.test(vorm2.value) === true) {
            
            alert("Ees-ja perekonnanimi ei tohi sisestada numbreid");
            
            return;
            
        }

        if (radbut1.checked === false && radbut2.checked === false) {
            
            alert("Palun valige maksemeetod");
            
            return;

        }

        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {

            if (document.getElementById("v1").checked === true) {
                summa += 5;
            }
            if (document.getElementById("v2").checked === true) {
                summa += 1;
            }

            if (linn.value === "tln") {
                summa += 0;
            }
            else if (linn.value === "trt") {
                summa += 2.5;
            }
            else if (linn.value === "nrv") {
                summa += 2.5;
            }
            else if (linn.value === "prn") {
                summa += 3;
            }

            e.innerHTML = summa + " &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;

function GetMap() {
    
    "use strict";

    var ourPoint1 = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    var ourPoint2 = new Microsoft.Maps.Location(
            58.114892, 
            27.047049
        );
    var centerPoint = new Microsoft.Maps.Location(
            (58.114892+58.38104)/2, 
            (26.71992+27.047049)/2
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    var infobox1 = new Microsoft.Maps.Infobox(ourPoint1, {
        visible: false
    });

    var infobox2= new Microsoft.Maps.Infobox(ourPoint2, {
        visible: false
    });

    infobox1.setMap(map);
    infobox2.setMap(map);
    
    var firstpin= new Microsoft.Maps.Pushpin(ourPoint1, {
            title: 'Tartu Ülikool',
        });

        firstpin.metadata = {
            title: 'Tartu Ülikool',
            description: 'Hea koht',
        };

    var secondpin = new Microsoft.Maps.Pushpin(ourPoint2, {
            title: 'Taevaskoja',
        });

        secondpin.metadata = {
            title: 'Taevaskoja',
            description: 'Ka hea koht',
        };
    
    Microsoft.Maps.Events.addHandler(firstpin, 'click', pushpinClicked1);
    Microsoft.Maps.Events.addHandler(secondpin, 'click', pushpinClicked2);


    map.entities.push(firstpin);
    map.entities.push(secondpin);

    function pushpinClicked1(e) {
            infobox1.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        };


    function pushpinClicked2(e) {
        infobox2.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    };
}



// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE


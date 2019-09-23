/*
##################
#   VARIABLES    #
##################

- Is it good practice to put all variables at the top of the file?
*/

const height = document.documentElement.clientHeight;

//  Scrolly variables
var fullDocHeight = document.documentElement.scrollHeight;
var segments = easyGet( "scrolly" );
var scrollPoints = [];
var scrollSpheres = [];
var lowestIndex = 0;
var arrayComparison = [];
var currentScrollPoint = 0;

//  Contact hover button activation
var hoverNotActive = true;

/*
#########################
#   HELPER FUNCTIONS    #
#########################
*/

function easyGet( param ) {
    return document.getElementsByClassName( param );
}

function activeClass() {
    return easyGet( "scroll-indicator__sphere" )[lowestIndex].classList;
}


/* 
##################
#   VISUAL FX    #
##################
*/

function createSkillBubbles() {
    var skillArray = easyGet( "skills__list" )[0].innerHTML.split( " " );
    var skillBubbles = "";

    for ( let i = 0; i < skillArray.length; i++ ) {
        easyGet( "skills__list" )[0].innerHTML = "";
        skillBubbles += "<p class='skills__bubble'>" + skillArray[i] + "</p>";
    }

    easyGet( "skills__list" )[0].innerHTML = skillBubbles;
}

function contactHover( image ) {
    if ( hoverNotActive ) {
        var a = image.classList[0];
        var b = a + "__child";
        var child = easyGet( b )[0];
        var childClass = child.classList;

        if ( childClass[0].indexOf( "underbar" ) == -1 ) {
            childClass.add( "underbar" );
            hoverNotActive = false;
        }

        image.onmouseout = function () {
            hoverNotActive = true;
            childClass.remove( "underbar" );
        };

        // Debugging:
        // console.log( b );
        // console.log( childClass[0].indexOf( "underbar" ) );
    }
}


/* 
##################
#   INTERFACE    #
##################

- openmenu() can be optimized

*/

//  Scale the hero image to fit viewport perfectly
function getNewHeight() {
    var firstsegment = easyGet( "segment__home" )[0];
    var newHeight = height + "px";
    firstsegment.style.height = newHeight;
}

//  Very buggy menu code
function openmenu() {
    var menu = document.getElementById( "menu_id" );

    switch ( menu.classList[1] ) {
        case undefined:
            console.log( "First click, baby!" );
            menu.classList.toggle( "nav__menu--active" );
            menu.style.display = "block";
            break;
        default:
            console.log( "Menu changed" );
            menu.classList.toggle( "nav__menu--active" );
            menu.classList.toggle( "nav__menu--collapsed" );
            break;
    }
}

//  Scrolling sphere indicator
async function scrollIndicator() {
    var x = easyGet( "scrolly" ).length;
    var y = easyGet( "scroll-indicator__sphere" )[0];
    var z = '<div class="scroll-indicator__sphere"></div>';

    for ( let i = 0; i < x - 1; i++ ) {
        y.insertAdjacentHTML( 'afterend', z );
    }

    console.log( "Spheres generated: " + x )
    return true;
}

async function fillScrollPoints() {
    for ( var i = 0; i <= segments.length; i++ ) {
        scrollPoints.push( segments[i].offsetTop );
    }

    console.log( "Scroll points generated" );
}

function scrollHeightCheck( param ) {
    var temp = [];

    for ( var x = 0; x < scrollPoints.length; x++ ) {
        temp.push( Math.abs( Math.round( ( height / 2 ) - segments[x].getBoundingClientRect().top ) ) );
    }

    arrayComparison = temp;

    lowestIndex = arrayComparison.indexOf( Math.min.apply( null, arrayComparison ) );

    /* Experimental fill spheres if refresh on specific scrollpoint */

    /* Logic:
        - If sphere is not blue and closest scrollpoint = current scrollpoint, make blue  
        - If sphere is already blue and closest scrollpoint = current scrollpoint, do nothing
        - If sphere is already blue and closest scrollpoint != current scrollpoint, remove blue & update scrollPoint
            - remove blue of current scrollpoint
            - set blue on scrollpoint
            - set current scrollpoint to scrollpoint

        Additional logic:
        - Sphere's that are between scrollpoint 0 and current scrollpoint should be made blue*/

    if ( activeClass()[1] == undefined ) {
        activeClass().add( "scroll-indicator__sphere--active" );
        currentScrollPoint = scrollPoints[lowestIndex];

    } else if ( activeClass()[1] !== undefined ) {
        easyGet( "scroll-indicator__sphere" )[scrollPoints.indexOf( currentScrollPoint )]
            .classList.remove( "scroll-indicator__sphere--active" );
        activeClass().add( "scroll-indicator__sphere--active" );
        currentScrollPoint = scrollPoints[lowestIndex];
    }

    // Debugging: 
    //console.log( "Lowest index: " + lowestIndex );
    //console.log( "Scrollpoint: " + scrollPoints[lowestIndex] );
    ///*console.log( "Current Scrollpoint: " + currentScrollPoint ); */
    ///* console.log( "Array: " + arrayComparison ); */

    if ( param == true ) { console.log( "Sphere color change initiated" ); }
}

function scrollSphereHistory( param ) {
    var scrollSpheres = Array.from( document.querySelector( "aside" ).children );

    scrollSpheres[0].classList.add( "scroll-indicator__sphere--active" );

    for ( var i = 0; i <= lowestIndex; i++ ) {
        scrollSpheres[i].classList.add( "scroll-indicator__sphere--active" );
    }

    // Debugging:
    if ( param == true ) { console.log( "Sphere history initiated" ); }

}


/*
##################
#   INITIALIZE    #
##################
*/

window.onload = function () {
    console.log( "load initialized" );

    /*  console.log( "Full document height: " );
     console.log( fullDocHeight );
     console.log( "Scroll points: " );
     console.log( scrollPoints );
     console.log( "Scroll spheres: ");
     console.log( scrollSpheres );
     console.log( "Lowest index: " );
     console.log( lowestIndex );
     console.log( "Array comparison: " );
     console.log( arrayComparison );
     console.log( "Current scroll point: " );
     console.log( currentScrollPoint ); */

    getNewHeight();
    createSkillBubbles();
    scrollIndicator().then( scrollSphereHistory( true ) );
    fillScrollPoints().then( scrollHeightCheck() );
}

window.onscroll = function () {
    scrollHeightCheck();
    scrollSphereHistory();
}
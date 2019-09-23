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

        console.log( b );
        console.log( childClass[0].indexOf( "underbar" ) );
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
    console.log( "New height calculated" );
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
function scrollIndicator() {
    var x = easyGet( "scrolly" ).length;
    var y = easyGet( "scroll-indicator__sphere" )[0];
    var z = '<div class="scroll-indicator__sphere"></div>';

    for ( let i = 0; i < x - 1; i++ ) {
        y.insertAdjacentHTML( 'afterend', z );
    }
}

function fillScrollPoints() {
    for ( var i = 0; i <= segments.length; i++ ) {
        scrollPoints.push( segments[i].offsetTop );
    }
}

function scrollHeightCheck() {
    var temp = [];

    for ( var x = 0; x < scrollPoints.length; x++ ) {
        temp.push( Math.abs( Math.round( ( height / 2 ) - segments[x].getBoundingClientRect().top ) ) );
    }

    arrayComparison = temp;

    lowestIndex = arrayComparison.indexOf( Math.min.apply( null, arrayComparison ) );

    /* Logic:
        - If sphere is not blue and closest scrollpoint = current scrollpoint, make blue  
        - If sphere is already blue and closest scrollpoint = current scrollpoint, do nothing
        - If sphere is already blue and closest scrollpoint != current scrollpoint, remove blue & update scrollPoint
            - remove blue of current scrollpoint
            - set blue on scrollpoint
            - set current scrollpoint to scrollpoint
    */
    if ( activeClass()[1] == undefined ) {
        activeClass().add( "scroll-indicator__sphere--active" );
        currentScrollPoint = scrollPoints[lowestIndex];
    } else if ( activeClass()[1] !== undefined ) {
        easyGet( "scroll-indicator__sphere" )[scrollPoints.indexOf( currentScrollPoint )]
            .classList.remove( "scroll-indicator__sphere--active" );
        activeClass().add( "scroll-indicator__sphere--active" );
        currentScrollPoint = scrollPoints[lowestIndex];
    }

    /* Debugging:  */
    /* console.log( "Lowest index: " + lowestIndex ); */
    /* console.log( "Scrollpoint: " + scrollPoints[lowestIndex] );*/
    /*console.log( "Current Scrollpoint: " + currentScrollPoint ); */
    /* console.log( "Array: " + arrayComparison ); */
}


/*
##################
#   INITIALIZE    #
##################
*/

window.onload = function () {
    getNewHeight();
    createSkillBubbles();
    scrollIndicator();
    fillScrollPoints();
    scrollHeightCheck();
    console.log( "load initialized" );
}

window.onscroll = function () {
    scrollHeightCheck();
    console.log( "Scroll initialized" );
}
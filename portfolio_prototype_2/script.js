/* 
###########################
#   Variables             #
###########################
*/

var height = document.documentElement.clientHeight;

/* 
###########################
#   Helper functions      #
###########################
*/

function easyGet( name ) {
    return document.getElementsByClassName( name )[0];
}


/* 
###########################
#   Visuals               #
###########################
*/

function createSkillBubbles() {
    var skillArray = easyGet( "skills__list" ).innerHTML.split( " " );
    var skillBubbles = "";

    for ( let i = 0; i < skillArray.length; i++ ) {
        easyGet( "skills__list" ).innerHTML = "";
        skillBubbles += "<p class='skills__bubble'>" + skillArray[i] + "</p>";
    }

    easyGet( "skills__list" ).innerHTML = skillBubbles;
}

/* 
###########################
#   Layout                #
###########################
*/

function getNewHeight() {
    var firstsegment = easyGet( "segment__home" );
    var newHeight = height - 64 + "px";
    firstsegment.style.height = newHeight;
    console.log( "New height calculated" );
}

/* function getSideWidth() {
    //  Item selection
    var numProjects = document.querySelectorAll( ".wideThumb__wrapper" ).length;
    var side = document.querySelectorAll( ".projects__side" );
    var center = easyGet( "projects__center" );

    //  Width calc
    var width = window.screen.width;
    var centerWidth = 416 *
        ( Math.floor( width / 416 ) < numProjects ? Math.floor( width / 416 ) : numProjects );

    //  Final width
    var newWidth = ( width - centerWidth ) / 2;

    //  Assigning width
    center.style.width = centerWidth + "px";

    for ( let i = 0; i < side.length; i++ ) {
        side[i].style.width = newWidth + "px";
    }

    //  Logging
    console.log( newWidth );
} */

function openmenu() {
    var menu = easyGet( "nav__menu" );

    switch ( menu.classList[1] ) {
        case undefined:
            console.log( "First click, baby!" );
            menu.classList.toggle( "nav__menu--active" );
            break;
        default:
            console.log( "Menu changed" );
            menu.classList.toggle( "nav__menu--active" );
            menu.classList.toggle( "nav__menu--collapsed" );
            break;
    }

}
var height = document.documentElement.clientHeight;

function createSkillBubbles() {
    var skillArray = document.getElementsByClassName( "skills__list" )[0].innerHTML.split( " " );
    var skillBubbles = "";

    for ( let i = 0; i < skillArray.length; i++ ) {
        document.getElementsByClassName( "skills__list" )[0].innerHTML = "";
        skillBubbles += "<p class='skills__bubble'>" + skillArray[i] + "</p>";
    }

    document.getElementsByClassName( "skills__list" )[0].innerHTML = skillBubbles;
}

//  FUNCTIONS
function getNewHeight() {
    var firstsegment = document.getElementsByClassName( "segment__home" )[0];
    var newHeight = height + "px";
    firstsegment.style.height = newHeight;
    console.log( "New height calculated" );
}

/* function getSideWidth() {
    //  Item selection
    var numProjects = document.querySelectorAll( ".wideThumb__wrapper" ).length;
    var side = document.querySelectorAll( ".projects__side" );
    var center = document.getElementsByClassName( "projects__center" )[0];

    //  Width calc
    var width = window.screen.width;
    var tileWidth = 416;
    var multiple = Math.floor( width / tileWidth );
    var checkIfZero = function ( parm ) {
        if ( multiple == 0 ) {
            return 1 * parm;
        } else if ( multiple != 0 && multiple < numProjects ) {
            return multiple * parm;
        }
    }

    var centerWidth = checkIfZero( tileWidth );

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
    var menu = document.getElementById( "menu_id" );

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
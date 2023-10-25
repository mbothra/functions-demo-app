// components/pokemonBattle/MenuNavigation.jsx

import React, { useEffect } from 'react';

const MenuNavigation = () => {

  useEffect(() => {
    const snd = new Audio("/ruby_0005.wav");
    const snd2 = new Audio("/ruby_0005.wav");
    snd2.play();

    let cursorPosition = 0;
    const menuItems = document.querySelectorAll(".menuHalf");
    menuItems[cursorPosition].classList.add("theFocus");

    function updateCursor(current, modifier) {
      snd.play();

      if ((current + modifier <= 3) && (current + modifier >= 0)) {
        menuItems[current].classList.remove("theFocus");
        cursorPosition = current + modifier;
        menuItems[cursorPosition].classList.add("theFocus");
      }
    }

    const handleKeyDown = (e) => {
      switch(e.which) {
          case 37: updateCursor(cursorPosition, -1); break;
          case 38: updateCursor(cursorPosition, -2); break;
          case 39: updateCursor(cursorPosition, 1); break;
          case 40: updateCursor(cursorPosition, 2); break;
          default: return;
      }
      e.preventDefault();
    }

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  // Render component UI here (if any)
  return null; 
}

export default MenuNavigation;

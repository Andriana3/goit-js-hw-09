!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=null;function n(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}e.setAttribute("disabled","true"),t.addEventListener("click",(function(){document.body.style.backgroundColor=n(),t.setAttribute("disabled","true"),e.removeAttribute("disabled"),r=setInterval((function(){document.body.style.backgroundColor=n()}),1e3)})),e.addEventListener("click",(function(){t.removeAttribute("disabled"),e.setAttribute("disabled","true"),clearInterval(r)}))}();
//# sourceMappingURL=01-color-switcher.d152e238.js.map

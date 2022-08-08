'use strict';

let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    // console.log(this);
    /* Toggle between hiding and showing the active panel */
    
    let panel = this.nextElementSibling;
    // if (panel.style.display === "block") {
    //     panel.style.display = "none";
    // } else {
    //     panel.style.display = "block";
    // }


      // for slide down
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;       
      } else {
        // acc.classList.toggle("active"); 待改
        let accAll= this.closest("ul").querySelectorAll("button.accordion")
        console.log(accAll);
        accAll.forEach(function (item, i) {
          item.classList.remove("active");
        })


        let olAll = this.closest("ul").querySelectorAll("ol");
        olAll.forEach(function (item, i) {
          item.style.maxHeight = null;
        });
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
    this.classList.toggle("active");
  });
}


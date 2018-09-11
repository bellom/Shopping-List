
    const check_btn = "<input type='checkbox' class='check'></input>";
    const del_btn = '<button class= "glyphicon glyphicon-remove" id="delete"></button>';

    function loaditems() {
      let uncheckedItems = JSON.parse(localStorage.getItem('unchecked'));
      let checkedItems = JSON.parse(localStorage.getItem('checked'));

      // set defaults if nothing is existing 

      if(!uncheckedItems){
        uncheckedItems = [];
        localStorage.setItem('unchecked', JSON.stringify(uncheckedItems));
      }

      if(!checkedItems){
        checkedItems = [];
        localStorage.setItem('checked', JSON.stringify(checkedItems));
      }

      showItem(uncheckedItems, '.unchecked');
      showItem(checkedItems, '.checked')
      $("#input").val('').focus();

    }



    function addBtn(){
        let item = $("#input").val();
        for (i in item){
           if(item.length > 16){
              alert('item name to long');
              return false;
           } 
        }
        let uncheckedItems = JSON.parse(localStorage.getItem('unchecked'));
        uncheckedItems.push(item);
        localStorage.setItem('unchecked', JSON.stringify(uncheckedItems));
        showItem(uncheckedItems, '.unchecked');    
    }

     function showItem(items, type){
          let i = 0;
          for(i = 0; i < items.length; i++){
            $(type).append(`<li> ${items[i]} ${del_btn}  ${check_btn} </li>`);
            let ischecked = '.checked'
            if (type == ischecked) {
               $(".checked input[type='checkbox']").attr('checked','checked');
           }
          }
      }

    // Instruction - Update your local storage, ensure the deleted item is removed from the unchecked array

    // delete unchecked Item (on both DON and localStorage)
    $('.unchecked').on('click', '#delete', function(){
    // 1.remove item from DOM
        let item = $(this).parent().text().trim();
        $(this).parent().remove();
    // 2. get the localstorage by using method getItem;
        let uncheckedItems = JSON.parse(localStorage.getItem('unchecked'));
    // 3. get the index of the item to remove using trim();   
        let index = uncheckedItems.indexOf(item);
        uncheckedItems.splice(index, 1);
    // 4. set back the localstorage using setItem;
        localStorage.setItem('unchecked', JSON.stringify(uncheckedItems));
      });


    // if item is checked move item to checked list and if unchecked move item to unchecked list
      $('ul').on('change', '.check', function(){
        if ($(this).is(':checked') ) {
    //remove item from the DOM....................
          let item = $(this).parent().text().trim();
          $(this).parent().remove();
          $('.checked').append(`<li ischecked> ${check_btn} ${item} ${del_btn} </li>`);
    // Now i make changes to the localStorage......................
    //1. get array uncheckedItems;
            let uncheckedItems = JSON.parse(localStorage.getItem('unchecked'));
    //2. get the index of the item and remove the item;   
            let index = uncheckedItems.indexOf(item);
            uncheckedItems.splice(index, 1);
    //3. set back the uncheckedItems;
            localStorage.setItem('unchecked', JSON.stringify(uncheckedItems));
            let checkedItems = JSON.parse(localStorage.getItem('checked'));
            checkedItems.push(item);
            $(".checked input[type='checkbox']").attr('checked','checked');
            localStorage.setItem('checked', JSON.stringify(checkedItems));
        } else {
    //remove item from the DOM....................
            let item = $(this).parent().text().trim();
            $(this).parent().remove();
            $('.unchecked').append(`<li> ${check_btn} ${item} ${del_btn} </li>`);
    // Now i make changes to the localStorage......................
            let uncheckedItems = JSON.parse(localStorage.getItem('unchecked'));
            uncheckedItems.push(item);
            localStorage.setItem('unchecked', JSON.stringify(uncheckedItems));
            let checkedItems = JSON.parse(localStorage.getItem('checked'));
            let index = checkedItems.indexOf(item);
            checkedItems.splice(index, 1);
            localStorage.setItem('checked', JSON.stringify(checkedItems));
        } 
      });


        $('.checked').on('click', '#delete', function(){
        // 1.remove item from DOM
            let item = $(this).parent().text().trim();
            $(this).parent().remove();
        // 2. get the localstorage by using method getItem;
            let checkedItems = JSON.parse(localStorage.getItem('checked'));
        // 3. get the index of the item to remove using trim();   
            let index = checkedItems.indexOf(item);
            checkedItems.splice(index, 1);
        // 4. set back the localstorage using setItem;
            localStorage.setItem('checked', JSON.stringify(checkedItems));
          });
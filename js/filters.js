$( function() {
  // init Isotope
  var $container = $('.isotope').isotope({
    itemSelector: '.portfolio-item'
  });

  function getFilters(categories) {
      categories = $('#filters').find('.btn-group');
      var filters = "";

      for (cID = 0; cID < categories.length; cID++) { 
          var selectors = $(categories[cID]).find('.active');
          for (sID = 0; sID < selectors.length; sID++) { 
            var selector = $(selectors[sID]).attr('data-filter');
            if (selector == '.any') {
              break;
            }
            filters = filters + selector;
          }
          filters = filters + "/";
      }    
      return filters;
  };

  function containsFilter(categories, itemCategories) {
    if( categories == "" )
      return true;

    for (var itemCategoryID = itemCategories.length - 1; itemCategoryID >= 0; itemCategoryID--) {
      var itemCategory = itemCategories[itemCategoryID]
      if( categories.indexOf(itemCategory) > -1 ) {
        return true;
      }
    };

    return false;
  };

  function runFilter() {
    setTimeout(function() {
      var filtersByCategory = getFilters().split('/');

      $container.isotope({ filter: function() {
      
        // `this` is the item element. Get text of element's .number
        //var number = $(this).find('.number').text();
        var filterString = $(this).attr('filter');
        if(filtersByCategory.length > 0 && filterString == undefined) {
          return false;
        }

        var itemCategories = filterString.split(' ');

        for(var filterByCategoryID = 0; filterByCategoryID < filtersByCategory.length; filterByCategoryID++ ) {
          var filterByCategory = filtersByCategory[filterByCategoryID];
          if( !containsFilter(filterByCategory, itemCategories) ) {
            return false;
          }
        }

        // return true to show, false to hide
        return true;
      
      } });
    }, 100);
  };

  $('#filters').on( 'click', '.btn', function() {
    runFilter();
  });

  runFilter();

    // change is-checked class on buttons
    /*$('.btn-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'btn', function() {
        $buttonGroup.find('.checked').removeClass('checked');
        $( this ).addClass('checked');
      });
    });*/
  
});

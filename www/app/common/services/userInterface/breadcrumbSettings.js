angular.module('swift.services')
    .factory('$controlBreadcrumb', controlBreadcrumb);


controlBreadcrumb.$inject = ['$rootScope', '$state'];

function controlBreadcrumb($rootScope, $state) {
    var obj = {
        element: "",
        pageWidth: "",
        breadcrumbItemWidth: ""
    }


    /*
     * control page colors and the floating button 
     * usage: $watchState.getState();
     */
    var initialize = function(element, contentId, slidercontainerId, sliderId) {
        obj.element = element;
        obj.pageWidth = window.innerWidth;

        setupSliderContent(contentId, slidercontainerId, sliderId);

        // setupBreadcrumb();

    }

    function setupBreadcrumb() {
        // obj.element.children().children().css('width', obj.breadcrumbItemWidth + 'px');
    }


    /*
     * set the slider content responsive
     * setupSliderContent(contentId, slidercontainerId, sliderId);
     */
    function setupSliderContent(contentId, slidercontainerId, sliderId) {
        var newpolls_content, slider_content;

        console.log(contentId + " " + slidercontainerId + " " + sliderId);

        // angular.element('ion-view').last().find('#slider-content').css('width', '400px');

        // angular.forEach(angular.element('ion-view'), function(item) {
                // console.log(item.getAttribute('nav-view') === 'active');
                // console.log(item.getAttribute('nav-view') === 'active');
                 // console.log(item);
                 // console.log(item.getAttribute('nav-view') === 'active');
                 // console.log(item.getAttribute('nav-view').value);
                 // console.log(item.attributes);

                // if (item.getAttribute('nav-view') === 'active') {

                // polls_content = angular.element('ion-view').last().find(contentId);
                // slider_content = angular.element('ion-view').last().find(sliderId);
                // slider_container = angular.element('ion-view').last().find(slidercontainerId);
                // console.log(sliderId);
                // slider_content.css('width', obj.pageWidth * 2 + 'px');


                // console.log(slider_content);
                // console.log('===================================');
            // }


            // if(item.getAttribute('nav-view') != 'active'){
                polls_content = angular.element('ion-view').last().find(contentId);
                slider_content = angular.element('ion-view').last().find(sliderId);
                slider_container = angular.element('ion-view').last().find(slidercontainerId);

                slider_content.css('width', obj.pageWidth * 2 + 'px');

                console.log(angular.element('ion-view').last().find(sliderId).children());

                slider_content.children().css('width', obj.pageWidth + 'px');
                if (contentId != '#statistics-content') {
                    console.log(polls_content);
                    slider_content.children().css('height', (polls_content.height() - 100) + 'px');

                }

                slider_content.children().css('overflow', 'auto');

                slider_container.css('width', obj.pageWidth + 'px');

                slider_content.css('display', 'block');
            // }
        // });

    //     if (angular.element('ion-view').last().attr('nav-view') == 'active') {

    //         console.log(angular.element(item).find(contentId));

    //         polls_content = angular.element(item).find("#newpolls-content");
    //         slider_content = angular.element(item).find("#slider-content");
    //         slider_container = angular.element(item).find('#slider-container');

    //         slider_content.css('width', obj.pageWidth * 2 + 'px');

    //         console.log(angular.element(item).find(sliderId).children());

    //         angular.element(item).find(sliderId).children().css('width', obj.pageWidth + 'px');
    //         if (contentId != '#statistics-content') {
    //             console.log(polls_content);
    //             angular.element(item).find(sliderId).children().css('height', (polls_content.height() - 100) + 'px');

    //         }

    //         angular.element(item).find(sliderId).children().css('overflow', 'auto');

    //         slider_container.css('width', obj.pageWidth + 'px');

    //         angular.element(item).find(sliderId).css('display', 'block');
    //     }
    // })

    // polls_content = angular.element(contentId);
    // slider_content = angular.element(sliderId);
    // console.log(obj.pageWidth);
    // console.log(slider_content);
    // slider_content.css('width', obj.pageWidth * 2 + 'px');
    // console.log(slider_content);

    // slider_content.children().css('width', obj.pageWidth + 'px');
    // if (contentId != '#statistics-content') {
    //     console.log(polls_content);
    //     slider_content.children().css('height', (polls_content.height() - 100) + 'px');

    // }
    // slider_content.children().css('overflow', 'auto');

    // slider_container.css('width', obj.pageWidth + 'px');

    // slider_content.css('display', 'block');


}


/*
 * slide the content
 * function - change content depends on breadcrumb
 * usage: $watchState.slidingPageContent();
 */
var slidingPageContent = function(index, sliderId) {
    var slider_content;

    angular.forEach(angular.element('ion-view'), function(item) {
        if (angular.element(item).attr('nav-view') == 'active') {
            console.log(angular.element(item).find(sliderId))
            slider_content = angular.element(item).find(sliderId);
        }
    })



    slider_content.css("transform", "translateX(-" + index * obj.pageWidth + "px)");
}



return {
    initialize: initialize,
    slidingPageContent: slidingPageContent

}

}

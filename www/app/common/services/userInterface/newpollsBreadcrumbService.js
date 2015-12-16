angular.module('swift.services')
    .factory('$newpollBreadcrumb', newpollBreadcrumb);


newpollBreadcrumb.$inject = ['$rootScope', '$state', '$controlBreadcrumb'];

function newpollBreadcrumb($rootScope, $state, $controlBreadcrumb) {
    var step_one, step_two, nextbtn, previosbtn, savebtn, sharebtn;

    /*
     * control the new poll breadcrumb
     * function - active to questioner form
     * usage: $newpollBreadcrumb.activeQuestionForm();
     */
    var activeQuestionForm = function(sliderId) {
            step_one = angular.element('#step-one'); // breadcrumb first page - question form
            step_two = angular.element('#step-two'); // breadcrumb second page -organization list page
            
            step_two.addClass('disabled');
            step_one.removeClass('disabled');

            activeQuestionFormButtons();

            $controlBreadcrumb.slidingPageContent(0, sliderId);
        }

        /*
         * control the new poll breadcrumb
         * function - active to organization list
         * usage: $newpollBreadcrumb.activeOrganizationForm();
         */
    var activeOrganizationForm = function(sliderId) {
            step_one = angular.element('#step-one'); // breadcrumb first page - question form
            step_two = angular.element('#step-two'); // breadcrumb second page -organization list page

            step_one.addClass('disabled');
            step_two.removeClass('disabled');

            activeOrganizationFormButtons();

            $controlBreadcrumb.slidingPageContent(1, sliderId);
        }

        /*
         * change the active button in question form
         * activeQuestionFormButtons();
         */
    var activeQuestionFormButtons = function() {

            nextbtn = angular.element('#next-btn'); // next button in question form
            previosbtn = angular.element('#previous-btn');
            savebtn = angular.element('#save-poll'); // save poll button in question form
            sharebtn = angular.element('#share-poll'); //share  button in oraganization lis page

            nextbtn.css('display', 'block');
            previosbtn.css('display', 'none');
            savebtn.css('display', 'block');
            sharebtn.css('display', 'none');
        }

        /*
         * change the active button in organization list pageßß
         * activeOrganizationFormButtons()
         */
    var activeOrganizationFormButtons = function() {
        step_one = angular.element('#step-one'); // breadcrumb first page - question form
        step_two = angular.element('#step-two'); // breadcrumb second page -organization list page
        nextbtn = angular.element('#next-btn'); // next button in question form
        previosbtn = angular.element('#previous-btn');
        savebtn = angular.element('#save-poll'); // save poll button in question form
        sharebtn = angular.element('#share-poll'); //share  button in oraganization lis page

        nextbtn.css('display', 'none');
        previosbtn.css('display', 'block');
        savebtn.css('display', 'none');
        sharebtn.css('display', 'block');
    }


    return {
        activeQuestionForm: activeQuestionForm,
        activeOrganizationForm: activeOrganizationForm
    }

}

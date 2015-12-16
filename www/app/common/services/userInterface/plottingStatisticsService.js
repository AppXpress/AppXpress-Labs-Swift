angular.module('swift.services')
    .factory('$plotStaisticsService', plotStaisticsService);


plotStaisticsService.$inject = ['$rootScope', '$state'];

function plotStaisticsService($rootScope, $state) {
    var obj = {
        answercount: '',
        organswercount: ''
    }

    /*
     * Manipulate the data as the format of 
     * Usage : $plotStaisticsService.manipulateData(data, answer)
     * obj={
     *  name="",    data name
     *  y="",       data percentage
     *  count="",   data count
     * legendcolor  legend color
     * }
     */
    var manipulateData = function(data, answer) {
        //console.log(id);
        var total, i = 0,
            chartdata = [],
            piechartdata = [];

        chartdata = data;

        // calculate total number of answer for show the statistics on answer
        // getTotalCountofAnswers(data, true)
        total = getTotalCountofAnswers(data, answer);

        // if (answer == true) ? manupulate answer data : manupulate oranizational dala
        if (answer) {
            obj.answercount = total;

            angular.forEach(chartdata, function(item) {
                var count = 0,
                    name = '';

                angular.forEach(item, function(value, key) {
                    // answer count
                    if (key == 'answerCount') {
                        count = value;
                    }
                    // answer value
                    if (key == 'txtValue') {
                        name = value;
                    }
                });

                var obj = {
                    name: name,
                    y: calculatePercentage(count, total),
                    count: count,
                    legendcolor: getColors(i)
                }
                i++;
                piechartdata.push(obj);

            });

            return piechartdata;

        } else {
            obj.organswercount = total;

            angular.forEach(chartdata, function(item) {
                var count = 0,
                    name = '';
                // angular.forEach(item, function(value, key) {

                // answer count
                if (item.answerCount) {
                    count = item.answerCount;
                }

                var obj = {
                    name: (item.participantOrg && item.participantOrg.name) ? item.participantOrg.name : 'no name',
                    y: calculatePercentage(count, total),
                    count: count,
                    legendcolor: getColors(i)
                }
                i++;
                piechartdata.push(obj);

            });

            return piechartdata;
        }


    }

    /* 
     * Calculate the total number of answer
     * Usage : $plotStaisticsService.getTotalCountofAnswers(data, answer)
     */
    var getTotalCountofAnswers = function(data, answer) {
        var total = 0,
            chartdata = data;

        // if (answer == true) ? get total of answer count : get total of answer count in oranizational level 
        if (answer) {
            angular.forEach(chartdata, function(item) {
                angular.forEach(item, function(value, key) {
                    var count = 0;

                    if (key == 'answerCount') {
                        count = parseInt(value);
                    }

                    total += count;

                });
            });
        } else {
            angular.forEach(chartdata, function(item) {
                var count = 0;

                if (item.answerCount) {
                    count = item.answerCount;
                }

                total += count;

            });
        }

        return total;
    }


    /* 
     * Calculate the percentage per answer
     * calculatePercentage(count,total)
     */
    var calculatePercentage = function(count, total) {

        var percentage = (count / total) * 100;
        return percentage;

    }


    /* 
     * Get color of legend
     * getColors(index)
     */
    var getColors = function(index) {
        var base = Highcharts.getOptions().colors[index];
        return base;
    }


    /* 
     * Get total count of answers in answer level and org level
     * usage: getTotalCountofAnswers.getAnswercount()
     */
    var getAnswercount = function() {

        return obj
    }

    /* 
     * Draft the pie chart
     * usage: getTotalCountofAnswers.draftPieChart()
     * params: id, data, backgroundColor, answer
     */
    var draftPieChart = function(id, data, background_color, answer) {
        var chartdata,count;

        // manipulate data
        chartdata = manipulateData(data, answer);

        // get total answer count
        count = getAnswercount();


        // if(count) ? draw graph : show no statistics label
        if (angular.element('#container' + id) && count.answercount > 0) {

            angular.element('#container' + id).highcharts({
                chart: {
                    type: 'pie',
                    plotBackgroundColor: background_color,
                    margin: [0, 0, 0, 0],
                    spacingTop: 0,
                    spacingBottom: 0,
                    spacingLeft: 0,
                    spacingRight: 0
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                // subtitle: {
                //     text: 'Click the slices to view versions. Source: netmarketshare.com.'
                // },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    //align: 'right',
                    // verticalAlign: 'top',
                    y: 30,
                    navigation: {
                        activeColor: '#3E576F',
                        animation: true,
                        arrowSize: 12,
                        inactiveColor: '#CCC',
                        style: {
                            fontWeight: 'bold',
                            color: '#333',
                            fontSize: '12px'
                        }
                    }
                },
                showInLegend: true,
                tooltip: {
                    //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}%</b><br/>'
                },
                series: [{
                    name: "Answer Count",
                    colorByPoint: true,
                    data: chartdata
                }]

            });


        } else {
            
            document.getElementById('container' + id).style.display = 'none';
            document.getElementById('no_data' + id).style.display = 'block';
            //return;
        }

    }

    return {
        draftPieChart: draftPieChart,
        manipulateData: manipulateData,
        getAnswercount: getAnswercount,
        getTotalCountofAnswers: getTotalCountofAnswers

    }

}

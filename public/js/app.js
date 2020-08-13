// Dom7
var $ = Dom7;   

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
    id: 'io.framework7.testapp',
    root: '#app',
    theme: 'md',
    data: function () {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
        };
    },
    methods: {
        helloWorld: function () {
            app.dialog.alert('Hello World!');
        },
    },
    routes: routes,
    popup: {
        closeOnEscape: true,
    },
    sheet: {
        closeOnEscape: true,
    },
    popover: {
        closeOnEscape: true,
    },
    actions: {
        closeOnEscape: true,
    },

    smartSelect: {
        pageTitle: 'Select Option',
        openIn: 'popup',
    }

});

setTimeout(function () {
    $('.loader-screen').hide();
}, 2000);
//$('.introduction').css('min-height', 'calc(100vh - 58px)' )

$(document).on('page:init', function (e) {
    /* background image to cover */
    $('.background').each(function () {
        var imagewrap = $(this);
        var imagecurrent = $(this).find('img').attr('src');
        if (imagecurrent != undefined || imagecurrent != null) {
            imagewrap.css('background-image', 'url("' + imagecurrent + '")');
            $(this).find('img').remove();
        }

    });


    $('.page-content').on('scroll', function () {
        /* header active on scroll more than 50 px*/
        if ($(this).scrollTop() >= 30) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active')
        }
    });


});

$(document).on('page:init', '.page[data-name="thankyou"]', function (e) {
    setTimeout(function () {
        app.views.main.router.navigate('/homepage/');
    }, 2000)

});
$(document).on('page:init', '.page[data-name="homepage"]', function (e) {

    /* chart js */
    var ctx = document.getElementById("linechart").getContext('2d');

    var gradient2 = ctx.createLinearGradient(0, 0, 0, 200);
    gradient2.addColorStop(0, 'rgba(151, 94, 251, 0.40)');
    gradient2.addColorStop(1, 'rgba(91, 168, 255, 0.40)');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
            datasets: [{
                label: ' Used MB',
                backgroundColor: gradient2,
                data: [65, 70, 60, 90, 75, 100, 130, 120, 150],
                borderColor: "rgba(151, 94, 251, 0.40)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderWidth: 2,
                borderDashOffset: 1,
                borderJoinStyle: 'bevel',
                pointBorderColor: "#ffffff",
                pointBackgroundColor: "#7b65f4",
                pointBorderWidth: 1,
                pointHoverRadius: 2,
                pointHoverBackgroundColor: "#000000",
                pointHoverBorderColor: "#ffffff",
                pointHoverBorderWidth: 0,
                pointRadius: 2,
                pointHitRadius: 6,
                    }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: false,
                text: 'Chart.js  Line Chart',
            },
            legend: {
                display: false,
                labels: {
                    fontColor: "#888888"
                }
            },
            scales: {
                yAxes: [{
                    display: false,
                    ticks: {
                        fontColor: "#888888",
                        beginAtZero: true,
                    },
                    gridLines: {
                        color: "rgba(160,160,160,0.1",
                        zeroLineColor: "rgba(160,160,160,0.15)"
                    }
                        }],
                xAxes: [{
                    display: false,
                    ticks: {
                        fontColor: "#888888"
                    },
                    gridLines: {
                        color: "rgba(160,160,160,0.1)",
                        zeroLineColor: "rgba(160,160,160,0.15)"
                    }
                        }]
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
});

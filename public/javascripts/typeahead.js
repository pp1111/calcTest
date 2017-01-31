$(document).ready(function () {
    $('#searcharea').autocomplete({
        source: (req, res) => {
            $.ajax({
                url: "http://localhost:4000/search/data?q=" + decodeURIComponent(req.term.replace(/ /g,"-")),
                dataType: "jsonp",
                type: "GET",
                data: {
                    term: req.term
                }
            }).done((data) =>{
                data = data.response.docs;
                res($.map(data, (item) =>{
                    return {
                        value: item.value.replace(/-/g," ")
                    };
                }));
            }).fail(function (data) {
                alert('error');
            });
        },
        select: (event, ui) => {
            let redirect = ui.item.label.replace(/ /g,"-");
            window.location.href = `/finanse/produkt/${decodeURIComponent(redirect)}`;
        }
    });

    $("#searcharea").autocomplete("search");
});

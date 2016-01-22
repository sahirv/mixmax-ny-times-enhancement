$(document).ready(function() {
    var items;
    $('#search-go').on('click', function(){
        var searchItem = $('#item').val();
        $.ajax({
            url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchItem + '&api-key=bf143397b45979f05b3d4ad94d16e2ec:10:74093509',
            method: 'GET',
            success: function(res){
                var articles = items = res.response.docs;
                for (var i in articles){
                    var article = articles[i];
                    var headline = article.headline.main;
                    var snippet = article.snippet;
                    var articleURL = article.web_url;
                    
                    $('#response').html($('#response').html() + '<div class="row section" data-item=\"' + i + '\"> <h3>' + headline + '</h3>'+'<p>' + snippet + '</p>' + '<h6> Click: <a href=' + articleURL + '>Here</a> for details.</h3></div>');
                }
                console.log(res);
                $('.section').on('click', function(){
                    var selectedItem = items[$(this).attr('data-item')];
                    console.log(selectedItem);
                });
            },
            error: function(res){
                console.log(res);
            }                              
        });
    });
    
    
});
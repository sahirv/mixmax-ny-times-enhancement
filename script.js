$(document).ready(function() {
    var items = [];
    $('#search-go').on('click', function(){
        var searchItem = $('#item').val();
        $.ajax({
            url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchItem + '&api-key=bf143397b45979f05b3d4ad94d16e2ec:10:74093509',
            method: 'GET',
            success: function(res){
                var articles = res.response.docs;
                for (var i in articles){
                    var article = articles[i];
                    var headline = article.headline.main;
                    var snippet = article.snippet;
                    var articleURL = article.web_url;
                    
                    var markup = '<div class="row section" data-item=\"' + i + '\"> <h3>' + headline + '</h3>'+'<p>' + snippet + '</p>' + '<h6> Click: <a href=' + articleURL + '>Here</a> for details.</h3></div>';
                    console.log(markup);
                    items.push(markup);
                    $('#response').html($('#response').html() + markup);
                }
                console.log(res);
                $('.section').on('click', function(){
                    var target = $(this);
                    console.log(target.attr('data-item'));
                    console.log(items[target.attr('data-item')].web_url);

                    // Let Mixmax know it was done.
                    Mixmax.done({
                        src: items[target.attr('data-item')],
                        raw: true
                    });
                });
            },
            error: function(res){
                console.log(res);
            }                              
        });
        $.ajax({
            
        });
    });
    
    
});
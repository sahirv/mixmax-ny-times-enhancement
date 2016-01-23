$(document).ready(function() {
    var items = [];
    
    $.ajax({
        url: 'http://api.nytimes.com/svc/topstories/v1/technology.json?api-key=6a86b716c6d70e79e9a338374cb02c8f:14:74093509',
        method: 'GET',
        success: function(res){
            var results = res.results;
            console.log(results);
            for (var a = 0; a < results.length; a++){
                var image = "";
                if (results[a].multimedia != "")
                    image = results[a].multimedia[1].url;
                
                var headline = results[a].title; 
                var abstract = results[a].abstract;
                var articleURL = results[a].url;
                
                var imgMarkup = '<div class="col-sm-6 image" style="padding-top: 25px; font-family: sans-serif;" data-item=\"' + a + '\"><img src="' + image + '" alt="No image received." onError="this.onerror=null;this.src=\'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg\';" height="250px" width="250px"><div class="info"> <h3>' + headline + '</h3>'+'<p>' + abstract + '</p>' + '<h6> Click: <a href=' + articleURL + '>Here</a> for the full article.</h3></div></div>';
                
                items.push(imgMarkup)
                
                $('#top-container').html($('#top-container').html() + imgMarkup);
                
                $(a).on('click', function(){
                   event.stopPropagation(); 
                });
                
                $('.image').on('click', function(){
                    var target = $(this);

                    // Let Mixmax know it was done.
                    Mixmax.done({
                        src: items[target.attr('data-item')],
                        raw: true
                    });
                });
                
            }
        }
    });
    
    $('#search-go').on('click', function(){
        items = [];
        $('#top-container').empty();
        $('#response').empty();
        var searchItem = $('#item').val();
        $.ajax({
            url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchItem + '&api-key=bf143397b45979f05b3d4ad94d16e2ec:10:74093509',
            method: 'GET',
            success: function(res){
                var articles = res.response.docs;
                //console.log(articles);
                for (var i in articles){
                    var article = articles[i];
                    
                    var headline = article.headline.main;
                    var snippet = article.snippet;
                    var articleURL = article.web_url;
                    
                    if (article.multimedia != "")
                        var image = article.multimedia[1].url;
                    
                    var markup = '<div class="col-sm-6 image" style="padding-top: 25px; font-family: sans-serif;" data-item=\"' + i + '\"><img src="http://www.nytimes.com/' + image + '" alt="No image received." height="250px" width="250px"><div class="info"> <h3>' + headline + '</h3>'+'<p>' + snippet + '</p>' + '<h6> Click: <a href=' + articleURL + '>Here</a> for the full article.</h3></div></div>';
                    console.log(markup);
                    items.push(markup);
                    $('#response').html($('#response').html() + markup);
                }
                if (articles.length == 0){
                    var markup = '<p> No articles retrieved. Please try a different search phrase</p>';
                    $('#response').html($('#response').html() + markup);
                }
                console.log(res);
                $('.image').on('click', function(){
                    var target = $(this);

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
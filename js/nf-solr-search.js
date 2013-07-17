
function getParameterByName(name) {
  /* name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]'); */
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var solrData = {
  url: 'http://192.168.1.85:8983/solr/rss/select',
  start: 0,
  limit:3,
  q: ''
};
/* solrData.url = 'http://evolvingweb.ca/solr/reuters/select/'; */

function parseSolrResults(data) {
  if (!data || !data.response) {
    alert('Error: No results');
    return;
  }
  var res = data.response;
  $('span.result-number').html(res.numFound + ' treff');
  $('span.result-query').html(' - \'' + solrData.q +'\'');

  var template = $('#article-list article').first();
  for (var i = 0; i < res.docs.length; i++) {
    var item = res.docs[i];

    /* Create article item */
    var article = template.clone();
    article.addClass('removable');
    article.find('h2 a').html(item.title);
    article.find('h2 a').attr('href', item.link).attr('target', '_blank');
    article.find('p.story-description').html(item.description);
    article.find('p.story-date').html(item.pubDate);

    if (item.imgsrc) {
      article.find('img').attr('src', item.imgsrc);
    }
    $('#article-list').append(article);
    article.show();
  }
  solrData.start += solrData.limit;
  if (solrData.start >= res.numFound) {
    $('div.load-more').hide();
  }
  else {
    $('div.load-more').show();
  }
}

function solrRequest() {
  jQuery.ajax({
      type: 'GET',
      url: solrData.url,
      data: {
          wt: 'json',
          indent: 'true',
          start: solrData.start,
          rows: solrData.limit,
          q: solrData.q
      },
      dataType: 'jsonp',
      jsonp: 'json.wrf',
      jsonpCallback: 'parseSolrResults',
      cache: false
  });
}

function solrSearch() {
  solrData.start = 0;
  solrData.q = $('#nf-search-q').val();
  $('#article-list .removable').remove();
  solrRequest();
}

function solrShowMore() {
  solrRequest();
}

function solrSetup() {
  if(window.location.pathname === '/search.html'){
    solrData.start = 0;
    solrData.limit = 3;
    solrData.q = getParameterByName('q');
    if(solrData.q.length === 0) {
      solrData.q = '*';
    }
    solrRequest();
    $('#nf-search-q').focus();
  }
}

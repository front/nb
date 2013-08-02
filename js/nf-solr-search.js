
function getParameterByName(name) {
  /* name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]'); */
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/*
 * Solr javascript client
 */
var nfSolr = {
  /* Solr server endpoint */
  url: 'http://index.websolr.com/solr/57e828ba9ce/select/',

  /* Skip start results */
  start: 0,

  /* Number of results per page */
  limit: 7,

  /* Query string */
  q: '',

  /* Parse the json results */
  parseResults: function(data) {
    if (!data || !data.response) {
      alert('Error: No results');
      return;
    }
    var res = data.response;
    $('span.result-number').html(res.numFound + ' treff');

    if (this.q.length > 0 && this.q !== '*') {
      $('span.result-query').html(this.q).addClass('active');
    }
    else {
      $('span.result-query').removeClass('active');
    }

    var list = $('#article-list');
    var template = $('#article-list article').first();

    for (var i = 0; i < res.docs.length; i++) {
      this.createItem(list, template, res.docs[i]);
    }
    this.start += this.limit;
    if (this.start >= res.numFound) {
      $('div.load-more').hide();
    }
    else {
      $('div.load-more').show();
    }
  },

  /* Creates a result element from a query item */
  createItem: function(list, template, item) {
      var article = template.clone();
      article.addClass('removable');
      article.find('h2 a').html(item.title);
      article.find('h2 a').attr('href', item.link).attr('target', '_blank');
      article.find('p.story-description').html(item.description);
      article.find('p.story-date').html(item.pubDate);
      if (item.imgsrc) {
        article.find('img').attr('src', item.imgsrc);
      }
      list.append(article);
      article.show();
  },

  /* Execute the request to the solr server */
  doRequest: function() {
    $.ajax({
        url: this.url,
        data: {
            wt: 'json',
            start: this.start,
            rows: this.limit,
            sort: 'date desc',
            q: this.q
        },
        dataType: 'jsonp',
        jsonp: 'json.wrf',
        jsonpCallback: 'nfSolr.parseResults',
        cache: false
    });
  },

  /* Set up query parameters and execute the request */
  search: function() {
    this.start = 0;
    this.q = $('#nf-search-q').val();
    $('#article-list .removable').remove();
    this.doRequest();
  },

  /* Show more results */
  showMore: function() {
    this.doRequest();
  },

  /* Set the solr server client */
  setup: function() {
    if (window.location.pathname === '/s/') {
      this.q = getParameterByName('q');
      if (this.q.length === 0) {
        this.q = '*';
      }
      this.doRequest();
      $('#nf-search-q').focus();
    }
  }
};

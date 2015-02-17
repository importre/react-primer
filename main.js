var slideshow = remark.create({
  sourceUrl: 'react_primer.md',
  ratio: "16:9",
  slideNumberFormat: '%total%분의 %current%',
  highlightStyle: 'solarized_dark',
  highlightLanguage: 'remark',
  navigation: {
    scroll: false,
    touch: true,
    click: false
  },
});

var hljs = remark.highlighter.engine;
hljs.registerLanguage('remark', function () {
  return {
    contains: [{
      className: 'keyword',
      begin: '^#+[^\n]+',
      relevance: 10
    },
    {
      className: 'comment',
      begin: '^---?'
    },
    {
      className: 'string',
      begin: '^\\w+:'
    },
    {
      className: 'literal',
      begin: '\\{\\{', end: '\\}\\}'
    },
    {
      className: 'string',
      begin: '\\.\\w+'
    }]
  };
});

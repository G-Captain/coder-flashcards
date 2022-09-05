import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

hljs.configure({
  cssSelector: '.full-card pre.ql-syntax',
});

const useSyntaxHighlight = () => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
};

export default useSyntaxHighlight;

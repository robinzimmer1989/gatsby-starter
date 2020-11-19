const isUrlExternal = url => {
  if (typeof window === "undefined") return;

  const host = window.location.hostname;

  const linkHost = (function(url) {
    if (/^https?:\/\//.test(url)) {
      // Absolute URL.
      // The easy way to parse an URL, is to create <a> element.
      // @see: https://gist.github.com/jlong/2428561
      const parser = document.createElement("a");
      parser.href = url;

      return parser.hostname;
    } else {
      // Relative URL.
      return window.location.hostname;
    }
  })(url);

  return host !== linkHost;
};

export default isUrlExternal;

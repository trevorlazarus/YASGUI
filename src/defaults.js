"use strict";

var $ = require("jquery");
var YASGUI = require("./main.js");
module.exports = {
  persistencyPrefix: function(yasgui) {
    return "yasgui_" + $(yasgui.wrapperElement).closest("[id]").attr("id") + "_";
  },
  allowYasqeResize: true,
  api: {
    corsProxy: null,
    collections: null
  },
  tracker: {
    googleAnalyticsId: null,
    askConsent: true
  },
  onQuotaExceeded: function(e) {
    //fail silently
    console.warn("Could not store in localstorage. Skipping..", e);
  },
  //this endpoint is used when adding a new tab. If unset, we'll take the endpoint of the current tab
  endpoint: null,
  //An undocumented easter-egg ;). Just wanted this to be able to swap the endpoint input for another widget
  endpointInput: function(yasgui, yasqeOpts, $, $controlBar, onChange) {
    return $("<select>").appendTo($controlBar).endpointCombi(yasgui, {
      value: yasqeOpts.sparql.endpoint,
      onChange: onChange
    });
  },
  yasqe: $.extend(
    true,
    {},
    {
      height: 300,
      sparql: {
        endpoint: YASGUI.YASQE.defaults.sparql.endpoint,
        acceptHeaderGraph: YASGUI.YASQE.defaults.sparql.acceptHeaderGraph,
        acceptHeaderSelect: YASGUI.YASQE.defaults.sparql.acceptHeaderSelect,
        args: YASGUI.YASQE.defaults.sparql.args,
        defaultGraphs: YASGUI.YASQE.defaults.sparql.defaultGraphs,
        namedGraphs: YASGUI.YASQE.defaults.sparql.namedGraphs,
        requestMethod: YASGUI.YASQE.defaults.sparql.requestMethod,
        headers: YASGUI.YASQE.defaults.sparql.headers
      }
    }
  ),
  yasr: YASGUI.YASR.defaults,
  tabs: [
    {
      yasqe: module.exports.yasqe,
      yasr: module.exports.yasr
    }
  ],

  /**
	 * Yes, UGLY as well... Problem is: there is NO public catalogue API or SPARQL endpoint (which is cors enabled and works without api key)
	 * I'm waiting for SPARQLES to make a public SPARQL endpoint of TPF API....
	 * For now, just store this list (scraped from the SPARQLES website) statically..
	 */
  catalogueEndpoints: [
    {
      endpoint: "http://ld.iospress.nl:3030/ios/sparql",
      title: "IOS Press LD Connect"
    }]
};

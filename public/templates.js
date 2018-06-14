(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['commentTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"post-comment\">\n	<p class=\"post-comment-text\">\n		"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n	</p>\n	<p class=\"post-comment-attribution\">\n		<a href=\"#\">"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a>\n	</p>\n</div>\n";
},"useData":true});
templates['header'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header>\n    <!-- The <i> tag below includes the bullhorn icon from Font Awesome -->\n    <a href=\"#\">\n        <h1 class=\"site-title\">\n            <i class=\"fas fa-gamepad\"> </i> World 1-1 Forums </i>\n        </h1>\n    </a>\n\n    <nav class=\"navbar\">\n        <ul class=\"navlist\">\n            <li class=\"navitem navlink active\">\n                <a href=\"#\">Home</a>\n            </li>\n            <li class=\"navitem navlink\">\n                <a href=\"#\">\n                    <i class=\"fab fa-nintendo-switch\"></i> Nintendo</a>\n            </li>\n            <li class=\"navitem navlink\">\n                <a href=\"#\">\n                    <i class=\"fab fa-xbox\">\n                    </i> Xbox</a>\n            </li>\n            <li class=\"navitem navlink\">\n                <a href=\"#\">\n                    <i class=\"fab fa-playstation\">\n                    </i> PlayStation</a>\n            </li>\n            <li class=\"navitem navbar-search\">\n                <input type=\"text\" id=\"navbar-search-input\" placeholder=\"Search... \">\n                <button type=\"button\" id=\"navbar-search-button\">\n                    <i class=\"fas fa-search\"></i>\n                </button>\n            </li>\n        </ul>\n    </nav>\n</header>\n";
},"useData":true});
templates['postTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <a class="
    + alias2(alias1(depth0, depth0))
    + " href=\"#\">"
    + alias2(alias1(depth0, depth0))
    + "</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.commentTemplate,depth0,{"name":"commentTemplate","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"post\">\n  <div class=\"post-content\">\n    <p class=\"post-text\">\n      "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n    </p>\n    <p class=\"post-attribution\">\n      <a href=\"#\">"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a>\n    </p>\n  </div>\n  <p class=\"tags-title\">Tags:</p>\n  <ul class=\"tags-list\">\n    <li class=\"tags\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.tag : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </li>\n  </ul>\n  <p class=\"comment-title\">Comments:</p>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.comment : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <button type=\"button\" class=\"comment-button\">\n    <i class=\"far fa-comment-alt\"></i>\n  </button>\n</article>\n";
},"usePartial":true,"useData":true});
})();
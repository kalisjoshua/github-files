;(function ($) {
  var fnSuccess =
    function (data, startLineNum, endLineNum, callback) {
      if (data.data.content && data.data.encoding === "base64") {
        var contentArray = 
          window
            .atob(data.data.content.replace(/\n/g, ""))
            .split("\n");

        endLineNum = endLineNum || contentArray.length;

        callback(contentArray.slice(startLineNum - 1, endLineNum).join("\n"));
      }
    };

  $.getGithubFile =
    function(user, repo, sha, callback, startLineNum, endLineNum) {
      $.ajax({
         type: "GET"
        ,url: "https://api.github.com/repos/" + user + "/" + repo + "/git/blobs/" + sha
        ,dataType: "jsonp"
        ,success: function(data) {fnSuccess(data, +startLineNum || 1, +endLineNum || 0, callback);}
      });
    };
}(jQuery));

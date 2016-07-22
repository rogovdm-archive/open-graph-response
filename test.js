const og = require("./index");
og.register("events", function(id, test, cb){
  cb("Error #2123", {
    id,
    test,
    title: "Title"
  })
});
og.html("events", 123, "test").then(console.log).catch(function(err){console.log("err", err)});

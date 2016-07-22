const db = {};


const buildHTMLFromObject = function(og){
  let html = "";
  html += "<html prefix=\"og: http://ogp.me/ns#\">";
  html += "<body>";
  Object.keys(og).forEach(key => {
    html += `<meta property="${key}" content="${og[key]}">`;
  });
  html += "</body>";
  html += "</html>";
  return html;
};


module.exports = {
  html: function(name, ...args) {
    var fn = db[name];
    return new Promise(function(resolve, reject){
        args.push(function(err, data){
          if(err) reject(err);
          else resolve(buildHTMLFromObject(data));
        });
        fn.apply(null, args);
    });

  },
  register: function(name, fn) {
    if (db[name]) throw new Error("Name has already been registered");
    if (!name) throw new Error("Name should be provided");
    if (!fn) throw new Error("Fn should be provided");
    db[name] = fn;
  }
}

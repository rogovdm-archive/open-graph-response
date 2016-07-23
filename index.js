function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

const buildHTMLFromObject = function(og){
  let html = "";
  html += "<html prefix=\"og: http://ogp.me/ns#\">";
  html += "<body>";
  Object.keys(og).forEach(key => {
    html += `<meta property="${key}" content="${og[key]}" />`;
  });
  html += "</body>";
  html += "</html>";
  return html;
};

function OG(fn){  
  if (!fn) throw new Error("Fn should be provided");
  if (!isFunction(fn)) throw new Error("fn should be a function");
  this.fn = fn;
}

OG.prototype.html = function(...args) {
  const fn = this.fn,
        arr = args || [];
  return new Promise((resolve, reject) => {
      arr.push((err, data) => {
        if(err) reject(err);
        else resolve(buildHTMLFromObject(data));
      });
      fn.apply(null, arr);
  });
}

module.exports = OG;

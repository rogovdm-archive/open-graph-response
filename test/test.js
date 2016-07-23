const should = require('should'),
      data = {
        title: "Title"
      },
      origin = {
        html: `<html prefix="og: http://ogp.me/ns#"><body><meta property="title" content="Title" /></body></html>`,
        html2: `<html prefix="og: http://ogp.me/ns#"><body><meta property="title" content="Title" /></body></html>`,
      },
      OG = require("../index"),
      callbacks = {
        default(cb) {
          cb(null, data);
        },
        withError(cb) {
          cb(new Error("err"));
        },
        withID(id, cb) {
          cb(null, id);
        },
        withData(id, cb){
          cb(null, data);
        }
      };
describe('open-graph-response', function() {
  describe("#constructor", () => {
    it('should throw error', () => (() => new OG()).should.throw());
    it('should throw error', () => (() => new OG("events")).should.throw());
  });
  describe("#fn", () => {
    it("should have callback storage", () => {
      const og = new OG(callbacks.default);;
      should.exist(og.fn);
    });
    it("should store callback", () => {
      const og = new OG(callbacks.default);;
      og.fn.should.equal(callbacks.default);
    });
  });
  describe("#html", () => {
    it("should create object with html method", () => (new OG(console.log)).should.have.property("html"));
    it("should call callback", (done) => {
      const og = new OG(callbacks.default);
      og.html().then(html => done());
    });
    it("should catch error", (done) => {
      const og = new OG(cb => cb(new Error()));
      og.html().catch(err => done());
    });
    it("should return specific html with title", (done) => {
      const og = new OG(callbacks.default);
      og.html().then(html => html.should.equal(origin.html)).then(html => done());
    });
    it("should run callback with provided id", (done) => {
      const source = { id: "123" },
            og = new OG((id, cb) => {
              id.should.equal(source.id);
              cb(null, data);
            });
      og.html(source.id).then(html => html.should.equal(origin.html)).then(html => done())
    });
  });
});

var GitDigest, chomp, exec, replace;

replace = require('replace');

chomp = require('chomp');

exec = require('child_process').exec;

module.exports = GitDigest = (function() {
  class GitDigest {
    constructor(config) {
      this.replace = this.replace.bind(this);
      this.config = config;
    }

    onCompile() {
      if (!this.config.optimize) {
        return;
      }
      return this.execute('git rev-parse --short HEAD', this.replace);
    }

    execute(command, callback) {
      return exec(command, function(error, stdout, stderr) {
        return callback(stdout);
      });
    }

    replace(digest) {
      return replace({
        regex: /\?DIGEST/g,
        replacement: '?' + digest.chomp(),
        paths: [this.config.paths.public],
        recursive: true,
        silent: true
      });
    }

  };

  GitDigest.prototype.brunchPlugin = true;

  return GitDigest;

}).call(this);

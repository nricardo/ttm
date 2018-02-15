const TrieSearch = require('trie-search');
const debug = require('debug')('ttm:Searchr');

const DEFAULT = {
  min: 1,
  ignoreCase: true,
  indexField: undefined,
  splitOnRegEx: false,
};

class Searchr {
  constructor (fields, options) {
    options = options || {};

    // set fields
    this.fields = fields;

    // merge options with default ones
    this.options = Object.assign({}, DEFAULT, options);

    // create our search trie, defining its options
    this.trie = new TrieSearch(this.fields, this.options);
  }

  /**
   * Loads data into our trie structure
   *
   */
  load(data) {
    debug('loading into data structure...');
    this.trie.addAll(data);
  }

  /**
   * Performs a search against the given query.
   */
  find(query = '') {
    debug(`performing search for "${query}"...`);

    // init pointer to data root
    let ptr = this.trie.root;

    // adjust query if needed
    query = this.options.ignoreCase ? query.toLowerCase() : query;

    // find the next chars possible
    query.split('').map(c => ptr && (ptr = ptr[c]));
    let next = ptr ? Object.keys(ptr) : [];
    next = next.filter(n => n.length === 1);

    return new Promise((resolve, reject) => {
      // try to perform the search
      try {
        let matches = this.trie.get(query);
        debug(`... found ${matches.length}.`);
        resolve({
          next,
          matches
        });
      }
      catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Searchr;

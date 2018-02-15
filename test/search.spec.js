const expect = require('chai').expect;
const Searchr = require('../src/server/lib/searchr');

describe('Train Ticket Machine (TTM)', function () {

  describe('Instance creation', () => {
    it('should create an instance of correct type...', () => {
      const s = new Searchr();
      expect(s instanceof Searchr).to.be.true;
    });
  });

  describe(`Searching for 'DART'...`, function () {
    const s = new Searchr('name', { ignoreCase: false });
    s.load([
      { name: 'DARTFORD' },
      { name: 'DARTMOUTH' },
      { name: 'TOWER HILL' },
      { name: 'DERBY' },
    ]);

    it(`should give 'F' and 'M' as next chars...`, async function () {
      const data = await s.find('DART');
      expect(data.next).to.eql(['F', 'M']);
    });

    it(`should match with objects 'DARTFORD' and 'DARTMOUTH'...`, async function () {
      const data = await s.find('DART');
      expect(data.matches).to.eql([
        { name: 'DARTFORD' },
        { name: 'DARTMOUTH' },
      ]);
    });

  });

  describe(`Searching for 'LIVERPOOL'...`, function () {
    const s = new Searchr('name', { ignoreCase: false });
    s.load([
      { name: 'LIVERPOOL' },
      { name: 'LIVERPOOL LIME STREET' },
      { name: 'PADDINGTON' },
    ]);

    it(`should give the space ' ' as next char...`, async function () {
      const data = await s.find('LIVERPOOL');
      expect(data.next).to.eql([' ']);
    });

    it(`should match with objects 'LIVERPOOL' and 'LIVERPOOL LIME STREET'...`, async function () {
      const data = await s.find('LIVERPOOL');
      expect(data.matches).to.eql([
        { name: 'LIVERPOOL' },
        { name: 'LIVERPOOL LIME STREET' },
      ]);
    });

  });

  describe(`Searching for 'KINGS CROSS'...`, function () {
    const s = new Searchr('name', { ignoreCase: false });
    s.load([
      { name: 'EUSTON' },
      { name: 'LONDON BRIDGE' },
      { name: 'VICTORIA' },
    ]);

    it(`should give no next chars...`, async function () {
      const data = await s.find('KINGS CROSS');
      expect(data.next).to.be.an('array').that.is.empty;
    });

    it(`should give no matches...`, async function () {
      const data = await s.find('KINGS CROSS');
      expect(data.matches).to.be.an('array').that.is.empty;
    });

  });

});

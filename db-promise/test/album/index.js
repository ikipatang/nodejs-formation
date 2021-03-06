// require('dotenv').config(); // import test environment config
import chai from 'chai';
import dbpromise from '@temando/dbpromise';

// const handler = require('../../endpoints/meta/handler');
const albumModule = require('../../src/album/album.js');
const db = new dbpromise(`${__dirname}/../../db/route-params.db`);
const expect = chai.expect;
const context = {
  context: 'blah',
  fail: () => {},
  pass: () => {},
};

chai.use(require('dirty-chai'));

// expect(true).to.be.true();

describe('Albums', () => {
  describe('Get albums by http', () => {
    let albums = [];
    let oneAlbum = {};
    it('can get all http albums', async(done) => {
      albums = await albumModule.getAlbums();
      expect(100).equal(albums.length);

      return done();
    });

    it('can get http album id 1', async(done) => {
      oneAlbum = await albumModule.getAlbum(1);
      expect(oneAlbum).to.exist();
      expect(oneAlbum).property('id', 1);
      expect(oneAlbum).property('userId');
      expect(oneAlbum).property('title');

      return done();
    });

    it('albums equals album id 1', async(done) => {
      expect(albums[0]).eql(oneAlbum);

      return done();
    });
  });

  describe('Get albums by DB', () => {
    let albums = [];

    before(async() => {
      // Delete albums from the DB
      try {
        await db.query('DELETE FROM album').then(null, console.error);
      } catch (err) {
        throw err;
      }
    });

    it('can insert', async(done) => {
      albums = await albumModule.getAlbums();

      try {
        await albumModule.fillDbAlbums(albums);
      } catch (err) {
        return done(err);
      }

      return done();
    });

    it('can list DB Ids', async(done) => {
      try {
        const allAlbumsIds = await albumModule.listAllAlbumsIds();

        expect(albums.length).equal(allAlbumsIds.length);
      } catch (err) {
        return done(err);
      }

      return done();
    });

    it('can get DB albums', async(done) => {
      const allAlbums = await albumModule.listDbAlbums();
      try {
        expect(albums.length).equal(allAlbums.length);
        expect(albums).eql(allAlbums);
      } catch (err) {
        return done(err);
      }

      return done();
    });
  });
});

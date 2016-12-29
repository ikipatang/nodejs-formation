import dbpromise from '@temando/dbpromise';
import qhttp from 'q-io/http';
import Promise from 'bluebird';
const db = new dbpromise(`${__dirname}/../../db/route-params.db`);

async function fetchQuery(query) {
  let albumsIds = [];
  try {
    albumsIds = await db.query(query);
  } catch (err) {
    throw err;
  }
  return albumsIds;
}

export async function listAllAlbumsIds() {
  const arrayalbumsIds = [];
  const albumsIds = await fetchQuery('SELECT id FROM album ORDER BY id ASC');
  albumsIds.forEach((album) => {
    arrayalbumsIds.push(album.id);
  });
  return arrayalbumsIds;
}

export async function getAlbums() {
  const url = 'https://jsonplaceholder.typicode.com/albums';
  return await qhttp.read(url).then(JSON.parse);
}

export async function getAlbum(albumId) {
  const url = `https://jsonplaceholder.typicode.com/albums/${albumId}`;

  return await qhttp.read(url).then(JSON.parse);
}

export async function listDbAlbums() {
  const arrayAlbums = [];
  const albumsIds = await listAllAlbumsIds();
  await Promise.map(albumsIds, (async(album) => {
    arrayAlbums[album] = await getAlbum(album);
  }));

  /*
  Remove empty values, ie : albums from the DB begin on id 1 so the array will contain the
  first element at 0 which does not exists
  */
  return arrayAlbums.filter(Boolean);
}

export async function fillDbAlbums(albums) {
  const arrayValues = [];
  albums.forEach((album) => {
    arrayValues.push(`(${album.id}, ${album.userId}, '${album.title}')`);
  });

  const queryInsert =
    `INSERT OR IGNORE INTO album (id, userId, title) VALUES ${arrayValues.join(',')}`;

  try {
    await db.query(queryInsert).then(null, console.error);
  } catch (err) {
    throw err;
  }
}

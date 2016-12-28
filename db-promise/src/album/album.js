import dbpromise from '@temando/dbpromise';
import qhttp from 'q-io/http';
import Promise from 'bluebird';
const db = new dbpromise(`${__dirname}/../../db/route-params.db`);

export async function listAllAlbumsIds()
{
  const arrayalbumsIds = [];
  try
  {
    const albumsIds = await db.query('SELECT id FROM album ORDER BY id ASC');
    albumsIds.forEach((album) =>
    {
      arrayalbumsIds.push(album.id);
    });
  }
  catch (err)
  {
    throw err;
  }
  return arrayalbumsIds;
}

export async function getAlbums()
{
  var url = 'https://jsonplaceholder.typicode.com/albums';
  return await qhttp.read(url).then(JSON.parse);
}

export async function getAlbum(albumId)
{
  var url = `https://jsonplaceholder.typicode.com/albums/${albumId}`;
  var result = await qhttp.read(url).then(JSON.parse);

  return result;
}

export async function listDbAlbums()
{
  var arrayAlbums = [];
  const albumsIds = await listAllAlbumsIds();
  await Promise.map(albumsIds, (async(album) =>
  {
    arrayAlbums[album] = await getAlbum(album);
  }));
  return arrayAlbums;
}

export async function fillDbAlbums(albums)
{
  var arrayValues = [];
  albums.forEach((album) =>
  {
    arrayValues.push(`(${album.id}, ${album.userId}, '${album.title}')`);
  });

  var queryInsert = `INSERT OR IGNORE INTO album (id, userId, title) VALUES ${arrayValues.join(',')}`;

  try
  {
    const result = await db.query(queryInsert).then(null, console.error);
  }
  catch (err)
  {
    throw err;
  }
}

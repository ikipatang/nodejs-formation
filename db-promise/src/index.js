import dbpromise from '@temando/dbpromise';
import qhttp from 'q-io/http';
import Promise from 'bluebird';
const db = new dbpromise(`${__dirname}/../db/route-params.db`);

async function listAllAlbumsIds()
{
  const arrayalbumsIds = [];
  try
  {
    const albumsIds = await db.query('select id from album');
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

async function getAlbums()
{
  var url = 'https://jsonplaceholder.typicode.com/albums';
  return await qhttp.read(url).then(JSON.parse);
}

async function listDbAlbums()
{
  var arrayAlbums = [];
  const albumsIds = await listAllAlbumsIds();
  await Promise.map(albumsIds, (async(album) =>
  {
    arrayAlbums.push(await getAlbum(album));
  }));

  console.log(arrayAlbums);
}

async function getAlbum(albumsId)
{
  var url = `https://jsonplaceholder.typicode.com/albums/${albumsId}`;
  var result = await qhttp.read(url).then(JSON.parse);

  return result;
}

async function fillDbAlbum(album)
{
  try
  {
    var queryInsert = `INSERT INTO album (userId, title) VALUES ('${album.userId}', '${album.title}')`;
    const result = await db.query(queryInsert).then(null, console.error);

    console.log(result);
    process.exit()
  }
  catch (err)
  {
    throw err;
  }
  return album;
}

async function main()
{
  const arrayAlbums = await getAlbums();
  await Promise.map(arrayAlbums, (async(album) =>
  {
    await fillDbAlbum(album);
  }));
}

main();

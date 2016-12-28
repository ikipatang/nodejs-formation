var albumsModule = require('./album/album.js');

export async function albumIndex()
{
  // Fill albums DB
  const arrayAlbums = await albumsModule.getAlbums();
  await albumsModule.fillDbAlbums(arrayAlbums);

  // List
  const listDbAlbums = await albumsModule.listDbAlbums();
  console.log(listDbAlbums);
}

albumIndex();

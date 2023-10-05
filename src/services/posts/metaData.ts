export const metaDataCheck = (metaData: any) => {
  if (!metaData.publication) {
    throw new Error('No publication found');
  } else if (metaData.publication.__typename !== 'Post') {
    throw new Error('Publication is not a post');
  }
  const { metadata } = metaData.publication;
  if (
    !metadata.media ||
    metadata.media.length === 0 ||
    !metadata.media[0].original ||
    !metadata.media[0].original.url ||
    metadata.media[0].original.mimeType !== 'audio/mpeg'
  ) {
    throw new Error('No audio media found');
  }
  return metadata;
};

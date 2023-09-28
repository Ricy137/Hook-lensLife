export const getIdFromUrl = (url: string) => {
  const urlSplit = url.split("/");
  return urlSplit[urlSplit.length - 1];
};

export const getId = (input: string) => {
  if (input.startsWith("https://")) {
    return getIdFromUrl(input);
  } else {
    return input;
  }
};

export const isValidPostInput = (input: string) => {
  const regex = /^0x.*-0x.*$/;
  let postId = getId(input);
  return regex.test(postId);
};

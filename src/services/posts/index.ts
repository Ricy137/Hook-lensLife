import { useCallback } from "react";
import { atom, useSetAtom } from "jotai";
import { gql } from "@apollo/client";
import { client } from "@modules/Providers";
import { metaDataCheck } from "./metaData";

const POST_META = gql`
  query Publication($postId: InternalPublicationId!) {
    publication(request: { publicationId: $postId }) {
      __typename
      ... on Post {
        metadata {
          name
          description
          content
          image
          cover {
            original {
              url
              mimeType
            }
          }
          media {
            original {
              url
              mimeType
            }
          }
          tags
          contentWarning
        }
      }
    }
  }
`;

export const fetchMeta = async (postId: string) => {
  const { data } = await client.query({
    query: POST_META,
    variables: { postId: postId },
  });
  return data;
};

export interface AudioItem {
  cover?: {
    url: string;
  };
  content?: string;
  mediaUrl: string;
}

export const audioAtom = atom<AudioItem[] | null>(null);

export const useAddAudio = () => {
  const setAudio = useSetAtom(audioAtom);

  const addAudio = useCallback(async (url: string) => {
    const metaData = await fetchMeta(url);
    const metadata = metaDataCheck(metaData);
    const mediaUrl = metadata.media[0].original.url.split("//")[1];
    const cover = metadata.cover?.original?.url;
    const content = metadata.content;
    setAudio((prev) => {
      if (!prev) {
        return [
          {
            mediaUrl,
            cover,
            content,
          },
        ];
      }
      return [
        ...prev,
        {
          mediaUrl,
          cover,
          content,
        },
      ];
    });
  }, []);
  return addAudio;
};

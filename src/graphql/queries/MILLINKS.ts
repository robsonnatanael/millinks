import { gql } from '@apollo/client';

export const MILLINKS = gql`
  query {
    linktree {
      data {
        attributes {
          avatar {
            photo {
              name
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              altText
            }
          }
          title
          links {
            id
            name
            url
            active
          }
          footer {
            description
            logo {
              data {
                attributes {
                  url
                }
              }
            }
            link {
              name
              url
            }
          }
          seo {
            title
            metaDescription
            metaKeywords
          }
        }
      }
    }
  }
`;

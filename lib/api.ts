import axios from 'axios';

const WP_URL = process.env.WORDPRESS_API_URL;

async function fetchData(query, { variables } = {}) {

    const headers = { 'Content-Type': 'application/json' };

    const res = await fetch(WP_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables })
    })

    const json = await res.json();
    if (json.errors) {
        console.log(json.errors);
        console.log('error details', query, variables);
        throw new Error('Failed to fetch data')
    }

    return json.data
}

export async function getHomeContent(id, idType = 'DATABASE_ID') {
    const data = await fetchData(
        `
        query frontPageContent {
            page(id: id, idType: DATABASE_ID) {
              contentSections {
                contentBlocks {
                  ... on Page_Contentsections_ContentBlocks_PageSelector {
                    fieldGroupName
                    pageSlides {
                      associatePage {
                        target
                        title
                        url
                      }
                      associatePage2 {
                        target
                        title
                        url
                      }
                      mainTitle
                      fieldGroupName
                      pageName
                      preTitle
                      slideBackground {
                        mediaItemUrl
                      }
                    }
                  }
                  ... on Page_Contentsections_ContentBlocks_FeatureText {
                    fieldGroupName
                    textLine1
                    textLine2
                  }
                }
              }
            }
          }
        `,
        {
            variables: { id, idType },
        }
    )
    return data.page
}
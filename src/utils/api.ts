import { sanityClient } from "sanity:client";

export const partialPostSubQuery = `
    title,
    "slug": slug.current,
    "imgSrc": mainImage.asset->url,
    "description": array::join(body[_type == "block"][0].children[].text,""),
    "categories": categories[]->title,
    "author": author->name,
    "tags": tags[]->name,
    "date": publishedAt
`;

export const popularPosts = await sanityClient.fetch(`
  *[_type == "post" && defined(slug) && isPopular] | order(publishedAt desc){
    title,
    "slug": slug.current,
    "description": array::join(body[_type == "block"][0].children[].text,""),
  }
`);

export const categories = await sanityClient.fetch(`
  *[_type == "category"].title
`);

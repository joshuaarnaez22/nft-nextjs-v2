import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true, // server-side is statically generated, the CDN is only necessary beneficial if queries are called on-demand
});

export const urlForImage = (source) =>
  imageUrlBuilder(sanityClient).image(source);

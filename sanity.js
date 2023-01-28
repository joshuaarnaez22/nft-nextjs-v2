import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  token:
    "skR1YUgyToEEkowIUPh50FlXiMS5BRe0UfFpg4BZOmTfVMtN6aHJAFkbmApEYieV86px8NRroxTU5aDSRFmqpj8um50RJ0LFp7vSPXJVuKsWMFcS1rwVpRjgR8QQAtMltSyPJeKLGfVkZFsvWbn3iytDtc6T7GQ8kCQhRhskatxQyciBYAzp",
  apiVersion,
  useCdn: false,
});

export const urlForImage = (source) =>
  imageUrlBuilder(sanityClient).image(source);

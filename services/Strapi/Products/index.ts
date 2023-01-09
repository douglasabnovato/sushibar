export async function getProducts() {
  const productFeeds = await fetch(
    "http://localhost:1337/api/product-feeds/1",
    {
      headers: new Headers({
        Authorization: "Bearer " + process.env.SUPERMARKETPLACE_API_TOKEN,
      }),
    }
  )
    .then((response) => response.json())
    .then(({ data: { attributes } }) => {
      return attributes.jsonData;
    });

  return productFeeds;
}

import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {

  const preferredOrder = ["Xbox", "Playstation", "Pre-Builts", "Nintendo", "Controllers"];

  const orderedCollections = collections.sort((a, b) => {
    const indexA = preferredOrder.indexOf(a.title);
    const indexB = preferredOrder.indexOf(b.title);

    if (indexA === -1 || indexB === -1) return -1; // Both not found, put it towards the bottom

    return indexA - indexB;
  });

  return orderedCollections.map((collection) => (
    <li key={collection.id}>
      <ProductRail collection={collection} region={region} />
    </li>
  ))
}

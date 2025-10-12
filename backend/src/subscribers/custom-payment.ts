import type { SubscriberConfig, SubscriberArgs } from "@medusajs/medusa";

export default async function handleCustomPaymentPricing({
  event,
  container,
}: SubscriberArgs<any>) {
  const cartModuleService = container.resolve("cart");
  const logger = container.resolve("logger");

  try {
    const { id } = event.data;

    // Retrieve the cart with line items
    const cart = await cartModuleService.retrieveCart(id, {
      relations: ["items", "items.metadata"],
    });

    if (!cart || !cart.items) {
      return;
    }

    // Check for custom payment line items
    for (const item of cart.items) {
      if (
        item.metadata &&
        item.metadata.is_custom_payment &&
        item.metadata.custom_amount_cents
      ) {
        const customPrice =
          parseInt(item.metadata.custom_amount_cents as string) / 100;

        // Update line item price if it doesn't match the custom amount
        if (item.unit_price !== customPrice) {
          await cartModuleService.updateLineItems(item.id, {
            unit_price: customPrice,
          });

          logger.info(
            `Updated custom payment line item ${item.id} to ${customPrice} cents`
          );
        }
      }
    }
  } catch (error) {
    logger.error(
      `Error processing custom payment pricing: ${error.message}`,
      error
    );
  }
}

export const config: SubscriberConfig = {
  event: ["cart.created", "cart.updated"],
  context: {
    subscriberId: "custom-payment-pricing",
  },
};

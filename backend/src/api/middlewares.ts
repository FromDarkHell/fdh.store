import type { MiddlewaresConfig } from "@medusajs/medusa";

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/store/carts/:id/line-items",
      method: ["POST"],
      middlewares: [
        async (req, res, next) => {
          const { metadata } = req.body;

          // If this is a custom payment, override the price
          if (metadata?.is_custom_payment && metadata?.custom_amount_cents) {
            req.body.unit_price = parseInt(metadata.custom_amount_cents);
            console.log(
              `Setting custom payment price to: ${req.body.unit_price} cents`
            );
          }

          next();
        },
      ],
    },
  ],
};

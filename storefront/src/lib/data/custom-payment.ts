"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { getAuthHeaders, getCacheTag, setCartId } from "./cookies"
import { getRegion } from "./regions"

/**
 * Creates a custom payment cart with a specific amount
 * @param amount - The custom payment amount in dollars
 * @param description - Optional description of what the payment is for
 * @param countryCode - Country code for region
 * @returns Object containing cart ID and checkout URL
 */
export async function createCustomPayment({
  amount,
  description,
  countryCode,
}: {
  amount: number
  description?: string
  countryCode: string
}) {
  // Validate input
  if (!amount || amount < 1) {
    throw new Error("Amount must be at least $1.00")
  }

  if (amount > 10000) {
    throw new Error("Amount cannot exceed $10,000.00")
  }

  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  try {
    // Create a new cart
    const { cart } = await sdk.store.cart.create(
      {
        region_id: region.id,
      },
      {},
      headers
    )

    // Note: You need to have a "Custom Payment" product set up in Medusa
    // Get the custom payment product ID from environment variable
    const customPaymentProductId = process.env.CUSTOM_PAYMENT_PRODUCT_ID

    if (!customPaymentProductId) {
      throw new Error(
        "CUSTOM_PAYMENT_PRODUCT_ID not configured. Please set up a custom payment product in your Medusa admin."
      )
    }

    // Fetch the custom payment product to get variant ID
    const product = await sdk.client.fetch<{
      product: HttpTypes.StoreProduct
    }>(`/store/products/${customPaymentProductId}`, {
      method: "GET",
      query: {
        region_id: region.id,
        fields: "*variants",
      },
      headers,
    })

    if (!product.product || !product.product.variants?.[0]) {
      throw new Error("Custom payment product not found or has no variants")
    }

    const variantId = product.product.variants[0].id

    // Add custom payment item to cart with metadata
    var lineItem = await sdk.store.cart.createLineItem(
      cart.id,
      {
        variant_id: variantId,
        quantity: 1,
        metadata: {
          is_custom_payment: true,
          custom_amount: amount,
          custom_amount_cents: Math.round(amount * 100),
          custom_description: description || "Custom Payment",
          original_price:
            product.product.variants[0].calculated_price?.calculated_amount,
        },
      },
      {},
      headers
    )

    // Set cart ID in cookies
    await setCartId(cart.id)

    // Revalidate cart cache
    const cartCacheTag = await getCacheTag("carts")
    revalidateTag(cartCacheTag)

    return {
      cartId: cart.id,
      checkoutUrl: `/${countryCode}/checkout`,
      success: true,
    }
  } catch (error) {
    return medusaError(error)
  }
}

/**
 * Updates a line item with custom pricing
 * This is used by the Medusa backend to adjust the price before checkout
 * @param cartId - The cart ID
 * @param lineItemId - The line item ID to update
 * @param customAmount - The custom amount in cents
 */
export async function updateCustomPaymentPrice({
  cartId,
  lineItemId,
  customAmount,
}: {
  cartId: string
  lineItemId: string
  customAmount: number
}) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  try {
    // This requires a custom Medusa endpoint or admin API access
    // You'll need to implement this in your Medusa backend
    await sdk.client.fetch(`/store/carts/${cartId}/line-items/${lineItemId}`, {
      method: "POST",
      body: {
        unit_price: customAmount,
      },
      headers,
    })

    const cartCacheTag = await getCacheTag("carts")
    revalidateTag(cartCacheTag)

    return { success: true }
  } catch (error) {
    return medusaError(error)
  }
}

"use server"

import { createCustomPayment } from "@lib/data/custom-payment"
import { redirect } from "next/navigation"

export async function submitCustomPayment(
  currentState: {
    success: boolean
    error: string | null
    cartId: string | null
  },
  formData: FormData
): Promise<{
  success: boolean
  error: string | null
  cartId: string | null
}> {
  const amount = parseFloat(formData.get("amount") as string)
  const description = formData.get("description") as string
  const countryCode = formData.get("countryCode") as string

  // Validate
  if (!amount || amount < 1) {
    return {
      success: false,
      error: "Amount must be at least $1.00",
      cartId: null,
    }
  }

  if (amount > 10000) {
    return {
      success: false,
      error: "Amount cannot exceed $10,000.00",
      cartId: null,
    }
  }

  try {
    const result = await createCustomPayment({
      amount,
      description: description || "Custom Payment",
      countryCode: countryCode || "us",
    })

    // Redirect will throw, so this won't be reached if successful
    redirect(result.checkoutUrl)
  } catch (error) {
    // If it's a redirect, let it through
    if (error && typeof error === "object" && "digest" in error) {
      throw error
    }

    // Otherwise it's an actual error
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
      cartId: null,
    }
  }
}

import { Metadata } from "next"
import CustomPricePageClient from "./page"

export const metadata: Metadata = {
    title: "Custom Payment | FDH Systems",
    description: "Pay a custom amount for services, tips, or special orders",
}

export default function CustomPaymentPage() {
    return <CustomPricePageClient />
}

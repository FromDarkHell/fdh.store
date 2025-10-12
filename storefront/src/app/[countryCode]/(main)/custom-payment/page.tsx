"use client"

import { useState } from "react"
import { CurrencyDollar, ShoppingCart, Check, ExclamationCircle } from "@medusajs/icons"
import { useParams } from "next/navigation"
import { submitCustomPayment } from "./actions"
import { Metadata } from "next"

export default function CustomPaymentClient() {
    const params = useParams()
    const countryCode = (params.countryCode as string) || "us"

    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [success, setSuccess] = useState(false)

    const presetAmounts = [10, 25, 50, 100, 250, 500]

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9.]/g, "")
        setAmount(value)
        setError("")
    }

    const handlePresetClick = (preset: number) => {
        setAmount(preset.toString())
        setError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const numAmount = parseFloat(amount)

        if (!numAmount || numAmount < 1) {
            setError("Please enter an amount of at least $1.00")
            return
        }

        if (numAmount > 10000) {
            setError("Maximum amount is $10,000.00")
            return
        }

        setIsPending(true)
        setError("")

        const formData = new FormData()
        formData.append("amount", amount)
        formData.append("description", description || "Custom Payment")
        formData.append("countryCode", countryCode)

        // Call the server action
        const result = await submitCustomPayment(
            { success: false, error: null, cartId: null },
            formData
        )

        if (result.error) {
            setError(result.error)
            setIsPending(false)
        }

        // If successful, the action will redirect to checkout
        setSuccess(true)
    }

    return (
        <div className="min-h-screen bg-gray-900 relative overflow-hidden py-12">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(90deg, rgba(0, 255, 127, 0.2) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0, 255, 127, 0.2) 1px, transparent 1px)
            `,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="content-container relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <div className="flex items-center gap-2 bg-gray-800/50 border border-green-400/30 px-4 py-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs text-green-400 font-mono uppercase tracking-wide">
                                Custom Payment Portal
                            </span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-green-400 font-mono uppercase tracking-wider mb-4">
                        [Pay Custom Amount]
                    </h1>

                    <p className="text-gray-400 font-mono text-sm">
                        <span className="text-blue-400">&gt;</span> Enter any amount for
                        services, tips, or special orders
                    </p>
                </div>

                {/* Main Form */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gray-800/80 border border-green-400/50 relative overflow-hidden">
                        {/* Terminal header */}
                        <div className="bg-gray-900 border-b border-green-400/30 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-xs text-gray-400 ml-2 font-mono">
                                    payment_processor.exe
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CurrencyDollar className="w-4 h-4 text-green-400" />
                                <span className="text-xs text-green-400 font-mono">SECURE</span>
                            </div>
                        </div>

                        <div className="p-8">
                            {success ? (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400/20 border-2 border-green-400 rounded-full mb-4">
                                        <Check className="w-8 h-8 text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-400 font-mono mb-2">
                                        [PROCESSING...]
                                    </h3>
                                    <p className="text-gray-400 font-mono text-sm">
                                        Redirecting to checkout...
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Amount Input */}
                                    <div className="space-y-4">
                                        <label className="block text-green-400 font-mono text-sm uppercase tracking-wide">
                                            <span className="text-blue-400">&gt;</span> Enter Amount
                                            (USD)
                                        </label>

                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 font-mono text-2xl">
                                                $
                                            </span>
                                            <input
                                                type="text"
                                                value={amount}
                                                onChange={handleAmountChange}
                                                placeholder="0.00"
                                                className="w-full bg-gray-900/50 border border-green-400/50 focus:border-blue-400 text-green-400 font-mono text-3xl pl-12 pr-4 py-4 outline-none transition-colors"
                                                style={{
                                                    boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5)",
                                                }}
                                                required
                                                disabled={isPending}
                                            />
                                        </div>

                                        {/* Preset buttons */}
                                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                            {presetAmounts.map((preset) => (
                                                <button
                                                    key={preset}
                                                    type="button"
                                                    onClick={() => handlePresetClick(preset)}
                                                    disabled={isPending}
                                                    className={`py-2 px-3 border font-mono text-sm transition-all disabled:opacity-50 ${amount === preset.toString()
                                                        ? "bg-green-400 text-gray-900 border-green-400"
                                                        : "bg-gray-900/50 text-gray-400 border-gray-600 hover:border-blue-400 hover:text-blue-400"
                                                        }`}
                                                >
                                                    ${preset}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <label className="block text-green-400 font-mono text-sm uppercase tracking-wide">
                                            <span className="text-blue-400">&gt;</span> Description
                                            (Optional)
                                        </label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="What is this payment for?"
                                            rows={3}
                                            className="w-full bg-gray-900/50 border border-green-400/50 focus:border-blue-400 text-green-400 font-mono px-4 py-3 outline-none transition-colors resize-none"
                                            style={{
                                                boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5)",
                                            }}
                                            disabled={isPending}
                                        />
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <div className="bg-red-900/20 border border-red-500/50 p-4 flex items-start gap-3">
                                            <ExclamationCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-red-400 font-mono text-sm">{error}</p>
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 font-mono uppercase tracking-wider py-4 text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{
                                            clipPath:
                                                "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)",
                                        }}
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            {isPending ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-5 h-5" />
                                                    Proceed to Checkout
                                                </>
                                            )}
                                        </span>
                                    </button>

                                    {/* Info */}
                                    <div className="bg-gray-900/50 border border-blue-400/30 p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 animate-pulse" />
                                            <div className="flex-1">
                                                <p className="text-blue-400 font-mono text-xs uppercase tracking-wide mb-2">
                                                    [System Info]
                                                </p>
                                                <ul className="text-gray-400 font-mono text-xs space-y-1">
                                                    <li>
                                                        <span className="text-green-400">›</span> Secure
                                                        payment processing
                                                    </li>
                                                    <li>
                                                        <span className="text-green-400">›</span> Minimum:
                                                        $1.00 | Maximum: $10,000.00
                                                    </li>
                                                    <li>
                                                        <span className="text-green-400">›</span> All
                                                        transactions are encrypted
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Corner decorations */}
                        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-green-400/50" />
                        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-400/50" />
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-400/50" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-green-400/50" />
                    </div>
                </div>
            </div>
        </div>
    )
}
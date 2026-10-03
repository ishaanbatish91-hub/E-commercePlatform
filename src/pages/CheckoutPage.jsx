import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { formatCurrency } from '../lib/utils'

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  address: z.string().min(8, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(4, 'Zip code required'),
})

const steps = ['Shipping', 'Delivery', 'Payment', 'Review']

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [method, setMethod] = useState('standard')
  const [payment, setPayment] = useState('card')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(shippingSchema) })

  const orderSummary = {
    subtotal: 338,
    shipping: method === 'express' ? 24 : 12,
    tax: 28.9,
    total: method === 'express' ? 398.9 : 386.9,
  }

  const nextStep = () => setCurrentStep((step) => Math.min(step + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((step) => Math.max(step - 1, 0))

  const onSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsSubmitting(false)
    navigate('/order-success')
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Checkout</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-slate-900">Complete your order</h1>
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step} className={`rounded-full px-4 py-3 text-sm font-medium ${index === currentStep ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-600'}`}>
            {index + 1}. {step}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 0 && (
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Shipping address</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                  <input {...register('fullName')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none" placeholder="Aarav Sharma" />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                  <input {...register('email')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none" placeholder="name@example.com" />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Street address</label>
                  <input {...register('address')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none" placeholder="12 Willow Avenue" />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">City</label>
                  <input {...register('city')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none" placeholder="Bengaluru" />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Postal code</label>
                  <input {...register('postalCode')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none" placeholder="560001" />
                  {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Delivery method</h2>
              <div className="mt-6 space-y-4">
                {[
                  { id: 'standard', name: 'Standard delivery', description: '3–5 business days', price: 'Free' },
                  { id: 'express', name: 'Express delivery', description: 'Next-day shipping', price: '$24' },
                ].map((option) => (
                  <button key={option.id} type="button" onClick={() => setMethod(option.id)} className={`flex w-full items-center justify-between rounded-[24px] border p-5 text-left ${method === option.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-800'}`}>
                    <div>
                      <div className="font-semibold">{option.name}</div>
                      <div className={`mt-1 text-sm ${method === option.id ? 'text-slate-200' : 'text-slate-500'}`}>{option.description}</div>
                    </div>
                    <div className="font-medium">{option.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Payment</h2>
              <div className="mt-6 space-y-4">
                {[
                  { id: 'card', name: 'Credit / debit card', detail: 'Visa, Mastercard, Amex' },
                  { id: 'upi', name: 'UPI / wallet', detail: 'Pay by bank transfer or wallet' },
                  { id: 'cod', name: 'Cash on delivery', detail: 'Available for eligible orders' },
                ].map((option) => (
                  <button key={option.id} type="button" onClick={() => setPayment(option.id)} className={`flex w-full items-center justify-between rounded-[24px] border p-5 text-left ${payment === option.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-800'}`}>
                    <div>
                      <div className="font-semibold">{option.name}</div>
                      <div className={`mt-1 text-sm ${payment === option.id ? 'text-slate-200' : 'text-slate-500'}`}>{option.detail}</div>
                    </div>
                    <ShieldCheck size={18} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Review and confirm</h2>
              <div className="mt-6 space-y-4 rounded-[24px] bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 text-slate-500" size={18} />
                  <div>
                    <p className="font-semibold text-slate-900">Shipping address</p>
                    <p className="text-sm text-slate-600">Aarav Sharma, 12 Willow Avenue, Bengaluru, 560001</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-700">
                  <span>Delivery</span>
                  <span>{method === 'express' ? 'Express delivery' : 'Standard delivery'}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-700">
                  <span>Payment</span>
                  <span>{payment === 'card' ? 'Credit card' : payment === 'upi' ? 'UPI' : 'Cash on delivery'}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between gap-3 pt-2">
            {currentStep > 0 && <Button type="button" variant="secondary" onClick={prevStep}>Back</Button>}
            {currentStep < steps.length - 1 ? (
              <Button type="button" className="ml-auto" onClick={nextStep}>Continue <ArrowRight size={16} className="ml-2" /></Button>
            ) : (
              <Button type="submit" className="ml-auto" disabled={isSubmitting}>{isSubmitting ? 'Processing...' : 'Place order'}</Button>
            )}
          </div>
        </form>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Order summary</h2>
          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-3 rounded-[20px] bg-slate-50 p-3">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" alt="Product" className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-medium text-slate-900">AeroRun Pro</p>
                <p className="text-sm text-slate-500">Size 9 • Midnight</p>
              </div>
              <span className="font-semibold text-slate-900">$179</span>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(orderSummary.subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(orderSummary.shipping)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(orderSummary.tax)}</span></div>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
                <span>Total</span>
                <span>{formatCurrency(orderSummary.total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

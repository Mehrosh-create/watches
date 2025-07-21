// components/checkout/CheckoutSteps.tsx
'use client'

import { CheckCircle2 } from 'lucide-react'

export default function CheckoutSteps({ activeStep = 0 }: { activeStep?: number }) {
  const steps = ['Cart', 'Shipping', 'Payment', 'Complete']
  
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div 
          key={step} 
          className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center 
            ${index <= activeStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {index < activeStep ? (
              <CheckCircle2 size={20} />
            ) : (
              index + 1
            )}
          </div>
          <span className={`mt-2 text-sm ${index <= activeStep ? 'font-medium' : 'text-gray-500'}`}>
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className={`h-0.5 flex-1 mt-5 ${index < activeStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          )}
        </div>
      ))}
    </div>
  )
}
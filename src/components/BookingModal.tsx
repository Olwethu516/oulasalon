import { useState, useEffect } from 'react';
import { X, ChevronDown, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { serviceCategories, timeSlots, Service } from '../data/services';
import { supabase, Booking } from '../lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategory?: string;
  preselectedService?: Service;
}

type Step = 'service' | 'datetime' | 'details' | 'confirm';

const STEPS: Step[] = ['service', 'datetime', 'details', 'confirm'];
const STEP_LABELS = ['Service', 'Date & Time', 'Your Details', 'Confirm'];

function StepIndicator({ current }: { current: Step }) {
  const currentIndex = STEPS.indexOf(current);
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
              i < currentIndex ? 'bg-stone-800 text-white' :
              i === currentIndex ? 'bg-stone-800 text-white ring-4 ring-stone-200' :
              'bg-stone-100 text-stone-400'
            }`}
          >
            {i < currentIndex ? '✓' : i + 1}
          </div>
          <span className={`text-xs tracking-wide hidden sm:block ${i === currentIndex ? 'text-stone-800 font-medium' : 'text-stone-400'}`}>
            {STEP_LABELS[i]}
          </span>
          {i < STEPS.length - 1 && (
            <div className={`h-px w-6 sm:w-12 transition-all duration-300 ${i < currentIndex ? 'bg-stone-800' : 'bg-stone-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookingModal({ isOpen, onClose, preselectedCategory, preselectedService }: BookingModalProps) {
  const [step, setStep] = useState<Step>('service');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && preselectedCategory && preselectedService) {
      setSelectedCategory(preselectedCategory);
      setSelectedService(preselectedService);
      setStep('datetime');
    }
  }, [isOpen, preselectedCategory, preselectedService]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('service');
        setSelectedCategory('');
        setSelectedService(null);
        setSelectedDate('');
        setSelectedTime('');
        setForm({ name: '', email: '', phone: '', notes: '' });
        setSuccess(false);
        setError('');
      }, 300);
    }
  }, [isOpen]);

  const categoryServices = serviceCategories.find(c => c.label === selectedCategory)?.services ?? [];

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    setLoading(true);
    setError('');

    const booking: Booking = {
      customer_name: form.name.trim(),
      customer_email: form.email.trim(),
      customer_phone: form.phone.trim(),
      service_category: selectedCategory,
      service_name: selectedService.name,
      service_price: selectedService.price,
      booking_date: selectedDate,
      booking_time: selectedTime,
      notes: form.notes.trim(),
    };

    try {
      const { data, error: dbError } = await supabase.from('bookings').insert(booking).select().maybeSingle();
      if (dbError) throw dbError;

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      await fetch(`${supabaseUrl}/functions/v1/send-booking-notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ booking: { ...booking, id: data?.id } }),
      });

      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col rounded-t-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 shrink-0">
          <h2 className="text-xl font-light text-stone-800 tracking-wide">Book an Appointment</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-stone-800 mb-2">You're booked!</h3>
              <p className="text-stone-500 mb-1">A confirmation has been sent to <strong>{form.email}</strong></p>
              <p className="text-stone-500 mb-6">We'll also send a WhatsApp reminder closer to your appointment.</p>
              <div className="bg-stone-50 rounded-xl p-5 text-left text-sm text-stone-600 space-y-1">
                <p><span className="font-medium">Service:</span> {selectedService?.name}</p>
                <p><span className="font-medium">Date:</span> {new Date(selectedDate + 'T00:00').toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><span className="font-medium">Time:</span> {selectedTime}</p>
                <p><span className="font-medium">Price:</span> R{selectedService?.price.toLocaleString()}</p>
              </div>
              <button onClick={onClose} className="mt-8 w-full py-3 bg-stone-800 text-white text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors">
                Done
              </button>
            </div>
          ) : (
            <>
              <StepIndicator current={step} />

              {step === 'service' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">Category</label>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={e => { setSelectedCategory(e.target.value); setSelectedService(null); }}
                        className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 appearance-none focus:outline-none focus:ring-2 focus:ring-stone-800 pr-10"
                      >
                        <option value="">Select a category</option>
                        {serviceCategories.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    </div>
                  </div>

                  {selectedCategory && (
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">Service</label>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {categoryServices.map(service => (
                          <button
                            key={service.name}
                            onClick={() => setSelectedService(service)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                              selectedService?.name === service.name
                                ? 'border-stone-800 bg-stone-50'
                                : 'border-stone-100 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-stone-800 font-medium text-sm">{service.name}</p>
                                <p className="text-stone-400 text-xs mt-0.5">{service.duration}</p>
                              </div>
                              <p className="text-stone-800 font-semibold text-sm">R{service.price.toLocaleString()}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 'datetime' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      min={minDateStr}
                      max={maxDateStr}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">Select Time</label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 text-sm rounded-lg border transition-all duration-200 ${
                            selectedTime === time
                              ? 'bg-stone-800 text-white border-stone-800'
                              : 'border-stone-200 text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 'details' && (
                <div className="space-y-4">
                  {[
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Smith' },
                    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
                    { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+27 82 000 0000' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-800"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-stone-500 mb-2">Notes (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Any special requests or notes..."
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-800 resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 'confirm' && (
                <div className="space-y-4">
                  <div className="bg-stone-50 rounded-xl p-5 space-y-3 text-sm">
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Booking Summary</p>
                    {[
                      { label: 'Service', value: selectedService?.name },
                      { label: 'Category', value: selectedCategory },
                      { label: 'Price', value: `R${selectedService?.price.toLocaleString()}` },
                      { label: 'Duration', value: selectedService?.duration },
                      { label: 'Date', value: selectedDate ? new Date(selectedDate + 'T00:00').toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '' },
                      { label: 'Time', value: selectedTime },
                      { label: 'Name', value: form.name },
                      { label: 'Email', value: form.email },
                      { label: 'Phone', value: form.phone },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between">
                        <span className="text-stone-400">{item.label}</span>
                        <span className="text-stone-800 font-medium text-right max-w-[55%]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  {form.notes && (
                    <div className="bg-stone-50 rounded-xl p-5 text-sm">
                      <p className="text-stone-400 text-xs tracking-widest uppercase mb-1">Notes</p>
                      <p className="text-stone-700">{form.notes}</p>
                    </div>
                  )}
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {!success && (
          <div className="px-6 py-5 border-t border-stone-100 flex gap-3 shrink-0">
            {step !== 'service' && (
              <button
                onClick={() => setStep(STEPS[STEPS.indexOf(step) - 1])}
                className="flex-1 py-3 border border-stone-200 text-stone-700 text-sm tracking-widest uppercase hover:border-stone-400 transition-colors rounded-lg"
              >
                Back
              </button>
            )}
            {step !== 'confirm' ? (
              <button
                disabled={
                  (step === 'service' && !selectedService) ||
                  (step === 'datetime' && (!selectedDate || !selectedTime)) ||
                  (step === 'details' && (!form.name || !form.email || !form.phone))
                }
                onClick={() => setStep(STEPS[STEPS.indexOf(step) + 1])}
                className="flex-1 py-3 bg-stone-800 text-white text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="flex-1 py-3 bg-stone-800 text-white text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors rounded-lg disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Confirming...</> : 'Confirm Booking'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

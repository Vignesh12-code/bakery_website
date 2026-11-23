import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage = () => {
  const { storeSettings, showToast } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill all required fields.', 'error');
      return;
    }

    try {
      const messages = JSON.parse(localStorage.getItem('crumbco_contact_messages') || '[]');
      messages.push({ ...form, date: new Date().toISOString() });
      localStorage.setItem('crumbco_contact_messages', JSON.stringify(messages));
    } catch (err) {
      console.warn(err);
    }

    setSubmitted(true);
    showToast('Your message was sent! Our team will get back to you shortly.', 'success');
    setForm({ name: '', email: '', phone: '', subject: 'Order Enquiry', message: '' });
  };

  const whatsappUrl = `https://wa.me/${(storeSettings.whatsapp || '919876543210').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Crumb & Co. Bakery! I would like to enquire about placing a custom order.')}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-bakery-caramel uppercase tracking-widest block">
          Get in Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-bakery-blackberry">
          We’d Love to Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-bakery-muted leading-relaxed">
          Have a question about custom birthday cakes, bulk catering, dessert boxes, or dietary requirements? Contact our bakehouse team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
          <h3 className="font-serif text-xl font-bold text-bakery-blackberry border-b border-bakery-border pb-3">
            Bakehouse Information
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 p-3 bg-bakery-vanilla rounded-2xl border border-bakery-border">
              <MapPin className="w-5 h-5 text-bakery-caramel shrink-0 mt-0.5" />
              <div>
                <strong className="block text-bakery-blackberry font-bold">Store Location:</strong>
                <span className="text-bakery-muted">{storeSettings.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-bakery-vanilla rounded-2xl border border-bakery-border">
              <Phone className="w-5 h-5 text-bakery-sage shrink-0 mt-0.5" />
              <div>
                <strong className="block text-bakery-blackberry font-bold">Call Us:</strong>
                <a href={`tel:${storeSettings.phone}`} className="text-bakery-muted hover:underline">
                  {storeSettings.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-bakery-vanilla rounded-2xl border border-bakery-border">
              <Mail className="w-5 h-5 text-bakery-caramel shrink-0 mt-0.5" />
              <div>
                <strong className="block text-bakery-blackberry font-bold">Email Inquiries:</strong>
                <a href={`mailto:${storeSettings.email}`} className="text-bakery-muted hover:underline">
                  {storeSettings.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-bakery-vanilla rounded-2xl border border-bakery-border">
              <Clock className="w-5 h-5 text-bakery-sage shrink-0 mt-0.5" />
              <div>
                <strong className="block text-bakery-blackberry font-bold">Operating Hours:</strong>
                <span className="text-bakery-muted">{storeSettings.openingHours}</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
          <h3 className="font-serif text-xl font-bold text-bakery-blackberry border-b border-bakery-border pb-3">
            Send Us a Message
          </h3>

          {submitted && (
            <div className="p-4 bg-bakery-sage/15 border border-bakery-sage/40 rounded-2xl text-xs text-bakery-blackberry flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-bakery-sage shrink-0" />
              <span>Thank you! Your inquiry was sent to the bakery manager.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ananya"
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="10-digit number"
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                />
              </div>

              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                >
                  <option value="Order Enquiry">Order Enquiry</option>
                  <option value="Custom Cake Consultation">Custom Cake Consultation</option>
                  <option value="Bulk / Corporate Gifting">Bulk / Corporate Gifting</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                Your Message *
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what treats or event dates you are planning..."
                className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-bakery-caramel hover:bg-bakery-caramelHover text-white font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

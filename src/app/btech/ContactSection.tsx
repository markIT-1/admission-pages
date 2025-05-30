"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get In <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-xl text-gray-600">
            Have questions? Our admissions team is here to help
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* WhatsApp */}
          <a
            href="https://wa.me/919274417318"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 text-center border-2 border-green-200 bg-white rounded-lg hover:shadow-lg transform transition duration-300 hover:-translate-y-1 hover:scale-[1.01] cursor-pointer"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              WhatsApp
            </h3>
            <p className="text-gray-600 mb-4">
              Quick responses for urgent queries
            </p>
            <div className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
              Chat on WhatsApp
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+917969080808"
            className="p-6 text-center border-2 border-blue-200 bg-white rounded-lg hover:shadow-lg transform transition duration-300 hover:-translate-y-1 hover:scale-[1.01] cursor-pointer"
          >
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600 mb-4">
              Speak directly with our <br />
              team
            </p>
            <div className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Call Now
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:ug_admissions@daiict.ac.in"
            className="p-6 text-center border-2 border-orange-200 bg-white rounded-lg hover:shadow-lg transform transition duration-300 hover:-translate-y-1 hover:scale-[1.01] cursor-pointer"
          >
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">
              Detailed queries and information
            </p>
            <div className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">
              Send Email
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
// WhatsApp Number : ‪+91 92744 17318‬
// Email ID : ug_admissions@daiict.ac.in
// Call : 079 69 08 08 08
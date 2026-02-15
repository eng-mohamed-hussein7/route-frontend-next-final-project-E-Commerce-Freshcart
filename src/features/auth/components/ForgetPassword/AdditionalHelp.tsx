import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faCircleQuestion,
  faEnvelopeCircleCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const helpCards = [
  {
    icon: faHeadset,
    title: "Contact Support",
    description: "Our customer support team is available 24/7 to assist you.",
    linkText: "Contact Us",
    href: "#",
  },
  {
    icon: faCircleQuestion,
    title: "FAQs",
    description:
      "Find answers to frequently asked questions about your account.",
    linkText: "View FAQs",
    href: "#",
  },
  {
    icon: faEnvelopeCircleCheck,
    title: "Email Not Received?",
    description: "Check your spam folder or request a new reset link.",
    linkText: "Resend Email",
    href: "#",
  },
];

export default function AdditionalHelp() {
  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
          Need additional help?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {helpCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon
                  icon={card.icon}
                  className="text-lg text-primary-600"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1.5"
              >
                {card.linkText}
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

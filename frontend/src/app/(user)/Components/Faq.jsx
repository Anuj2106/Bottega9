'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const ProductFAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      category: "Product Information",
      questions: [
        {
          question: "What types of products does Bottega.in offer?",
          answer: "We offer a curated selection of luxury products including premium leather goods, fashion accessories, artisanal crafts, designer clothing, and exclusive home décor items. All our products are sourced from authentic Italian and international brands known for their exceptional craftsmanship and quality."
        },
        {
          question: "Are all products on Bottega.in authentic?",
          answer: "Yes, we guarantee 100% authenticity of all products sold on our platform. We source directly from authorized distributors and brand partners, ensuring every item comes with proper documentation and authenticity certificates where applicable."
        },
        {
          question: "Do you offer customization or personalization services?",
          answer: "Selected products offer customization options including monogramming, color selection, and size adjustments. Customization availability varies by product and brand. Please check the product page for specific customization options or contact our customer service team."
        },
        {
          question: "What materials are your products made from?",
          answer: "Our products feature premium materials including genuine leather, fine fabrics, precious metals, and sustainable materials. Each product page includes detailed composition information and care instructions. We prioritize quality materials that ensure durability and longevity."
        }
      ]
    },
    {
      category: "Ordering & Payment",
      questions: [
        {
          question: "How can I place an order on Bottega.in?",
          answer: "Placing an order is simple: Browse our collection, select your desired product, choose size/color if applicable, add to cart, proceed to checkout, enter shipping and payment details, and confirm your order. You'll receive an order confirmation email within minutes."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), UPI payments, net banking, digital wallets (Paytm, PhonePe, Google Pay), and EMI options through leading banks. All transactions are secured with 256-bit SSL encryption."
        },
        {
          question: "Can I modify or cancel my order after placing it?",
          answer: "Orders can be modified or cancelled within 2 hours of placement. After this window, orders enter processing and cannot be changed. Please contact our customer service immediately if you need to make changes to your order."
        },
        {
          question: "Do you offer EMI options?",
          answer: "Yes, we offer flexible EMI options on purchases above ₹10,000 through major banks and financial institutions. EMI tenure ranges from 3 to 24 months depending on the purchase amount. No-cost EMI is available on select products during promotional periods."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "What are your shipping charges and delivery times?",
          answer: "We offer free shipping on orders above ₹5,000. For orders below this amount, shipping charges apply based on location. Delivery times: Metro cities 2-3 business days, Tier 2 cities 3-5 business days, Remote areas 5-7 business days. Express delivery options available."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we ship only within India. We're working on expanding our international shipping capabilities. Please subscribe to our newsletter to be notified when international shipping becomes available."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email and SMS. You can track your package using this number on our website's 'Track Order' section or directly on our courier partner's website. Real-time updates are provided throughout the delivery process."
        },
        {
          question: "What if my package is damaged during shipping?",
          answer: "We pack all items with premium protective materials. If your package arrives damaged, please don't accept the delivery and contact us immediately. For packages already received with damage, report within 24 hours with photos for quick resolution."
        }
      ]
    },
    {
      category: "Returns & Exchange",
      questions: [
        {
          question: "What is your return and exchange policy?",
          answer: "We offer a 30-day return and exchange policy from the date of delivery. Items must be unused, in original condition with tags attached, and in original packaging. Certain items like personalized products, intimates, and sale items may have different return conditions."
        },
        {
          question: "How do I initiate a return or exchange?",
          answer: "Log into your account, go to 'My Orders', select the item you want to return/exchange, choose reason, and schedule pickup. Alternatively, contact our customer service. We'll arrange free pickup for returns/exchanges within 24-48 hours."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 5-7 business days after we receive and inspect your returned item. The amount will be credited to your original payment method. For digital wallet payments, refunds may be instant, while bank transfers may take 3-5 additional business days."
        },
        {
          question: "Can I exchange for a different size or color?",
          answer: "Yes, size and color exchanges are available subject to stock availability. The exchange process is the same as returns. If the new item costs more, you'll need to pay the difference. If it costs less, we'll refund the difference."
        }
      ]
    },
    {
      category: "Customer Support",
      questions: [
        {
          question: "How can I contact customer support?",
          answer: "Our customer support team is available via multiple channels: Email us at support@bottega.in, call our helpline at 1800-XXX-XXXX (toll-free), live chat on our website, or WhatsApp us at +91-XXXXX-XXXXX. Support hours: Monday-Saturday 9 AM to 9 PM, Sunday 10 AM to 6 PM."
        },
        {
          question: "Do you have physical stores I can visit?",
          answer: "Yes, we have flagship stores in major Indian cities including Delhi, Mumbai, Bangalore, and Chennai. Visit our 'Store Locator' page for addresses, contact numbers, and operating hours. You can also schedule appointments for personalized shopping experiences."
        },
        {
          question: "Do you offer styling or product consultation services?",
          answer: "Our expert stylists and product consultants are available for personalized recommendations. Book a virtual or in-store consultation through our website or by calling our customer service. This complimentary service helps you choose products that match your style and preferences."
        },
        {
          question: "How do I stay updated on new arrivals and sales?",
          answer: "Subscribe to our newsletter for exclusive updates on new collections, seasonal sales, and special offers. Follow us on social media (@bottegaindia) for daily updates, styling tips, and behind-the-scenes content. Members get early access to sales and limited edition products."
        }
      ]
    }
  ];

  return (
    <div className="container-fluid py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10 col-xxl-8">
          {/* Header Section */}
          <div className="text-center mb-4 mb-md-5">
            <h1 className="display-4 fw-bold text-dark mb-3 mb-md-4">
              Frequently Asked Questions
            </h1>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Find answers to common questions about our products, orders, shipping, and more. 
              Can't find what you're looking for? Contact our customer support team.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="row g-3 g-md-4">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="col-12">
                <div className="card shadow-sm border-0 h-100">
                  {/* Category Header */}
                  <div className="card-header bg-light border-bottom">
                    <h2 className="h4 mb-0 fw-semibold text-dark">
                      {category.category}
                    </h2>
                  </div>
                  
                  {/* Questions */}
                  <div className="card-body p-0">
                    {category.questions.map((item, index) => {
                      const itemKey = `${categoryIndex}-${index}`;
                      const isOpen = openItems[itemKey];
                      
                      return (
                        <div key={index} className="border-bottom border-light">
                          <button
                            className="btn btn-link w-100 text-start p-3 p-md-4 text-decoration-none"
                            style={{
                              border: 'none',
                              borderRadius: '0',
                              backgroundColor: 'transparent'
                            }}
                            onClick={() => toggleItem(itemKey)}
                            aria-expanded={isOpen}
                            type="button"
                          >
                            <div className="d-flex justify-content-between align-items-start">
                              <span 
                                className="h6 mb-0 text-dark fw-medium me-3"
                                style={{ lineHeight: '1.4' }}
                              >
                                {item.question}
                              </span>
                              <span className="flex-shrink-0 ms-2">
                                {isOpen ? (
                                  <ChevronUpIcon size={20} className="text-muted" />
                                ) : (
                                  <ChevronDownIcon size={20} className="text-muted" />
                                )}
                              </span>
                            </div>
                          </button>
                          
                          {/* Collapsible Answer */}
                          <div className={`collapse ${isOpen ? 'show' : ''}`}>
                            <div className="px-3 px-md-4 pb-3 pb-md-4">
                              <p 
                                className="mb-0 text-muted"
                                style={{ 
                                  lineHeight: '1.6',
                                  fontSize: '0.95rem'
                                }}
                              >
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="row justify-content-center mt-4 mt-md-5">
            <div className="col-12 col-lg-10">
              <div 
                className="card border-0 text-white bg-dark "
                
              >
                <div className="card-body text-center p-4 p-md-5">
                  <h3 className="h2 fw-bold mb-3 mb-md-4">
                    Still Have Questions?
                  </h3>
                  <p className="lead mb-4 mb-md-5 opacity-90">
                    Our customer support team is here to help you with any additional questions.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="row g-3 justify-content-center">
                    <div className="col-12 col-sm-6 col-md-4">
                      <button 
                        className="btn  btn-outline-light btn-lg w-100 fw-semibold"
                        
                      >
                        <i className="bi bi-chat-dots me-2"></i>
                        Live Chat
                      </button>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                      <button 
                        className="btn btn-outline-light btn-lg w-100 fw-semibold"
                        
                      >
                        <i className="bi bi-telephone me-2"></i>
                        Call Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFAQ;

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CustomerInfo, CartItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { Sparkles } from 'lucide-react';

interface InvoiceProps {
  customerInfo: CustomerInfo;
  orderId: string;
  onShare: (pdfBlob: Blob) => void;
}

const Invoice: React.FC<InvoiceProps> = ({ customerInfo, orderId, onShare }) => {
  const { cartItems, getCartTotal, getCartTotalWithDiscount, getTotalDiscount } = useCart();
  const invoiceRef = useRef<HTMLDivElement>(null);
  
  const subtotal = getCartTotal();
  const discount = getTotalDiscount();
  const total = getCartTotalWithDiscount();
  const gst = total * 0.18;
  const grandTotal = total + gst;
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  
  const generatePDF = async () => {
    if (!invoiceRef.current) return;
    
    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    const pdfBlob = pdf.output('blob');
    onShare(pdfBlob);
  };

  const handleShareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `*🎆 Invoice from Sri Akilesh Agency*\n\n` +
      `*Sivakasi's Most Popular Cracker Shop*\n` +
      `Invoice #: ${orderId}\n` +
      `Date: ${currentDate}\n\n` +
      `*Customer Details:*\n` +
      `Name: ${customerInfo.name}\n` +
      `Phone: ${customerInfo.phone}\n` +
      `Address: ${customerInfo.address}\n\n` +
      `*Order Summary:*\n` +
      cartItems.map(item => 
        `${item.name} (${item.quantity} x ₹${(item.price - (item.price * item.discountPercentage / 100)).toFixed(2)}) = ₹${((item.price - (item.price * item.discountPercentage / 100)) * item.quantity).toFixed(2)}`
      ).join('\n') +
      `\n\nSubtotal: ₹${subtotal.toFixed(2)}\n` +
      `Discount: -₹${discount.toFixed(2)}\n` +
      `GST (18%): ₹${gst.toFixed(2)}\n` +
      `*Grand Total: ₹${grandTotal.toFixed(2)}*\n\n` +
      `Thank you for choosing Sri Akilesh Agency! 🎉\n` +
      `Retail & Wholesale | Since 2010`
    );

    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div ref={invoiceRef} className="bg-white p-8 max-w-4xl mx-auto text-black">
        {/* Company Logo and Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="flex items-start">
            <img 
              src="https://images.pexels.com/photos/2684383/pexels-photo-2684383.jpeg"
              alt="Sri Akilesh Agency Logo"
              className="h-16 w-16 object-cover rounded-lg mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-black">Sri Akilesh Agency</h1>
              <p className="text-sm text-black font-semibold">Sivakasi's Most Popular Cracker Shop</p>
              <p className="text-sm text-black">Retail & Wholesale Since 2010</p>
              <p className="text-sm text-black">GST: 33AABCS1429B1Z1</p>
              <p className="text-sm text-black">Sivakasi, Tamil Nadu 626123</p>
            </div>
          </div>
          
          <div className="text-right">
            <h2 className="text-2xl font-bold text-black">TAX INVOICE</h2>
            <p className="text-black">Invoice #: {orderId}</p>
            <p className="text-black">Date: {currentDate}</p>
            <p className="text-black">Payment Mode: Cash on Delivery</p>
            <p className="text-sm text-black mt-2">Year: 2025</p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-black mb-2">Bill To:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-black"><span className="font-medium">Name:</span> {customerInfo.name}</p>
              <p className="text-black"><span className="font-medium">Phone:</span> {customerInfo.phone}</p>
              {customerInfo.email && (
                <p className="text-black"><span className="font-medium">Email:</span> {customerInfo.email}</p>
              )}
            </div>
            <div>
              <p className="text-black"><span className="font-medium">Shipping Address:</span></p>
              <p className="text-black">{customerInfo.address}</p>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-black">Item</th>
                <th className="px-4 py-2 text-center text-black">HSN</th>
                <th className="px-4 py-2 text-center text-black">Unit</th>
                <th className="px-4 py-2 text-right text-black">Price</th>
                <th className="px-4 py-2 text-center text-black">Qty</th>
                <th className="px-4 py-2 text-right text-black">Amount</th>
                <th className="px-4 py-2 text-right text-black">Discount</th>
                <th className="px-4 py-2 text-right text-black">GST</th>
                <th className="px-4 py-2 text-right text-black">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartItems.map((item, index) => {
                const itemSubtotal = item.price * item.quantity;
                const itemDiscount = (itemSubtotal * item.discountPercentage) / 100;
                const itemGST = ((itemSubtotal - itemDiscount) * 18) / 100;
                const itemTotal = itemSubtotal - itemDiscount + itemGST;

                return (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-black">{item.name}</td>
                    <td className="px-4 py-2 text-center text-black">36022010</td>
                    <td className="px-4 py-2 text-center text-black">{item.unit}</td>
                    <td className="px-4 py-2 text-right text-black">₹{item.price.toFixed(2)}</td>
                    <td className="px-4 py-2 text-center text-black">{item.quantity}</td>
                    <td className="px-4 py-2 text-right text-black">₹{itemSubtotal.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right text-black">₹{itemDiscount.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right text-black">₹{itemGST.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right font-medium text-black">₹{itemTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-2">
            <p className="text-sm text-black">
              <span className="font-medium">Bank Details:</span><br />
              Bank Name: HDFC Bank<br />
              A/C No: 50200012345678<br />
              IFSC Code: HDFC0001234<br />
              Branch: Sivakasi
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-black">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-black">
              <span>GST (18%):</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 text-black">
              <span>Grand Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Terms and Signature */}
        <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-6">
          <div>
            <h4 className="font-bold mb-2 text-black">Terms & Conditions:</h4>
            <ul className="text-sm text-black list-disc pl-4 space-y-1">
              <li>Goods once sold cannot be returned</li>
              <li>Payment to be made on delivery</li>
              <li>Subject to Sivakasi jurisdiction</li>
              <li>This is a computer-generated invoice</li>
              <li>Valid for retail and wholesale purchases</li>
            </ul>
          </div>
          <div className="text-right">
            <p className="font-medium mb-8 text-black">For Sri Akilesh Agency</p>
            <p className="font-medium text-black">Authorized Signatory</p>
            <p className="text-xs text-black mt-2">Sivakasi, Tamil Nadu</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          className="btn btn-primary"
          onClick={generatePDF}
        >
          Download PDF
        </button>
        <button
          className="btn bg-green-500 hover:bg-green-600 text-white"
          onClick={handleShareOnWhatsApp}
        >
          Share via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default Invoice;
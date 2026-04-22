import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  FaReceipt,
  FaTruck,
  FaBox,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";

const MyOrders = () => {
  const { axios } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/my-orders");
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  // ===================== INVOICE =====================
  const generateInvoice = (order) => {
    const invoiceContent = `
      <html>
        <head>
          <title>Creamantra Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #fff7f0;
              padding: 30px;
            }

            .invoice-box {
              max-width: 850px;
              margin: auto;
              background: #ffffff;
              padding: 35px;
              border-radius: 14px;
              box-shadow: 0 12px 35px rgba(0,0,0,0.08);
            }

            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              background: linear-gradient(90deg,#f97316,#fb923c);
              color: white;
              padding: 20px 25px;
              border-radius: 12px;
            }

            .logo {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .logo img {
              width: 50px;
            }

            .header h2 {
              margin: 0;
              letter-spacing: 0.5px;
            }

            .section {
              display: flex;
              justify-content: space-between;
              margin-top: 30px;
              background: #fff7f0;
              padding: 18px;
              border-radius: 10px;
            }

            .section h4 {
              margin-bottom: 6px;
              color: #f97316;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 30px;
            }

            th {
              background: #fff7f0;
              color: #f97316;
              padding: 14px;
              text-align: left;
              border-bottom: 2px solid #ffe0cc;
            }

            td {
              padding: 14px;
              border-bottom: 1px solid #eee;
            }

            .total-box {
              margin-top: 30px;
              background: #fff7f0;
              padding: 20px;
              border-radius: 10px;
            }

            .total {
              display: flex;
              justify-content: space-between;
              font-size: 18px;
              margin-bottom: 8px;
            }

            .grand {
              font-size: 22px;
              font-weight: bold;
              color: #f97316;
            }

            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 13px;
              color: #777;
            }

            .badge {
              background: #ffe0cc;
              color: #f97316;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
            }

            .thanks {
              margin-top: 25px;
              background: #fff7f0;
              padding: 15px;
              border-radius: 10px;
              text-align: center;
              color: #555;
            }
          </style>
        </head>

        <body>
          <div class="invoice-box">

            <!-- HEADER -->
            <div class="header">
              <div class="logo">
                <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" />
                <div>
                  <h2>Creamantra</h2>
                  <small>Cafe & Restaurant</small>
                </div>
              </div>

              <div>
                <p><strong>Invoice #</strong> INV-${order._id
                  .slice(-6)
                  .toUpperCase()}</p>
                <p>${new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <!-- CUSTOMER INFO -->
            <div class="section">
              <div>
                <h4>Billed To</h4>
                <p>${order.address}</p>
              </div>

              <div style="text-align:right">
                <h4>Payment Method</h4>
                <p>${order.paymentMethod}</p>
              </div>
            </div>

            <!-- ORDER TABLE -->
            <table>
              <thead>
                <tr>
                  <th>Order Items</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${order.items.length} item(s)</td>
                  <td><span class="badge">${order.status}</span></td>
                  <td>₹${order.totalAmount}</td>
                </tr>
              </tbody>
            </table>

            <!-- TOTAL -->
            <div class="total-box">
              <div class="total">
                <span>Subtotal</span>
                <span>₹${order.totalAmount}</span>
              </div>

              <div class="total">
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <hr/>

              <div class="total grand">
                <span>Total Amount</span>
                <span>₹${order.totalAmount}</span>
              </div>
            </div>

            <div class="thanks">
              Thank you for ordering from Creamantra 💛<br/>
              We hope to serve you again soon!
            </div>

            <!-- FOOTER -->
            <div class="footer">
              Creamantra Cafe • Fresh Food • Fast Delivery
            </div>

          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `;

    const win = window.open("", "_blank");
    win.document.write(invoiceContent);
    win.document.close();
  };

  // ===================== TRACKING =====================
  const renderTrackingTimeline = (status) => {
    const steps = ["pending", "processing", "shipped", "delivered"];
    const current = steps.indexOf(status?.toLowerCase());

    return (
      <div className="mt-6">
        <div className="flex justify-between items-center relative">
          <div className="absolute w-full h-1 bg-gray-200 top-1/2"></div>
          <div
            className="absolute h-1 bg-orange-500 top-1/2"
            style={{ width: `${(current / 3) * 100}%` }}
          ></div>

          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-white ${
                  i <= current ? "bg-orange-500" : "bg-gray-300"
                }`}
              >
                {i === 0 && <FaClipboardList />}
                {i === 1 && <FaBox />}
                {i === 2 && <FaTruck />}
                {i === 3 && <FaCheckCircle />}
              </div>
              <span className="text-xs mt-1 capitalize">{s}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-orange-600 mb-8">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-orange-100 p-6 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">
                    Order #{order._id.slice(-6)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => generateInvoice(order)}
                  className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-md hover:bg-orange-200 transition"
                >
                  <FaReceipt /> Invoice
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">Address</p>
                  <p>{order.address}</p>
                </div>
                <div>
                  <p className="text-gray-500">Payment</p>
                  <p>{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="text-orange-600 font-semibold">
                    ₹{order.totalAmount}
                  </p>
                </div>
              </div>

              {renderTrackingTimeline(order.status)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
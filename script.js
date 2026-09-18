// Initial Sample CRM Lead Data
let bookings = [
  { id: 'PP-1001', name: 'Ramesh Sharma', gotra: 'Kashyap', item: 'Monday Shiva Chadawa', date: '2026-09-21', phone: '9826000000', price: 501, status: 'Completed' },
  { id: 'PP-1002', name: 'Anita Verma', gotra: 'Bharadwaj', item: 'Satyanarayan Pooja', date: '2026-09-22', phone: '9111000000', price: 1100, status: 'Pending' }
];

let currentPrice = 0;
let currentItem = '';

// Initialize Page
document.addEventListener("DOMContentLoaded", function() {
  const dateInput = document.getElementById('poojaDate');
  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }
  renderCRM();
});

// Modal Control
function openBookingModal(item, price) {
  currentItem = item;
  currentPrice = price;
  document.getElementById('selectedItem').value = item;
  document.getElementById('modalPrice').innerText = 'Total: ₹' + price;
  document.getElementById('bookingModal').style.display = 'flex';
}

function closeBookingModal() {
  document.getElementById('bookingModal').style.display = 'none';
}

// Razorpay Integration & Automated WhatsApp Redirection
function handlePayment(event) {
  event.preventDefault();
  
  const name = document.getElementById('devoteeName').value;
  const gotra = document.getElementById('devoteeGotra').value;
  const phone = document.getElementById('devoteePhone').value;
  const address = document.getElementById('devoteeAddress').value;
  const date = document.getElementById('poojaDate').value;
  const bookingId = 'PP-' + Math.floor(1000 + Math.random() * 9000);

  // Razorpay Checkout Configuration
  var options = {
    "key": "rzp_test_YourKeyHere", // Replace with your live Razorpay Key ID
    "amount": currentPrice * 100, // Amount in paise
    "currency": "INR",
    "name": "POOJAPRASAD",
    "description": "Sankalp Booking for " + currentItem,
    "handler": function (response) {
      processBookingSuccess(bookingId, name, gotra, phone, address, date, currentItem, currentPrice);
    },
    "prefill": {
      "name": name,
      "contact": phone
    },
    "theme": { "color": "#990000" }
  };

  try {
    var rzp1 = new Razorpay(options);
    rzp1.open();
  } catch (err) {
    // Fallback mode for testing
    alert("Simulating Payment Gateway Success...");
    processBookingSuccess(bookingId, name, gotra, phone, address, date, currentItem, currentPrice);
  }
}

// Process Booking & Instant WhatsApp Redirect
function processBookingSuccess(id, name, gotra, phone, address, date, item, price) {
  // Add to CRM DB
  bookings.push({
    id: id,
    name: name,
    gotra: gotra,
    item: item,
    date: date,
    phone: phone,
    price: price,
    status: 'Pending'
  });

  renderCRM();
  closeBookingModal();

  // Format WhatsApp Message
  const message = `*🚩 NEW POOJA & PRASAD BOOKING CONFIRMATION*%0A%0A` +
    `*Booking ID:* ${id}%0A` +
    `*Devotee Name:* ${name}%0A` +
    `*Gotra:* ${gotra}%0A` +
    `*Selected Offering:* ${item}%0A` +
    `*Pooja Date:* ${date}%0A` +
    `*Amount Paid:* ₹${price}%0A` +
    `*Address:* ${address}%0A%0A` +
    `Please confirm priest assignment and ritual video schedule.`;

  const whatsappURL = `https://wa.me/918103805945?text=${message}`;
  window.location.href = whatsappURL;
}

// Admin CRM Management
function toggleAdminPanel() {
  const pass = prompt("Enter Admin Passcode (Default: admin123):");
  if (pass === "admin123") {
    const panel = document.getElementById('crmSection');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    window.scrollTo({ top: panel.offsetTop, behavior: 'smooth' });
  } else {
    alert("Invalid Access Passcode.");
  }
}

function renderCRM() {
  const tbody = document.getElementById('crmTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  let totalRev = 0;
  let pendingCount = 0;

  bookings.forEach((b, index) => {
    totalRev += b.price;
    if (b.status === 'Pending') pendingCount++;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><b>${b.id}</b></td>
      <td>${b.name}</td>
      <td>${b.gotra}</td>
      <td>${b.item}</td>
      <td>${b.date}</td>
      <td>${b.phone}</td>
      <td>₹${b.price}</td>
      <td><span class="status-badge status-${b.status}">${b.status}</span></td>
      <td>
        <button class="btn btn-outline" style="padding:4px 8px; font-size:12px;" onclick="toggleStatus(${index})">Toggle Status</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('statTotalBookings').innerText = bookings.length;
  document.getElementById('statTotalRevenue').innerText = '₹' + totalRev;
  document.getElementById('statPendingOrders').innerText = pendingCount;
}

function toggleStatus(index) {
  bookings[index].status = bookings[index].status === 'Pending' ? 'Completed' : 'Pending';
  renderCRM();
}

function exportLeadsCSV() {
  let csvContent = "data:text/csv;charset=utf-8,ID,Name,Gotra,Item,Date,Phone,Price,Status\n";
  bookings.forEach(b => {
    csvContent += `${b.id},${b.name},${b.gotra},${b.item},${b.date},${b.phone},${b.price},${b.status}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "poojaprasad_leads.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
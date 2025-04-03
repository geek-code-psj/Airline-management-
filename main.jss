// DOM Elements
const nav = document.querySelector('.glass-nav');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const originInput = document.getElementById('origin');
const destinationInput = document.getElementById('destination');
const originSuggestions = document.getElementById('origin-suggestions');
const destinationSuggestions = document.getElementById('destination-suggestions');
const swapBtn = document.querySelector('.swap-btn');
const travelersSelect = document.querySelector('.travelers-select');
const travelersDropdown = document.querySelector('.travelers-dropdown');
const searchBtn = document.querySelector('.search-btn');
const flightResults = document.getElementById('flight-results');
const flightCards = document.getElementById('flight-cards');
const sortBy = document.getElementById('sort-by');
const bookingModal = document.getElementById('booking-modal');
const closeModal = document.querySelector('.close-modal');
const bookingSteps = document.querySelectorAll('.step');
const bookingContent = document.querySelector('.booking-content');
    ``
// Sample Data
const airports = [
    { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York' },
    { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles' },
    { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago' },
    { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas' },
    { code: 'DEN', name: 'Denver International Airport', city: 'Denver' },
    { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco' },
    { code: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle' },
    { code: 'MIA', name: 'Miami International Airport', city: 'Miami' },
    { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta' },
    { code: 'BOS', name: 'Logan International Airport', city: 'Boston' }
];

const flights = [
    {
        id: 'FL001',
        airline: 'Delta Airlines',
        airlineCode: 'DL',
        departure: { time: '08:00', airport: 'JFK' },
        arrival: { time: '11:30', airport: 'LAX' },
        duration: '6h 30m',
        price: 299,
        seats: 120,
        stops: 0,
        departureDate: '2023-06-15',
        arrivalDate: '2023-06-15'
    },
    {
        id: 'FL002',
        airline: 'American Airlines',
        airlineCode: 'AA',
        departure: { time: '10:15', airport: 'JFK' },
        arrival: { time: '13:45', airport: 'LAX' },
        duration: '6h 30m',
        price: 279,
        seats: 85,
        stops: 0,
        departureDate: '2023-06-15',
        arrivalDate: '2023-06-15'
    },
    {
        id: 'FL003',
        airline: 'United Airlines',
        airlineCode: 'UA',
        departure: { time: '12:30', airport: 'JFK' },
        arrival: { time: '18:15', airport: 'LAX' },
        duration: '8h 45m',
        price: 249,
        seats: 150,
        stops: 1,
        departureDate: '2023-06-15',
        arrivalDate: '2023-06-15'
    },
    {
        id: 'FL004',
        airline: 'JetBlue',
        airlineCode: 'B6',
        departure: { time: '15:45', airport: 'JFK' },
        arrival: { time: '19:15', airport: 'LAX' },
        duration: '6h 30m',
        price: 319,
        seats: 95,
        stops: 0,
        departureDate: '2023-06-15',
        arrivalDate: '2023-06-15'
    },
    {
        id: 'FL005',
        airline: 'Alaska Airlines',
        airlineCode: 'AS',
        departure: { time: '18:00', airport: 'JFK' },
        arrival: { time: '22:30', airport: 'LAX' },
        duration: '7h 30m',
        price: 269,
        seats: 110,
        stops: 0,
        departureDate: '2023-06-15',
        arrivalDate: '2023-06-15'
    }
];

const recommendations = [
    {
        id: 'REC001',
        destination: 'Paris, France',
        image: 'paris.jpg',
        description: 'Romantic getaway to the city of love',
        price: 599,
        duration: '7 days'
    },
    {
        id: 'REC002',
        destination: 'Tokyo, Japan',
        image: 'tokyo.jpg',
        description: 'Experience the vibrant culture of Japan',
        price: 899,
        duration: '10 days'
    },
    {
        id: 'REC003',
        destination: 'Cancun, Mexico',
        image: 'cancun.jpg',
        description: 'Relax on beautiful Caribbean beaches',
        price: 449,
        duration: '5 days'
    },
    {
        id: 'REC004',
        destination: 'Rome, Italy',
        image: 'rome.jpg',
        description: 'Explore ancient history and delicious cuisine',
        price: 699,
        duration: '8 days'
    }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadRecommendations();
    
    // Set minimum date for departure to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departure-date').min = today;
    
    // Set return date to 7 days after departure by default
    document.getElementById('departure-date').addEventListener('change', (e) => {
        const returnDate = document.getElementById('return-date');
        if (e.target.value) {
            const departureDate = new Date(e.target.value);
            departureDate.setDate(departureDate.getDate() + 7);
            const nextWeek = departureDate.toISOString().split('T')[0];
            returnDate.min = e.target.value;
            returnDate.value = nextWeek;
        }
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

originInput.addEventListener('input', (e) => {
    showAirportSuggestions(e.target.value, originSuggestions);
});

destinationInput.addEventListener('input', (e) => {
    showAirportSuggestions(e.target.value, destinationSuggestions);
});

originSuggestions.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV') {
        const airportCode = e.target.getAttribute('data-code');
        const airportName = e.target.getAttribute('data-name');
        originInput.value = `${airportName} (${airportCode})`;
        originSuggestions.style.display = 'none';
    }
});

destinationSuggestions.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV') {
        const airportCode = e.target.getAttribute('data-code');
        const airportName = e.target.getAttribute('data-name');
        destinationInput.value = `${airportName} (${airportCode})`;
        destinationSuggestions.style.display = 'none';
    }
});

swapBtn.addEventListener('click', () => {
    const temp = originInput.value;
    originInput.value = destinationInput.value;
    destinationInput.value = temp;
});

travelersSelect.addEventListener('click', () => {
    travelersDropdown.style.display = travelersDropdown.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
    if (!travelersSelect.contains(e.target)) {
        travelersDropdown.style.display = 'none';
    }
    
    if (e.target !== originInput && e.target !== destinationInput) {
        originSuggestions.style.display = 'none';
        destinationSuggestions.style.display = 'none';
    }
});

searchBtn.addEventListener('click', () => {
    showFlightResults();
});

sortBy.addEventListener('change', () => {
    sortFlights();
});

closeModal.addEventListener('click', () => {
    bookingModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.style.display = 'none';
    }
});

bookingSteps.forEach(step => {
    step.addEventListener('click', () => {
        const stepNumber = step.getAttribute('data-step');
        showBookingStep(stepNumber);
    });
});

// Functions
function showAirportSuggestions(query, container) {
    if (!query) {
        container.style.display = 'none';
        return;
    }
    
    const filtered = airports.filter(airport => 
        airport.code.toLowerCase().includes(query.toLowerCase()) || 
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.city.toLowerCase().includes(query.toLowerCase())
    );
    
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    filtered.forEach(airport => {
        const div = document.createElement('div');
        div.textContent = `${airport.city} (${airport.code}) - ${airport.name}`;
        div.setAttribute('data-code', airport.code);
        div.setAttribute('data-name', `${airport.city} (${airport.code})`);
        container.appendChild(div);
    });
    
    container.style.display = 'block';
}

function loadRecommendations() {
    const container = document.querySelector('.recommendation-cards');
    container.innerHTML = '';
    
    recommendations.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.innerHTML = `
            <div class="card-image">
                <img src="images/${rec.image}" alt="${rec.destination}">
            </div>
            <div class="card-content">
                <h3>${rec.destination}</h3>
                <p>${rec.description}</p>
                <div class="card-price">$${rec.price}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function showFlightResults() {
    flightResults.style.display = 'block';
    flightCards.innerHTML = '';
    
    flights.forEach(flight => {
        const card = document.createElement('div');
        card.className = 'flight-card';
        card.setAttribute('data-id', flight.id);
        card.innerHTML = `
            <div class="flight-time">
                <span>${flight.departure.time}</span>
                <span>${flight.departure.airport}</span>
            </div>
            <div class="flight-duration">
                <span>${flight.duration}</span>
            </div>
            <div class="flight-time">
                <span>${flight.arrival.time}</span>
                <span>${flight.arrival.airport}</span>
            </div>
            <div class="flight-airline">
                <div class="airline-logo">
                    ${flight.airlineCode}
                </div>
                <span>${flight.airline}</span>
            </div>
            <div class="flight-price">
                <span>$${flight.price}</span>
                <span>Round trip</span>
            </div>
        `;
        flightCards.appendChild(card);
        
        card.addEventListener('click', () => {
            openBookingModal(flight);
        });
    });
    
    // Scroll to results
    flightResults.scrollIntoView({ behavior: 'smooth' });
}

function sortFlights() {
    const value = sortBy.value;
    let sortedFlights = [...flights];
    
    switch (value) {
        case 'price-asc':
            sortedFlights.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedFlights.sort((a, b) => b.price - a.price);
            break;
        case 'duration-asc':
            sortedFlights.sort((a, b) => {
                const aDuration = convertDurationToMinutes(a.duration);
                const bDuration = convertDurationToMinutes(b.duration);
                return aDuration - bDuration;
            });
            break;
        case 'departure-asc':
            sortedFlights.sort((a, b) => a.departure.time.localeCompare(b.departure.time));
            break;
    }
    
    flightCards.innerHTML = '';
    sortedFlights.forEach(flight => {
        const card = document.createElement('div');
        card.className = 'flight-card';
        card.setAttribute('data-id', flight.id);
        card.innerHTML = `
            <div class="flight-time">
                <span>${flight.departure.time}</span>
                <span>${flight.departure.airport}</span>
            </div>
            <div class="flight-duration">
                <span>${flight.duration}</span>
            </div>
            <div class="flight-time">
                <span>${flight.arrival.time}</span>
                <span>${flight.arrival.airport}</span>
            </div>
            <div class="flight-airline">
                <div class="airline-logo">
                    ${flight.airlineCode}
                </div>
                <span>${flight.airline}</span>
            </div>
            <div class="flight-price">
                <span>$${flight.price}</span>
                <span>Round trip</span>
            </div>
        `;
        flightCards.appendChild(card);
        
        card.addEventListener('click', () => {
            openBookingModal(flight);
        });
    });
}

function convertDurationToMinutes(duration) {
    const parts = duration.split(' ');
    let total = 0;
    
    parts.forEach(part => {
        if (part.includes('h')) {
            total += parseInt(part) * 60;
        } else if (part.includes('m')) {
            total += parseInt(part);
        }
    });
    
    return total;
}

function openBookingModal(flight) {
    bookingModal.style.display = 'block';
    showBookingStep('1');
    
    // Set flight details in step 1
    const step1Content = `
        <div class="flight-details">
            <h3>Flight Details</h3>
            <div class="flight-summary">
                <div class="flight-info">
                    <div class="flight-segment">
                        <div class="segment-time">
                            <span>${flight.departure.time}</span>
                            <span>${flight.departure.airport}</span>
                        </div>
                        <div class="segment-duration">
                            <span>${flight.duration}</span>
                        </div>
                        <div class="segment-time">
                            <span>${flight.arrival.time}</span>
                            <span>${flight.arrival.airport}</span>
                        </div>
                    </div>
                    <div class="flight-airline">
                        <div class="airline-logo">
                            ${flight.airlineCode}
                        </div>
                        <span>${flight.airline}</span>
                    </div>
                </div>
                <div class="flight-price">
                    <span>Total Price</span>
                    <span class="price">$${flight.price}</span>
                </div>
            </div>
            <button class="next-btn">Continue to Passenger Info</button>
        </div>
    `;
    
    bookingContent.innerHTML = step1Content;
    
    // Add event listener for next button
    document.querySelector('.next-btn')?.addEventListener('click', () => {
        showBookingStep('2');
    });
}

function showBookingStep(stepNumber) {
    // Update active step
    bookingSteps.forEach(step => {
        if (step.getAttribute('data-step') === stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Show appropriate content
    switch (stepNumber) {
        case '1':
            // Already set in openBookingModal
            break;
        case '2':
            bookingContent.innerHTML = `
                <div class="passenger-info">
                    <h3>Passenger Information</h3>
                    <form id="passenger-form">
                        <div class="form-group">
                            <label for="first-name">First Name</label>
                            <input type="text" id="first-name" required>
                        </div>
                        <div class="form-group">
                            <label for="last-name">Last Name</label>
                            <input type="text" id="last-name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="passport">Passport Number</label>
                            <input type="text" id="passport" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="back-btn">Back</button>
                            <button type="button" class="next-btn">Continue to Seat Selection</button>
                        </div>
                    </form>
                </div>
            `;
            
            document.querySelector('.back-btn')?.addEventListener('click', () => {
                showBookingStep('1');
            });
            
            document.querySelector('.next-btn')?.addEventListener('click', () => {
                showBookingStep('3');
            });
            break;
        case '3':
            bookingContent.innerHTML = `
                <div class="seat-selection">
                    <h3>Seat Selection</h3>
                    <div class="seat-map">
                        <div class="airplane-cabin">
                            <div class="cabin-front">Front</div>
                            <div class="seat-rows">
                                ${generateSeatMap()}
                            </div>
                        </div>
                    </div>
                    <div class="seat-legend">
                        <div class="legend-item">
                            <div class="seat available"></div>
                            <span>Available</span>
                        </div>
                        <div class="legend-item">
                            <div class="seat selected"></div>
                            <span>Selected</span>
                        </div>
                        <div class="legend-item">
                            <div class="seat occupied"></div>
                            <span>Occupied</span>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="back-btn">Back</button>
                        <button type="button" class="next-btn">Continue to Payment</button>
                    </div>
                </div>
            `;
            
            // Add seat selection functionality
            document.querySelectorAll('.seat.available').forEach(seat => {
                seat.addEventListener('click', function() {
                    this.classList.toggle('selected');
                });
            });
            
            document.querySelector('.back-btn')?.addEventListener('click', () => {
                showBookingStep('2');
            });
            
            document.querySelector('.next-btn')?.addEventListener('click', () => {
                showBookingStep('4');
            });
            break;
        case '4':
            bookingContent.innerHTML = `
                <div class="payment">
                    <h3>Payment Information</h3>
                    <form id="payment-form">
                        <div class="form-group">
                            <label for="card-number">Card Number</label>
                            <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="expiry">Expiry Date</label>
                                <input type="text" id="expiry" placeholder="MM/YY" required>
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="123" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="card-name">Name on Card</label>
                            <input type="text" id="card-name" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="back-btn">Back</button>
                            <button type="submit" class="submit-btn">Confirm Payment</button>
                        </div>
                    </form>
                </div>
            `;
            
            document.querySelector('.back-btn')?.addEventListener('click', () => {
                showBookingStep('3');
            });
            
            document.getElementById('payment-form')?.addEventListener('submit', (e) => {
                e.preventDefault();
                showBookingStep('5');
            });
            break;
        case '5':
            bookingContent.innerHTML = `
                <div class="confirmation">
                    <div class="confirmation-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Booking Confirmed!</h3>
                    <p>Your flight has been successfully booked. A confirmation email has been sent to your registered email address.</p>
                    <div class="booking-reference">
                        <span>Booking Reference:</span>
                        <strong>SKY${Math.floor(100000 + Math.random() * 900000)}</strong>
                    </div>
                    <button class="done-btn">Return to Home</button>
                </div>
            `;
            
            document.querySelector('.done-btn')?.addEventListener('click', () => {
                bookingModal.style.display = 'none';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            break;
    }
}

function generateSeatMap() {
    let html = '';
    const rows = 20;
    const seatsPerRow = 6;
    const occupiedSeats = new Set();
    
    // Randomly occupy some seats
    for (let i = 0; i < 30; i++) {
        const row = Math.floor(Math.random() * rows) + 1;
        const seat = String.fromCharCode(65 + Math.floor(Math.random() * seatsPerRow));
        occupiedSeats.add(`${row}${seat}`);
    }
    
    for (let row = 1; row <= rows; row++) {
        html += `<div class="seat-row">`;
        html += `<div class="row-number">${row}</div>`;
        
        for (let seatNum = 0; seatNum < seatsPerRow; seatNum++) {
            const seatLetter = String.fromCharCode(65 + seatNum);
            const seatId = `${row}${seatLetter}`;
            const isOccupied = occupiedSeats.has(seatId);
            const seatClass = isOccupied ? 'occupied' : 'available';
            
            // Add aisle gap
            if (seatNum === 3) {
                html += `<div class="aisle-gap"></div>`;
            }
            
            html += `<div class="seat ${seatClass}" data-seat="${seatId}">${seatLetter}</div>`;
        }
        
        html += `</div>`;
    }
    
    return html;
}

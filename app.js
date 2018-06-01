const form = document.getElementById('loan-form');
const results = document.getElementById('results');
const loader = document.getElementById('loading');
    
form.addEventListener('submit', function (e) {
  results.style.display = 'none';
  loader.style.display = 'block';
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});


//calculateResults
function calculateResults(e) {
  console.log('calculating...');

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1+calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    results.style.display = 'block';
    loader.style.display = 'none'; 
  } else {
    showError('Please Check Your Numbers');
  }
  
}

function showError(error) {
  results.style.display = 'none';
  loader.style.display = 'none';
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // create alert div
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);

}

function clearError() {
  document.querySelector('.alert').remove();
}
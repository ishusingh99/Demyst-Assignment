function fetchBalanceSheetsAndPopulatePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const businessName = urlParams.get('businessName');
    const yearEstablished = urlParams.get('yearEstablished');
    const loanAmount = urlParams.get('loanAmount');

    // Make an AJAX request to your Django backend to fetch balance sheet data
    fetch(`request_balance_sheet/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            business_name: businessName,
            year_established: yearEstablished,
            loan_amount: loanAmount,
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Business not found');
        }
        return response.json();
    })
    .then((data) => {
        // Populate the HTML elements with fetched data
        document.getElementById('businessName').textContent = data.name;
        document.getElementById('yearEstablished').textContent = data.year_established;

        const balanceSheetsList = document.getElementById('balanceSheets');
        balanceSheetsList.innerHTML = ''; // Clear any previous data

        data.balance_sheets.forEach((balanceSheet) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${balanceSheet.date}: Profit/Loss - ${balanceSheet.profit_or_loss}`;
            balanceSheetsList.appendChild(listItem);
        });

        // Enable the Submit Application button
        document.getElementById('submitApplication').disabled = false;
    })
    .catch((error) => {
        console.error(error);
        // Handle the error, e.g., display an error message to the user
    });
}


function fetchPreAssessmentDataAndPopulatePage() {
    // Extract query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const businessName = urlParams.get('businessName');
    const yearEstablished = urlParams.get('yearEstablished');
    const loanAmount = urlParams.get('loanAmount');

    // Make an AJAX request to your Django backend to fetch pre-assessment data
    fetch(`/api/submit_application/?businessName=${businessName}&yearEstablished=${yearEstablished}`, {
        method: 'GET',
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Business not found');
        }
        return response.json();
    })
    .then((data) => {
        // Populate the HTML elements with fetched data
        document.getElementById('businessName').textContent = data.name;
        document.getElementById('yearEstablished').textContent = data.year_established;
        document.getElementById('loanAmount').textContent = data.loan_amount;
        document.getElementById('preAssessment').textContent = data.pre_assessment;
        document.getElementById('message').textContent = data.Message;
    })
    .catch((error) => {
        console.error(error);
        // Handle the error, e.g., display an error message to the user
    });
}

function fetchBalanceSheetsAndPopulatePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const businessName = urlParams.get('businessName');
    const yearEstablished = urlParams.get('yearEstablished');
    const loanAmount = urlParams.get('loanAmount');

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
        document.getElementById('businessName').textContent = data.name;
        document.getElementById('yearEstablished').textContent = data.year_established;

        const balanceSheetsList = document.getElementById('balanceSheets');
        balanceSheetsList.innerHTML = '';

        data.balance_sheets.forEach((balanceSheet) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${balanceSheet.date}: Profit/Loss - ${balanceSheet.profit_or_loss}`;
            balanceSheetsList.appendChild(listItem);
        });

        document.getElementById('submitApplication').disabled = false;
    })
    .catch((error) => {
        console.error(error);
    });
}


function fetchPreAssessmentDataAndPopulatePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const businessName = urlParams.get('businessName');
    const yearEstablished = urlParams.get('yearEstablished');
    const loanAmount = urlParams.get('loanAmount');


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
        document.getElementById('businessName').textContent = data.name;
        document.getElementById('yearEstablished').textContent = data.year_established;
        document.getElementById('loanAmount').textContent = data.loan_amount;
        document.getElementById('preAssessment').textContent = data.pre_assessment;
        document.getElementById('message').textContent = data.Message;
    })
    .catch((error) => {
        console.error(error);
    });
}

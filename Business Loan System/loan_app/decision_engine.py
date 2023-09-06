def calculate_pre_assessment(balance_sheets, loan_amount):
    
    total_profit_loss = 0
    countp = 0
    for sheet in balance_sheets:
        total_profit_loss += sheet['profit_loss']
        countp+=1
        if countp == 12:
            break
    
    counta = 0
    total_asset_value = 0
    for sheet in balance_sheets:
        total_asset_value += sheet['assets_value']
        counta+=1
        if counta == 12:
            break

    average_asset_value = total_asset_value/counta
    if average_asset_value > loan_amount:
        return 100
    elif total_profit_loss > 0:
        return 60
    else:
        return 20

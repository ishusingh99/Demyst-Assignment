def calculate_pre_assessment(balance_sheets, loan_amount):
    #total_profit_loss = sum(sheet['profit_loss'] for sheet in balance_sheets)
    total_profit_loss = 0
    count = 0
    for sheet in balance_sheets:
        total_profit_loss += sheet['profit_loss']
        count+=1
        if count == 12:
            break
    
    count = 0
    total_asset_value = 0
    for sheet in balance_sheets:
        total_asset_value += sheet['assets_value']
        count+=1
        if count == 12:
            break

    average_asset_value = total_asset_value/12
    print(average_asset_value)
    if average_asset_value > loan_amount:
        return 100
    elif total_profit_loss > 0:
        return 60
    else:
        return 20

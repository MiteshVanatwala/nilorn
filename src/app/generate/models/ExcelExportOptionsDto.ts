
export type PriceCalculationDto = {
    priceCalculationId?: string | null;
    valid?: boolean | null;
    included?: boolean | null;
    no?: boolean | null;
    name?: boolean | null;
    thumbnailData?: boolean | null;
    itemNo?: boolean | null;
    description?: boolean | null;
    version?: boolean | null;
    quantity?: boolean | null;
    certificate?: boolean | null;
    salesPrice?: boolean | null;
    salesCurrency?: boolean | null;
    purchaseCurrency?: boolean | null;
    purchasePrice?: boolean | null;
    moq?: boolean | null;
    sourcing?: boolean;
    distributionCompany?: boolean;    
};

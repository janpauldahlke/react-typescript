/** TodoMVC model definitions **/

declare type CompleteQuery = {
    q : string,
    fq?: string,  //...&fq=ns:licenseServer
    highlight?: string,
    rows?: number,
    start?: number
}

declare type SearchResult = {
    activePage: number,
    documents: SearchResultItem[],
    numFound: number
    query: string,
    rows: number,
    start: number,
    totalPages: number
}

declare type SearchResultItem = {
    ns: string,
    id: string,
    licenseKey?: string,
    firstName?: string,
    name?: string,
    campaign?: string,
    salesId?: string,
    b2bCompanyName?: string,
    b2bCompanyTaxNumber?: string,
    username?: string,
    eMail?: string,
    licenseeOverride?: string,
    productname?: string,
    orderId?: string
}

declare type SearchResultStoreState = {
    load: boolean,
    success: boolean,
    result : SearchResult
}

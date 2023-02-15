export const environment = {
    production: false,

    baseUrl: 'https://www12.chilena.cl/Corporate/Web/VidaIndividual/Desarrollo/ApiFirmaOnlineVI/api',
    services: {
        search: (params: string) => `/books/search/${params}`,
        save: '/books/create'
    }
};

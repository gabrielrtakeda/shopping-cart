import numeral from 'numeral'

// load a locale
numeral.register('locale', 'pt-br', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'mil',
        million: 'mi',
        billion: 'bi',
        trillion: 'tri'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'R$'
    }
});

// switch between locales
numeral.locale('pt-br');

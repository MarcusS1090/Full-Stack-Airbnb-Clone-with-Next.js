import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    //aqui obtenemos countries.map si el item es igual al value
    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }
    
    return {
        getAll,
        getByValue
    }
    };
    
    export default useCountries;
    
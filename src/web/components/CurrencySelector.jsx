import currencies from "./mock/currencies";

const CurrencySelector = () => {
  return (
    <form>
      <div>
        <label htmlFor="desktop-currency" className="sr-only">
          Currency
        </label>
        <div className="-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
          <select
            id="desktop-currency"
            name="currency"
            className="bg-none bg-gray-900 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent"
          >
            {currencies.map((currency) => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
          <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              className="w-5 h-5 text-gray-300"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 8l4 4 4-4"
              />
            </svg>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CurrencySelector;

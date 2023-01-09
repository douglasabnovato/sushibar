import ProductBox from "../components/ProductBox";

interface PropTypes {
    products: {
        sku: string;
        title: string;
        main_image: string;
        availability: boolean;
    }[];
}

const SpecialOffers = (
    props: PropTypes
) => {

    return (
        <section className="bg-gray-200">
            <div className="flex justify-center w-full h-6">
                <h2 className="text-tahiti-54">Ofertas Especiais</h2>
            </div>
            <ProductBox products={props.products} />
        </section>
    );
};

export default SpecialOffers;
import Product from "../components/Product";

interface PropTypes {
    products: {
        sku: string;
        title: string;
        main_image: string;
        availability: boolean;
    }[];
}

const ListProducts = (
    props: PropTypes
) => {

    return (
        <main>
            <section className="min-h-screen bg-gray-200  justify-center items-center">
                <Product products={props.products} />
            </section>
        </main>
    );
};

export default ListProducts;
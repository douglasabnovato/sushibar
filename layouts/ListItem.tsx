import ProductItem from "../components/ProductItem";

interface PropTypes {
    products: {
        sku: string;
        title: string;
        main_image: string;
        availability: boolean;
    }[];
}

const ListItem = (
    props: PropTypes
) => {

    return (
        <ProductItem products={props.products} />
    );
};

export default ListItem;
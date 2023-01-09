import ProductCardapio from "../components/ProductCardapio";
import ProductBebidas from "../components/ProductBebidas";
import ProductNossoEspaco from "../components/ProductNossoEspaco";

const SeeMore = () => {

    return (
        <section className="bg-gray-200 pt-3">
            <div className="flex justify-center w-full h-6">
                <h2 className="text-tahiti-54">Veja mais</h2>
            </div>
            <div className="flex justify-left px-6">
                <ProductCardapio />
                <ProductBebidas />
                <ProductNossoEspaco />
            </div>
        </section>
    );
};

export default SeeMore;
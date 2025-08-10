import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelect from "@/components/commom/category-select";
import { Header } from "@/components/commom/header";
import ProductList from "@/components/commom/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import Footer from "@/components/commom/footer";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    limit: 4,
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});
  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={products} title="Mais Vendidos" />

        <div className="px-5">
          <CategorySelect categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Seja Autêntico"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novidades" />
      </div>
      <Footer/> 
    </>
  );
};

export default Home;

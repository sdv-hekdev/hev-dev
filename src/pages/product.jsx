import Button from "@/web/components/Button"
import Page from "@/web/components/Page"

const ProductDetailPage = () => {
  return (
    <Page title="Let's check this product">
      <h2 className="text-2xl text-center mb-5">Living-room Set </h2>
      <div>
        <div className="flex justify-around">
          <div className="w-1/3">
            <img src="./assets/sets/livingroom-set-1.jpg" alt="living room" />
          </div>
          <div className="w-1/3">
            <img src="./assets/sets/livingroom-set-1.jpg" alt="living room" />
          </div>
        </div>
        <div className=" flex flex-col m-4 text-justify">
          <p className="w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, rerum
            a at odit quis sequi fuga vitae alias adipisci recusandae fugit eos
            dignissimos dolorum! Odit, deserunt ab! Ea, hic quasi quibusdam eos,
            iusto voluptatum repudiandae error ipsum nihil ipsam similique,
            totam consequatur nam quos assumenda? Iusto eum et ipsa aperiam
            itaque minima expedita rem suscipit illum? Vero magnam deserunt
            asperiores odio nam aperiam nemo porro aspernatur laborum cum iusto,
            dolores laudantium suscipit perspiciatis, rem quasi ullam, odit ab
            reiciendis delectus? Mollitia vitae vero quidem a itaque,
            perferendis ea soluta distinctio, possimus recusandae nisi? Possimus
            nesciunt quibusdam nihil eligendi doloremque libero.
          </p>
          <p className="mt-5 font-bold">Price: 50$</p>
          <p> rate: ⭐️⭐️⭐️⭐️⭐️ </p>

          <div className="flex flex-col mt-2 md:flex-row justify-between">
            <Button
              title="Add to cart"
              className="my-1 w-full md:w-1/4 md:my-5"
            />
            <Button
              title="Add to favorite"
              variant="info"
              className="w-full md:w-1/4 md:my-5"
            />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default ProductDetailPage

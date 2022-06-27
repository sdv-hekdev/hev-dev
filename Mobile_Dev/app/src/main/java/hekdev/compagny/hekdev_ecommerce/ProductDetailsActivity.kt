package hekdev.compagny.hekdev_ecommerce

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.core.content.ContextCompat
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityProductDetailsBinding
import hekdev.compagny.hekdev_ecommerce.model.Cart
import hekdev.compagny.hekdev_ecommerce.model.Product
import hekdev.compagny.hekdev_ecommerce.model.Star
import hekdev.compagny.hekdev_ecommerce.util.Constant
import hekdev.compagny.hekdev_ecommerce.util.GlideLoader

class ProductDetailsActivity : ErrorActivity(), View.OnClickListener {
    private val binding by lazy { ActivityProductDetailsBinding.inflate(layoutInflater) }
    private var productId: String = ""
    private lateinit var productDetails: Product
    private var starsId: String = ""
    private var mRatingVal: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setUpActionBar()
        binding.btnAddToCart.setOnClickListener(this)
        binding.btnGoToCart.setOnClickListener(this)
        binding.btnRate.setOnClickListener(this)
        binding.ibAddFavProduct.setOnClickListener(this)
        binding.ibAddFavProduct.setBackgroundResource(R.drawable.ic_baseline_favorite_border_36)
        if (intent.hasExtra(Constant.EXTRA_PRODUCTS_DETAILS)) {
            productId = intent.getStringExtra(Constant.EXTRA_PRODUCTS_DETAILS)!!
            getProductDetails()
            getRating()
            getFav()
        }
    }

    private fun setUpActionBar() {
        setSupportActionBar(binding.toolbarProductDetailsActivity)

        val actionBar = supportActionBar
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true)
            actionBar.setHomeAsUpIndicator(R.drawable.ic_white_color_back_24dp)
        }

        binding.toolbarProductDetailsActivity.setNavigationOnClickListener { onBackPressed() }
    }

    private fun getProductDetails() {
        showLoadingDialog(resources.getString(R.string.loading))
        FireStoreClass().getProductDetails(this, productId)
    }

    private fun addToCart() {
        val cartItem = Cart(
            FireStoreClass().getCurrentUserId(),
            productId,
            productDetails.title,
            productDetails.price,
            productDetails.image,
            Constant.DEFAULT_CART_QUANTITY
        )

        FireStoreClass().addCartItems(this, cartItem)

    }

    fun productDetailsSuccess(product: Product) {
        productDetails = product

        GlideLoader(this).loaderProductPicture(product.image, binding.ivProductDetailImage)
        binding.tvProductDetailsDescription.text = product.description
        binding.tvProductDetailsPrice.text = " ${product.price}€ "
        binding.tvProductDetailsTitle.text = product.title
        binding.tvProductDetailsStockQuantity.text = product.quantity

        if (product.quantity.toInt() == 0) {
            hideLoadingDialog()
            binding.btnAddToCart.visibility = View.GONE
            binding.tvProductDetailsStockQuantity.text =
                resources.getString(R.string.lbl_out_of_stock)
            binding.tvProductDetailsStockQuantity.setTextColor(
                ContextCompat.getColor(
                    this,
                    R.color.colorErrorTrue
                )
            )
        }
        getOwnRating()
        FireStoreClass().checkIfItemExistInCart(this, productId)
    }

    fun productExistsInCart() {

        hideLoadingDialog()
        binding.btnAddToCart.visibility = View.GONE
        binding.btnGoToCart.visibility = View.VISIBLE
    }

    private fun getFav() {

        FireStoreClass().getIsFav(this, productId)

    }

    fun setFavIcons(isFav: Boolean) {

        if (isFav) {
            binding.ibAddFavProduct.setBackgroundResource(R.drawable.ic_baseline_favorite_36)
        } else {
            binding.ibAddFavProduct.setBackgroundResource(R.drawable.ic_baseline_favorite_border_36)
        }

    }

    fun addToCartSuccess() {

        Toast.makeText(
            this,
            resources.getString(R.string.success_message_item_added_to_cart),

            Toast.LENGTH_SHORT
        ).show()

        binding.btnAddToCart.visibility = View.GONE
        binding.btnGoToCart.visibility = View.VISIBLE
    }

    override fun onClick(v: View?) {
        when (v) {
            binding.btnAddToCart -> {
                addToCart()
            }
            binding.btnGoToCart -> {
                startActivity(Intent(this, CardListActivity::class.java))
            }
            binding.btnRate -> {
                rateProduct()
            }
            binding.ibAddFavProduct -> {
                checkFav()
            }
        }
    }

    private fun checkFav() {

        val star = Star("0", FireStoreClass().getCurrentUserId(), productId, true)

        FireStoreClass().checkIfRateExistInStarsThenDo(
            this,
            productId,
            starsId,
            star,
            Constant.CHECK_TYPE_FAV,
            null
        )
    }

    fun updatedAllDetailsSuccessful(isFav: Boolean) {

        val text = if (isFav) "Added To Fav" else "Remove from Fav"

        Toast.makeText(this, text, Toast.LENGTH_SHORT).show()
        getFav()

    }

    private fun getOwnRating() {
        FireStoreClass().getOwnRatingProduct(this, productId)
    }

    fun getOwnRatingSuccessful(rateInfo: ArrayList<Star>) {

        if (rateInfo.size > 0) {
            for (i in rateInfo) {
                starsId = i.id
                binding.ratingBar.rating = i.ratingVal.toFloat()
            }
        }
    }

    private fun getRating() {
        FireStoreClass().getRatingProduct(this, productId)
    }

    fun getRatingSuccessful(ratingVal: Double) {
        binding.ratingTotalBar.rating = ratingVal.toFloat()
        mRatingVal = ratingVal.toString()
    }

    fun updateSuccessful() {
        Toast.makeText(this, "Your action has been completed.", Toast.LENGTH_SHORT).show()
    }

    private fun rateProduct() {

        val rateVal = binding.ratingBar.rating

        val star = Star(rateVal.toString(), FireStoreClass().getCurrentUserId(), productId, false)

        val starHashMap = HashMap<String, Any>()

        starHashMap[Constant.PRODUCT_ID] = productId
        starHashMap[Constant.USER_ID] = FireStoreClass().getCurrentUserId()
        starHashMap[Constant.RATING_VAL] = rateVal.toString()

        FireStoreClass().checkIfRateExistInStarsThenDo(
            this,
            productId,
            starsId,
            star,
            Constant.CHECK_TYPE_RATE,
            starHashMap
        )
    }

    fun ratingProductSuccessful() {
        getOwnRating()
        getRating()
        Toast.makeText(this, "Thanks for your rating.", Toast.LENGTH_SHORT).show()
        FireStoreClass().updateRateProduct(this, productId, mRatingVal.toFloat())

    }

}
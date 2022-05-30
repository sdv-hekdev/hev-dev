package hekdev.compagny.hekdev_ecommerce

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityCardListBinding
import hekdev.compagny.hekdev_ecommerce.model.Cart
import hekdev.compagny.hekdev_ecommerce.model.Product
import hekdev.compagny.hekdev_ecommerce.ui.adapter.CardListAdapter
import hekdev.compagny.hekdev_ecommerce.util.Constant

class CardListActivity : ErrorActivity(), View.OnClickListener {
    private val binding by lazy { ActivityCardListBinding.inflate(layoutInflater) }
    private lateinit var mProductList: ArrayList<Product>
    private lateinit var mCartItemsList: ArrayList<Cart>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setUpActionBar()
        binding.btnCheckout.setOnClickListener(this)

    }

    override fun onResume() {
        super.onResume()
        getProductList()
    }

    private fun setUpActionBar() {
        setSupportActionBar(binding.toolbarCartListActivity)

        val actionBar = supportActionBar
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true)
            actionBar.setHomeAsUpIndicator(R.drawable.ic_white_color_back_24dp)
        }

        binding.toolbarCartListActivity.setNavigationOnClickListener { onBackPressed() }
    }

    override fun onClick(v: View?) {
        when (v) {
            binding.btnCheckout -> {
                val intent = Intent(this, AddressListActivity::class.java)
                intent.putExtra(Constant.EXTRA_SELECT_ADDRESS, true)
                startActivity(intent)
            }
        }
    }

    fun successCartItemsList(cartList: ArrayList<Cart>) {
        hideLoadingDialog()

        for (product in mProductList) {
            for (cartItem in cartList) {
                if (product.id == cartItem.product_id) {
                    cartItem.stock_quantity = product.quantity

                    if (product.quantity.toInt() == 0) {
                        cartItem.cart_quantity = product.quantity
                    }
                }
            }
        }

        mCartItemsList = cartList

        if (mCartItemsList.size > 0) {
            binding.rvCartItemsList.visibility = View.VISIBLE
            binding.llCheckout.visibility = View.VISIBLE
            binding.tvNoCartItemFound.visibility = View.GONE

            binding.rvCartItemsList.layoutManager = LinearLayoutManager(this)
            binding.rvCartItemsList.setHasFixedSize(true)

            val cardListAdapter = CardListAdapter(this, mCartItemsList, true)
            binding.rvCartItemsList.adapter = cardListAdapter

            var subTotal = 0.0
            for (item in mCartItemsList) {
                val quantityAvailable = item.stock_quantity.toInt()
                if (quantityAvailable > 0) {
                    val price = item.price.toDouble()
                    val quantity = item.cart_quantity.toInt()
                    subTotal += price * quantity
                }
            }

            binding.tvSubTotal.text = "$subTotal€"
            binding.tvShippingCharge.text = Constant.SHIPPING_CHARGE_TEXT

            if (subTotal > 0) {
                binding.llCheckout.visibility = View.VISIBLE


                val total = subTotal + Constant.SHIPPING_CHARGE
                binding.tvTotalAmount.text = "$total€"
            } else {
                binding.llCheckout.visibility = View.GONE
            }
        } else {
            binding.rvCartItemsList.visibility = View.GONE
            binding.llCheckout.visibility = View.GONE
            binding.tvNoCartItemFound.visibility = View.VISIBLE
        }
    }

    fun successProductsList(productList: ArrayList<Product>) {
        mProductList = productList
        hideLoadingDialog()
        getCartItemsList()

    }

    private fun getProductList() {
        showLoadingDialog(resources.getString(R.string.loading))
        FireStoreClass().getAllProductsList(this)
    }

    fun itemUpdateSuccessful() {
        getCartItemsList()
    }

    fun itemRemovedSuccessful() {
        Toast.makeText(
            this,
            resources.getString(R.string.msg_item_removed_successfully), Toast.LENGTH_SHORT
        ).show()
        getCartItemsList()
    }

    private fun getCartItemsList() {
        FireStoreClass().getCartList(this)
    }
}
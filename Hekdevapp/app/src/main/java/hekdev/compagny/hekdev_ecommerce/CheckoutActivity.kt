package hekdev.compagny.hekdev_ecommerce

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.paypal.android.sdk.payments.*
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityCheckoutBinding
import hekdev.compagny.hekdev_ecommerce.model.Address
import hekdev.compagny.hekdev_ecommerce.model.Cart
import hekdev.compagny.hekdev_ecommerce.model.Order
import hekdev.compagny.hekdev_ecommerce.model.Product
import hekdev.compagny.hekdev_ecommerce.ui.adapter.CardListAdapter
import hekdev.compagny.hekdev_ecommerce.util.Constant
import hekdev.compagny.hekdev_ecommerce.util.Constant.PAYPAL_REQUEST_CODE
import org.json.JSONException
import org.json.JSONObject
import java.math.BigDecimal


open class CheckoutActivity : ErrorActivity() {

    private val binding by lazy { ActivityCheckoutBinding.inflate(layoutInflater) }
    private var addressDetails: Address? = null
    private lateinit var mProductList: ArrayList<Product>
    private lateinit var mCartList: ArrayList<Cart>
    private var subTotal: Double = 0.0
    private var total: Double = 0.0
    private var config: PayPalConfiguration =
        PayPalConfiguration().environment(PayPalConfiguration.ENVIRONMENT_SANDBOX)
            .clientId(Constant.CLIENT_KEY);

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setUpActionBar()

        if (intent.hasExtra(Constant.EXTRA_SELECTED_ADDRESS)) {
            addressDetails = intent.getParcelableExtra(Constant.EXTRA_SELECTED_ADDRESS)
        }

        if (addressDetails != null) {

            binding.tvCheckoutAddressType.text = addressDetails?.type
            binding.tvCheckoutFullName.text = addressDetails?.name
            binding.tvCheckoutAddress.text =
                "${addressDetails!!.address} - ${addressDetails!!.zipCode}"
            binding.tvCheckoutAdditionalNote.text = addressDetails?.additionalNote

            if (addressDetails?.otherDetails!!.isNotEmpty()) {
                binding.tvCheckoutOtherDetails.text = addressDetails?.otherDetails
            }

            binding.tvCheckoutMobileNumber.text = addressDetails?.mobileNumber
        }

        getProductList()

        binding.btnPlaceOrder.setOnClickListener {

            getPayment()
            //ordering()
        }
    }

    fun orderSuccessful() {
        FireStoreClass().updateAllDetails(this, mCartList)
    }

    fun successProductList(productList: ArrayList<Product>) {
        mProductList = productList
        getCartItems()
    }

    private fun getProductList() {
        showLoadingDialog(resources.getString(R.string.loading))
        FireStoreClass().getAllProductsList(this)
    }

    private fun getCartItems() {
        FireStoreClass().getCartList(this)
    }

    private fun ordering() {

        if (addressDetails != null) {
            val order = Order(
                FireStoreClass().getCurrentUserId(),
                mCartList,
                addressDetails!!,
                "Order - ${System.currentTimeMillis()}",
                mCartList[0].image,
                subTotal.toString(),
                Constant.SHIPPING_CHARGE.toString(),
                total.toString(),
                System.currentTimeMillis()
            )


            FireStoreClass().ordering(this, order)
        }

    }

    fun allDetailsUpdatedSuccessful() {

        hideLoadingDialog()
        Toast.makeText(this, "Your order placed successfully", Toast.LENGTH_SHORT).show()

        val intent = Intent(this, NavActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()

    }

    fun successCartItems(cartList: ArrayList<Cart>) {
        hideLoadingDialog()

        for (product in mProductList) {
            for (cart in cartList) {
                if (product.id == cart.product_id) {
                    cart.stock_quantity = product.quantity
                }
            }
        }

        mCartList = cartList

        binding.rvCartListItems.layoutManager = LinearLayoutManager(this)
        binding.rvCartListItems.setHasFixedSize(true)

        val cartListAdapter = CardListAdapter(this, mCartList, false)

        binding.rvCartListItems.adapter = cartListAdapter

        for (item in mCartList) {
            val availableQuantity = item.stock_quantity.toInt()
            if (availableQuantity > 0) {
                val price = item.price.toDouble()
                val quantity = item.cart_quantity.toInt()

                subTotal += (price * quantity)
            }
        }

        binding.tvCheckoutSubTotal.text = "$subTotal €"
        binding.tvCheckoutShippingCharge.text = Constant.SHIPPING_CHARGE.toString()

        if (subTotal > 0) {
            binding.llCheckoutPlaceOrder.visibility = View.VISIBLE

            total = subTotal + Constant.SHIPPING_CHARGE

            binding.tvCheckoutTotalAmount.text = "$total €"
        } else {
            binding.llCheckoutPlaceOrder.visibility = View.GONE
        }
    }

    private fun setUpActionBar() {
        setSupportActionBar(binding.toolbarCheckoutActivity)

        val actionBar = supportActionBar
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true)
            actionBar.setHomeAsUpIndicator(R.drawable.ic_white_color_back_24dp)
        }

        binding.toolbarCheckoutActivity.setNavigationOnClickListener { onBackPressed() }
    }

    private fun getPayment() {
        val amountToPay = binding.tvCheckoutTotalAmount.text.toString()
        val newAmount = amountToPay.replace("€", "").toDouble()
        val payment = PayPalPayment(
            BigDecimal(newAmount), "USD", "Course Fees",
            PayPalPayment.PAYMENT_INTENT_SALE
        )

        val intent = Intent(this, PaymentActivity::class.java)

        intent.putExtra(PayPalService.EXTRA_PAYPAL_CONFIGURATION, config)


        intent.putExtra(PaymentActivity.EXTRA_PAYMENT, payment)



        @Suppress("DEPRECATION")
        startActivityForResult(intent, PAYPAL_REQUEST_CODE)
    }


    @Suppress("DEPRECATION")
    override fun onActivityResult(
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == PAYPAL_REQUEST_CODE) {

            when (resultCode) {
                RESULT_OK -> {

                    val confirm: PaymentConfirmation =
                        data!!.getParcelableExtra(com.paypal.android.sdk.payments.PaymentActivity.EXTRA_RESULT_CONFIRMATION)!!

                    try {
                        val paymentDetails = confirm.toJSONObject().toString(4)
                        val payObj = JSONObject(paymentDetails)
                        val payID = payObj.getJSONObject("response").getString("id")
                        val state = payObj.getJSONObject("response").getString("state")
                        binding.idTVStatus.visibility = View.VISIBLE
                        binding.idTVStatus.text = "Payment $state\n with payment id is $payID"
                    } catch (e: JSONException) {
                        Log.e("Error", "an extremely unlikely failure occurred: ", e)
                    }
                }
                RESULT_CANCELED -> {
                    Log.i("paymentExample", "The user canceled.")
                }
                com.paypal.android.sdk.payments.PaymentActivity.RESULT_EXTRAS_INVALID -> {
                    Log.i(
                        "paymentExample",
                        "An invalid Payment or PayPalConfiguration was submitted. Please see the docs."
                    )
                }
            }
        }
    }
}
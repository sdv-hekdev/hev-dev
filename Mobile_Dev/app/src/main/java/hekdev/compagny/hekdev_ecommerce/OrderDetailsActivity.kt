package hekdev.compagny.hekdev_ecommerce


import android.Manifest
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.LinearLayoutManager
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityOrderDetailsBinding
import hekdev.compagny.hekdev_ecommerce.model.Order
import hekdev.compagny.hekdev_ecommerce.ui.adapter.CardListAdapter
import hekdev.compagny.hekdev_ecommerce.util.Constant
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.TimeUnit.MILLISECONDS
import android.graphics.pdf.PdfDocument
import android.graphics.pdf.PdfDocument.PageInfo
import com.google.android.material.internal.ViewUtils.getContentView
import com.google.android.material.internal.ViewUtils.getContentView
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.widget.Toast
import hekdev.compagny.hekdev_ecommerce.pdf.PdfGenerator
import androidx.core.app.ActivityCompat





class OrderDetailsActivity : AppCompatActivity() {

    private val binding by lazy { ActivityOrderDetailsBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setupActionBar()

        var orderDetails = Order()

        if (intent.hasExtra(Constant.EXTRA_MY_ORDER_DETAILS)) {
            orderDetails =
                intent.getParcelableExtra(Constant.EXTRA_MY_ORDER_DETAILS)!!
        }

        setupUI(orderDetails)


        @Suppress("DEPRECATION")
        binding.ibDlOrderInfos.setOnClickListener {

            if(checkPermissionGranted()){
                convertToPdf();
                Toast.makeText(this,"Your order has been downloaded on your device.",Toast.LENGTH_SHORT).show()
            }else{
                requestPermission();
            }

        }
    }


    private fun checkPermissionGranted(): Boolean {
        return (ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
        ) == PackageManager.PERMISSION_GRANTED
                && ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.READ_EXTERNAL_STORAGE
        ) == PackageManager.PERMISSION_GRANTED)
    }

    private fun requestPermission() {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE
            ),
            Constant.PDF_REQUEST_CODE
        )
    }

    private fun convertToPdf() {
        val pdfGenerator = PdfGenerator(this)
        val bitmap: Bitmap = pdfGenerator.getViewScreenShot(binding.llLayoutToPdf)
        pdfGenerator.saveImageToPDF(this,binding.llLayoutToPdf, bitmap)
    }

    private fun setupActionBar() {

        setSupportActionBar(binding.toolbarMyOrderDetailsActivity)

        val actionBar = supportActionBar
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true)
            actionBar.setHomeAsUpIndicator(R.drawable.ic_white_color_back_24dp)
        }

        binding.toolbarMyOrderDetailsActivity.setNavigationOnClickListener { onBackPressed() }
    }


    private fun setupUI(orderDetails: Order) {

        binding.tvOrderDetailsId.text = orderDetails.title

        val dateFormat = "dd MMM yyyy HH:mm"
        val formatter = SimpleDateFormat(dateFormat, Locale.getDefault())

        val calendar: Calendar = Calendar.getInstance()
        calendar.timeInMillis = orderDetails.order_datetime

        val orderDateTime = formatter.format(calendar.time)
        binding.tvOrderDetailsDate.text = orderDateTime


        val diffInMilliSeconds: Long = System.currentTimeMillis() - orderDetails.order_datetime
        val diffInHours: Long = MILLISECONDS.toHours(diffInMilliSeconds)
        Log.e("Difference in Hours", "$diffInHours")

        when {
            diffInHours < 1 -> {
                binding.tvOrderStatus.text = resources.getString(R.string.order_status_pending)
                binding.tvOrderStatus.setTextColor(
                    ContextCompat.getColor(
                        this,
                        R.color.yellow
                    )
                )
            }
            diffInHours < 2 -> {
                binding.tvOrderStatus.text = resources.getString(R.string.order_status_in_process)
                binding.tvOrderStatus.setTextColor(
                    ContextCompat.getColor(
                        this,
                        R.color.colorOrderStatusInProcess
                    )
                )
            }
            else -> {
                binding.tvOrderStatus.text = resources.getString(R.string.order_status_delivered)
                binding.tvOrderStatus.setTextColor(
                    ContextCompat.getColor(
                        this,
                        R.color.colorOrderStatusDelivered
                    )
                )
            }
        }

        binding.rvMyOrderItemsList.layoutManager = LinearLayoutManager(this)
        binding.rvMyOrderItemsList.setHasFixedSize(true)

        val cartListAdapter =
            CardListAdapter(this, orderDetails.items, false)
        binding.rvMyOrderItemsList.adapter = cartListAdapter

        binding.tvMyOrderDetailsAddressType.text = orderDetails.address.type
        binding.tvMyOrderDetailsFullName.text = orderDetails.address.name
        binding.tvMyOrderDetailsAddress.text =
            "${orderDetails.address.address}, ${orderDetails.address.zipCode}"
        binding.tvMyOrderDetailsAdditionalNote.text = orderDetails.address.additionalNote

        if (orderDetails.address.otherDetails.isNotEmpty()) {
            binding.tvMyOrderDetailsOtherDetails.visibility = View.VISIBLE
            binding.tvMyOrderDetailsOtherDetails.text = orderDetails.address.otherDetails
        } else {
            binding.tvMyOrderDetailsOtherDetails.visibility = View.GONE
        }
        binding.tvMyOrderDetailsMobileNumber.text = orderDetails.address.mobileNumber

        binding.tvOrderDetailsSubTotal.text = orderDetails.sub_total_amount
        binding.tvOrderDetailsShippingCharge.text = orderDetails.shipping_charge
        binding.tvOrderDetailsTotalAmount.text = orderDetails.total
    }
}
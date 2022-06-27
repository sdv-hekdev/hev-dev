package hekdev.compagny.hekdev_ecommerce

import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.text.TextUtils
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityAddProductBinding
import hekdev.compagny.hekdev_ecommerce.model.Product
import hekdev.compagny.hekdev_ecommerce.util.Constant
import hekdev.compagny.hekdev_ecommerce.util.GlideLoader
import java.io.IOException

class AddProductActivity : ErrorActivity(), View.OnClickListener, AdapterView.OnItemSelectedListener {
    private val binding by lazy { ActivityAddProductBinding.inflate(layoutInflater) }
    private var selectedImg: Uri? = null
    private var selectedImgUrl: String = ""
    private var listOfItems = arrayOf(Constant.SELECTED_PRODUCT_TYPE, Constant.PRODUCT_TYPE_ONE, Constant.PRODUCT_TYPE_TWO,Constant.PRODUCT_TYPE_THREE)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setUpActionBar()
        binding.ivAddUpdateProduct.setOnClickListener(this)
        binding.btnSubmit.setOnClickListener(this)
        binding.typeProductSpinner.onItemSelectedListener = this
        ArrayAdapter.createFromResource(
            this,
            R.array.type_product_array,
            android.R.layout.simple_spinner_item
        ).also { adapter ->
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            binding.typeProductSpinner.adapter = adapter
        }

    }

    private fun setUpActionBar() {
        setSupportActionBar(binding.toolbarAddProductActivity)

        val actionBar = supportActionBar
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true)
            actionBar.setHomeAsUpIndicator(R.drawable.ic_white_color_back_24dp)
        }

        binding.toolbarAddProductActivity.setNavigationOnClickListener { onBackPressed() }
    }

    override fun onClick(v: View?) {
        when (v) {
            binding.btnSubmit -> {
                if (validateProductsDetails()) {
                    showLoadingDialog(resources.getString(R.string.loading))
                    FireStoreClass().uploadImgToStorage(this, selectedImg, Constant.PRODUCT_IMG)
                }
            }
            binding.ivAddUpdateProduct -> {
                if (ContextCompat.checkSelfPermission(
                        this,
                        android.Manifest.permission.READ_EXTERNAL_STORAGE
                    ) == PackageManager.PERMISSION_GRANTED
                ) {
                    Constant.showImagePicker(this)
                } else {
                    ActivityCompat.requestPermissions(
                        this,
                        arrayOf(android.Manifest.permission.READ_EXTERNAL_STORAGE),
                        Constant.READ_STORAGE_PERMISSION
                    )
                }
            }
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == Constant.READ_STORAGE_PERMISSION) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Constant.showImagePicker(this)
            } else {
                showError("Permission refusée.", true)
            }
        }
    }

    @Suppress("DEPRECATION")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == Constant.PICK_IMG_REQ && data != null) {
                binding.ivAddUpdateProduct.setImageDrawable(
                    ContextCompat.getDrawable(
                        this,
                        R.drawable.ic_vector_edit
                    )
                )

                selectedImg = data.data!!

                try {
                    GlideLoader(this).loaderUserPicture(selectedImg!!, binding.ivProductImage)
                } catch (e: IOException) {
                    e.printStackTrace()
                    Toast.makeText(this, "Erreur lors de la sélection d'image.", Toast.LENGTH_SHORT)
                        .show()
                }
            }
        }
    }

    private fun validateProductsDetails(): Boolean {
        return when {
            selectedImg == null -> {
                showError(resources.getString(R.string.err_message_product_image), true)
                false
            }
            TextUtils.isEmpty(binding.etProductTitle.text.toString().trim { it <= ' ' }) -> {
                showError(resources.getString(R.string.err_message_product_title), true)
                false
            }
            TextUtils.isEmpty(binding.etProductDescription.text.toString().trim { it <= ' ' }) -> {
                showError(resources.getString(R.string.err_message_product_description), true)
                false
            }
            TextUtils.isEmpty(binding.etProductPrice.text.toString().trim { it <= ' ' }) -> {
                showError(resources.getString(R.string.err_message_product_price), true)
                false
            }
            TextUtils.isEmpty(binding.etProductQuantity.text.toString().trim { it <= ' ' }) -> {
                showError(resources.getString(R.string.err_message_product_quantite), true)
                false
            }

            else -> {
                true
            }
        }
    }

    private fun addProduct() {

        val description = binding.etProductDescription.text.toString().trim { it <= ' ' }
        val price = binding.etProductPrice.text.toString().trim { it <= ' ' }
        val title = binding.etProductTitle.text.toString().trim { it <= ' ' }
        val quantity = binding.etProductQuantity.text.toString().trim { it <= ' ' }
        val type = binding.txtSelected.text.toString().trim { it <= ' ' }
        if(type == Constant.SELECTED_PRODUCT_TYPE){
            return
        }
        val product = Product(title, quantity, description, price, 0.0, selectedImgUrl,type)
        FireStoreClass().addProducts(this, product)
    }

    fun imgUploadSuccessful(imgURL: String) {
        selectedImgUrl = imgURL
        addProduct()
    }

    fun addProductSuccessful() {
        hideLoadingDialog()
        Toast.makeText(this, resources.getString(R.string.add_product_success), Toast.LENGTH_SHORT)
            .show()
        finish()
    }

    override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
        binding.txtSelected.text = listOfItems[position]
    }

    override fun onNothingSelected(parent: AdapterView<*>?) {
        TODO("Not yet implemented")
    }
}
package hekdev.compagny.hekdev_ecommerce

import android.os.Bundle
import android.text.TextUtils
import android.view.View
import android.widget.Toast
import hekdev.compagny.hekdev_ecommerce.database.FireStoreClass
import hekdev.compagny.hekdev_ecommerce.databinding.ActivityAddEditAddressBinding
import hekdev.compagny.hekdev_ecommerce.model.Address
import hekdev.compagny.hekdev_ecommerce.util.Constant

class AddEditAddressActivity : ErrorActivity(), View.OnClickListener {
    private val binding by lazy { ActivityAddEditAddressBinding.inflate(layoutInflater) }
    private var mAddressDetails: Address? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        setUpActionBar()

        if (intent.hasExtra(Constant.EXTRA_ADDRESS_DETAILS)) {
            mAddressDetails = intent.getParcelableExtra(Constant.EXTRA_ADDRESS_DETAILS)!!
        }

        if (mAddressDetails != null && mAddressDetails!!.id.isNotEmpty()) {
            binding.tvTitle.text = resources.getString(R.string.title_edit_address)
            binding.btnSubmitAddress.text = resources.getString(R.string.btn_lbl_update)

            binding.etFullName.setText(mAddressDetails!!.name)
            binding.etPhoneNumber.setText(mAddressDetails!!.mobileNumber)
            binding.etAddress.setText(mAddressDetails!!.address)
            binding.etZipCode.setText(mAddressDetails!!.zipCode)
            binding.etAdditionalNote.setText(mAddressDetails!!.additionalNote)


            when (mAddressDetails!!.type) {
                Constant.HOME -> {
                    binding.rbHome.isChecked = true
                }
                Constant.OFFICE -> {
                    binding.rbOffice.isChecked = true
                }
                else -> {
                    binding.rbOther.isChecked = true
                    binding.tilOtherDetails.visibility = View.VISIBLE
                    binding.etOtherDetails.setText(mAddressDetails!!.otherDetails)
                }
            }
        }

        binding.btnSubmitAddress.setOnClickListener(this)
        binding.rgType.setOnCheckedChangeListener { _, checkedId ->
            if (checkedId == binding.rbOther.id) {
                binding.tilOtherDetails.visibility =
                    View.VISIBLE
            } else {
                binding.tilOtherDetails.visibility = View.GONE
            }
        }
    }

    private fun setUpActionBar() {
        setSupportActionBar(binding.toolbarAddEditAddressActivity)

        val actionBar = supportActionBar
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true)
            actionBar.setHomeAsUpIndicator(R.drawable.ic_white_color_back_24dp)
        }

        binding.toolbarAddEditAddressActivity.setNavigationOnClickListener { onBackPressed() }
    }


    private fun saveAddress() {
        val fullName: String = binding.etFullName.text.toString().trim { it <= ' ' }
        val phoneNumber: String = binding.etPhoneNumber.text.toString().trim { it <= ' ' }
        val address: String = binding.etAddress.text.toString().trim { it <= ' ' }
        val zipCode: String = binding.etZipCode.text.toString().trim { it <= ' ' }
        val additionalNote: String = binding.etAdditionalNote.text.toString().trim { it <= ' ' }
        val otherDetails: String = binding.etOtherDetails.text.toString().trim { it <= ' ' }

        if (validateAddressDetails()) {

            showLoadingDialog(resources.getString(R.string.loading))

            val addressType: String = when {
                binding.rbHome.isChecked -> {
                    Constant.HOME
                }
                binding.rbOffice.isChecked -> {
                    Constant.OFFICE
                }
                else -> {
                    Constant.OTHER
                }
            }

            val addressModel = Address(
                FireStoreClass().getCurrentUserId(),
                fullName,
                phoneNumber,
                address,
                zipCode,
                additionalNote,
                addressType,
                otherDetails
            )

            if (mAddressDetails != null && mAddressDetails!!.id.isNotEmpty()) {
                FireStoreClass().updateAddress(
                    this,
                    addressModel,
                    mAddressDetails!!.id
                )
            } else {
                FireStoreClass().addAddress(this, addressModel)
            }
        }
    }

    private fun validateAddressDetails(): Boolean {

        return when {
            TextUtils.isEmpty(binding.etFullName.text.toString().trim { it <= ' ' }) -> {
                showError("Confirm address name.", true)
                false
            }

            TextUtils.isEmpty(binding.etPhoneNumber.text.toString().trim { it <= ' ' }) -> {
                showError("Confirm address phone number.", true)
                false
            }

            TextUtils.isEmpty(binding.etAddress.text.toString().trim { it <= ' ' }) -> {
                showError("Confirm address location.", true)
                false
            }

            TextUtils.isEmpty(binding.etAdditionalNote.text.toString().trim { it <= ' ' }) -> {
                showError("Confirm address note.", true)
                false
            }

            binding.rbOther.isChecked && TextUtils.isEmpty(
                binding.etZipCode.text.toString().trim { it <= ' ' }) -> {
                showError(resources.getString(R.string.err_msg_please_enter_zip_code), true)
                false
            }

            else -> {
                true
            }
        }
    }

    override fun onClick(v: View?) {
        when (v) {
            binding.btnSubmitAddress -> {
                saveAddress()
            }
        }
    }


    fun addUpdateAddressSuccessful() {
        hideLoadingDialog()
        val message: String =
            if (mAddressDetails != null && mAddressDetails!!.id.isNotEmpty()) resources.getString(R.string.msg_your_address_updated_successfully) else resources.getString(
                R.string.err_your_address_added_successfully
            )
        Toast.makeText(
            this,
            message,
            Toast.LENGTH_SHORT
        ).show()
        setResult(RESULT_OK)
        finish()
    }
}